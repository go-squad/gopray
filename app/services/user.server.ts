/* eslint-disable unicorn/no-null */
import type { Password, User } from '@prisma/client';
import bcrypt from 'bcryptjs';

import { getCellById } from './cell.server';
import { getChurch } from './church.server';
import { database } from './prisma.server';

export type { User } from '@prisma/client';

export async function getUserById(
  id: User['id']
): Promise<
  (User & { cellName: string | null; churchName: string | null }) | null
> {
  let userinfo: User | null;
  try {
    userinfo = await database.user.findUnique({
      where: { id },
    });

    const cellInfo = await getCellById(userinfo!.cellId);
    const churchInfo = await getChurch({ churchId: userinfo!.churchId });
    const combineData =
      userinfo && cellInfo?.name && churchInfo?.name
        ? {
            ...userinfo,
            cellName: cellInfo?.name,
            churchName: churchInfo?.name,
          }
        : null;

    return combineData;
  } catch (error) {
    console.error('error:', error);
    return null;
  }
}

export async function getUserByEmail(email: User['email']) {
  return database.user.findUnique({ where: { email } });
}

export async function editUser(userId: string, user: Partial<User>) {
  return await database.user.update({
    where: {
      id: userId,
    },
    data: {
      ...user,
    },
  });
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
      displayName: email.split('@')[0],
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
