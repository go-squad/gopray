import type { Cell, Church, Request, User } from '@prisma/client';
import { Audience } from '@prisma/client';
import type { Prayer } from '~/models/prayer.model';
import { getCellById } from './cell.server';
import { database } from './prisma.server';
import { getRequestSavedStatusById } from './request-pray.server';
import { getPrayerSavedStatus } from './saved-prayers.server';
import { getUserById } from './user.server';

export const listPrayerRequests = async ({
  id,
  loggedUserId,
  audience,
}: {
  id: Cell['id'] | Church['id'];
  loggedUserId: User['id'];
  audience: Audience;
}): Promise<Prayer[]> => {
  let filters = {};
  filters =
    audience === Audience.CHURCH ? { churchId: id, audience } : { cellId: id };

  try {
    const requests = await database.request.findMany({
      where: { ...filters },
      select: {
        id: true,
        body: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
        mentionedId: true,
        prayingCount: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const prayers = [];
    for (const request of requests) {
      const user = await getUserById(request.userId);
      if (user) {
        const cell = await getCellById(user.cellId!);
        const isSaved = await getRequestSavedStatusById(
          loggedUserId,
          request.id
        );
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
    }

    return prayers;
  } catch (error) {
    console.error('Error retrieving requests:', error);
    throw error;
  }
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
        updatedAt: true,
        mentionedId: true,
        prayingCount: true,
        audience: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const prayers = [];
    for (const request of requests) {
      const user = await getUserById(request.userId);

      if (user) {
        prayers.push({
          ...request,
          username: user?.displayName,
          avatarUrl: user?.avatarUrl,
          givenName: user?.givenName,
          surname: user?.surname,
        });
      }
    }

    return prayers;
  } catch (error) {
    console.error('Error retrieving requests:', error);
    throw error;
  }
};

export const fetchPrayerRequestById = async (
  id: string
): Promise<Prayer | null> => {
  try {
    const request = await database.request.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        body: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
        prayingCount: true,
        audience: true,
      },
    });

    return request;
  } catch (error) {
    console.error('Error retrieving requests:', error);
    throw error;
  }
};

export const createPrayerRequest = async ({
  body,
  userId,
  cellId,
  churchId,
  mentionedId,
  audience,
}: Pick<Request, 'body'> & {
  userId: User['id'];
  cellId: Cell['id'];
  churchId: Church['id'];
  mentionedId: Request['id'];
  audience: Audience;
}) => {
  return await database.request.create({
    data: {
      body,
      cellId,
      churchId,
      audience,
      mentionedId,
      userId,
    },
  });
};

export const editPrayerRequest = async ({
  id,
  body,
  audience,
}: Pick<Request, 'body'> & {
  id: Request['id'];
  body: Request['body'];
  audience: Audience;
}) => {
  const result = await database.request.update({
    where: {
      id,
    },
    data: {
      body,
      audience,
    },
  });

  return result;
};

export const deletePrayerRequest = async (id: string) => {
  return await database.request.delete({
    where: {
      id,
    },
  });
};
