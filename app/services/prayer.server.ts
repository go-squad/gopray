import type { User, Cell, Request, Audience } from '@prisma/client';
import { database } from './prisma.server';
import { getUserById } from './user.server';
import { getCellById } from './cell.server';
import { getRequestSavedStatusById } from './request-pray.server';
import type { Prayer } from '~/models/prayer.model';

export const listPrayerRequests = async ({
  cellId,
  loggedUserId,
}: {
  cellId: Cell['id'];
  loggedUserId: User['id'];
}): Promise<Prayer[]> => {
  try {
    const requests = await database.request.findMany({
      where: { cellId },
      select: {
        id: true,
        body: true,
        userId: true,
        createdAt: true,
        prayingCount: true,
      },
      orderBy: { updatedAt: 'desc' },
    });

    const prayers = [];
    for (const request of requests) {
      const user = await getUserById(request.userId);
      const cell = await getCellById(cellId);
      const isSaved = await getRequestSavedStatusById(loggedUserId, request.id);

      prayers.push({
        ...request,
        username: user?.displayName,
        avatarUrl: user?.avatarUrl,
        givenName: user?.givenName,
        surname: user?.surname,
        cell: cell?.name,
        saved: isSaved,
      });
    }

    return prayers;
  } catch (error) {
    console.error('Error retrieving requests:', error);
    throw error;
  }
};

export function createPrayerRequest({
  body,
  userId,
  cellId,
  audience,
}: Pick<Request, 'body'> & {
  userId: User['id'];
  cellId: Cell['id'];
  audience: Audience;
}) {
  return database.request.create({
    data: {
      body,
      cellId: cellId,
      audience,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}
