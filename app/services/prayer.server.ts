import type { Audience, Cell, Church, Request, User } from '@prisma/client';
import type { Prayer } from '~/models/prayer.model';
import { getCellById } from './cell.server';
import { database } from './prisma.server';
import { getRequestSavedStatusById } from './request-pray.server';
import { getPrayerSavedStatus } from './saved-prayers.server';
import { getUserById } from './user.server';

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
      const isSavedInPrayerList = await getPrayerSavedStatus(
        request.id,
        loggedUserId
      );

      prayers.push({
        ...request,
        username: user?.displayName,
        avatarUrl: user?.avatarUrl,
        givenName: user?.givenName,
        surname: user?.surname,
        cell: cell?.name,
        saved: isSaved,
        isSavedInPrayerList,
      });
    }

    return prayers;
  } catch (error) {
    console.error('Error retrieving requests:', error);
    throw error;
  }
};

export const listPrayerByChurchId = async ({
  churchId,
  loggedUserId,
}: {
  churchId: Church['id'];
  loggedUserId: User['id'];
}): Promise<Prayer[]> => {
  try {
    const requests = await database.request.findMany({
      where: { churchId, audience: 'CHURCH' },
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
      const isSaved = await getRequestSavedStatusById(loggedUserId, request.id);
      const isSavedInPrayerList = await getPrayerSavedStatus(
        request.id,
        loggedUserId
      );

      prayers.push({
        ...request,
        username: user?.displayName,
        avatarUrl: user?.avatarUrl,
        givenName: user?.givenName,
        surname: user?.surname,
        cell: user?.cellName,
        saved: isSaved,
        isSavedInPrayerList,
      });
    }

    return prayers;
  } catch (error) {
    console.error('Error retrieving requests:', error);
    throw error;
  }
};

export const createPrayerRequest = ({
  body,
  userId,
  cellId,
  churchId,
  audience,
}: Pick<Request, 'body'> & {
  userId: User['id'];
  cellId: Cell['id'];
  churchId: Church['id'];
  audience: Audience;
}) => {
  return database.request.create({
    data: {
      body,
      cellId,
      churchId,
      audience,
      userId,
    },
  });
};

export const fetchPrayersByIds = async (ids: string[]): Promise<Prayer[]> => {
  try {
    const requests = await database.request.findMany({
      where: {
        id: { in: ids },
      },
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

      prayers.push({
        ...request,
        username: user?.displayName,
        avatarUrl: user?.avatarUrl,
        givenName: user?.givenName,
        surname: user?.surname,
      });
    }

    return prayers;
  } catch (error) {
    console.error('Error retrieving requests:', error);
    throw error;
  }
};
