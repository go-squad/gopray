import { database } from './prisma.server';

export const getRequestSavedStatusById = async (
  userId: string,
  requestId: string
) => {
  return await database.requestPray.findUnique({
    where: {
      userId_requestId: {
        userId,
        requestId,
      },
    },
  });
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
