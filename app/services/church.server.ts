import type { Church } from '@prisma/client';
import { database } from './prisma.server';

export function getChurch({ churchId }: { churchId: Church['id'] }) {
  return database.church.findFirst({
    where: { id: churchId },
    select: { id: true, name: true },
  });
}
