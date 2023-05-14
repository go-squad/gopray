/* eslint-disable unicorn/no-null */
import type { Password, User } from '@prisma/client';
import bcrypt from 'bcryptjs';

import { database } from './prisma.server';

export type { User } from '@prisma/client';

export async function getUserById(id: User['id']) {
  return database.user.findUnique({
    where: { id },
    select: { id: true, cellId: true, churchId: true, email: true },
  });
}

export async function getUserByEmail(email: User['email']) {
  return database.user.findUnique({ where: { email } });
}

export async function createUser(
  email: User['email'],
  password: string,
  cellId: string
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return database.user.create({
    data: {
      email,
      cellId,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
}

export async function deleteUserByEmail(email: User['email']) {
  return database.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: User['email'],
  password: Password['hash']
) {
  const userWithPassword = await database.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
