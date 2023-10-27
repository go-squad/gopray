import type { User } from '@prisma/client';
import { database } from './prisma.server';

export const getSavedPrayersIdsByUserId = async (
  userId: User['id']
): Promise<string[]> => {
  const savedIds = await database.savedPrayers.findMany({
    where: {
      userId: userId,
    },
    select: {
      requestId: true,
    },
  });
  console.log('savedIds:', savedIds);
  if (savedIds) {
    const savedPrayersIds = savedIds.map(saved => saved.requestId);
    return savedPrayersIds;
  } else {
    // User not found
    return [];
  }
};

export const savePrayerWithIds = async (requestId: string, userId: string) => {
  console.log('requestId/userId:', requestId, userId);
  return await database.savedPrayers.create({
    data: {
      requestId,
      userId,
    },
  });
};

export const removeSavedPrayerWithIds = async (
  requestId: string,
  userId: string
) => {
  return await database.savedPrayers.delete({
    where: {
      userId_requestId: {
        userId,
        requestId,
      },
    },
  });
};

export const getPrayerSavedStatus = async (
  requestId: string,
  userId: string
) => {
  const isInPrayerList = await database.savedPrayers.findUnique({
    where: {
      userId_requestId: {
        userId,
        requestId,
      },
    },
  });
  return !!isInPrayerList;
};
