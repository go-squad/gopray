import { database } from './prisma.server';

export const getRequestSavedStatusById = async (
  userId: string,
  requestId: string
): Promise<boolean> => {
  const isSaved = await database.requestPray.findUnique({
    where: {
      userId_requestId: {
        userId,
        requestId,
      },
    },
  });
  return !!isSaved;
};

export const prayForRequestWithId = async (
  requestId: string,
  userId: string
) => {
  return await database.requestPray.create({
    data: {
      requestId,
      userId,
    },
  });
};

export const removePrayForRequestWithId = async (
  requestId: string,
  userId: string
) => {
  return await database.requestPray.delete({
    where: {
      userId_requestId: {
        userId,
        requestId,
      },
    },
  });
};
