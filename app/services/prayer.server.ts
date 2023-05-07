import type { User, Cell, Request } from '@prisma/client';
import { database } from './prisma.server';

export function listPrayerRequests({ cellId }: { cellId: Cell['id'] }) {
  console.log('cell', cellId);
  return database.request.findMany({
    where: { cellId },
    select: { id: true, body: true },
    orderBy: { updatedAt: 'desc' },
  });
}

export function createPrayerRequest({
  body,
  userId,
  cellId,
}: Pick<Request, 'body'> & {
  userId: User['id'];
  cellId: Cell['id'];
}) {
  return database.request.create({
    data: {
      body,
      cellId: cellId,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}
