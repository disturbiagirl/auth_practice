"use server";

import { User } from "@prisma/client";
import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import {
  compileActivationTemplate,
  sendEmail,
  compileResetPassTemplate,
} from "../mail";
import { signJwt, verifyJwt } from "../jwt";

export async function registerUser(
  user: Omit<User, "id" | "emailVerified" | "image">
) {
  const result = await prisma.user.create({
    data: {
      ...user,
      password: await bcrypt.hash(user.password, 10),
    },
  });

  const jwtUserId = signJwt({ id: result.id });
  const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activation/${jwtUserId}`;
  const body = compileActivationTemplate(user.firstName, activationUrl);
  await sendEmail({ to: user.email, subject: "Activate your account", body });
  return result;
}

type ActivateUserFunc = (
  jwtUserId: string
) => Promise<"userNotExist" | "alreadyActivated" | "success">;

export const activateUser: ActivateUserFunc = async (jwtUserID) => {
  const payload = verifyJwt(jwtUserID);
  const userId = payload?.id;
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) return "userNotExist";
  if (user.emailVerified) return "alreadyActivated";
  const result = await prisma.user.update({
    where: { id: userId },
    data: {
      emailVerified: new Date(),
    },
  });
  return "success";
};

export async function forgotPassword(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) throw new Error("User not found");

  const jwtUserId = signJwt({ id: user.id });
  const resetPasswordUrl = `${process.env.NEXTAUTH_URL}/auth/resetPass/${jwtUserId}`;
  const body = compileResetPassTemplate(user.firstName, resetPasswordUrl);
  const sendResult = await sendEmail({
    to: user.email,
    subject: "Reset your password",
    body: body,
  });
  return sendResult;
}
