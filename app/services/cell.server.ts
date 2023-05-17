import type { Cell } from '@prisma/client';
import { database } from './prisma.server';

export async function getCellById(id: Cell['id']) {
  return database.cell.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
    },
  });
}
