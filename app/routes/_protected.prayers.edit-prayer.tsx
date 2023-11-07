import type { Audience } from '@prisma/client';
import { json, type ActionArgs, type ActionFunction } from '@remix-run/node';
import {
  deletePrayerRequest,
  editPrayerRequest,
} from '~/services/prayer.server';

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const id = formData.get('id') as unknown as string;
  const body = formData.get('body') as unknown as string;
  const audience = formData.get('audience') as unknown as Audience;
  const userAction = formData.get('userAction') as string;

  if (!id || !userAction) {
    return json(
      { errors: { userId: 'Invalid user or request' } },
      { status: 400 }
    );
  }

  return await (userAction === 'edit'
    ? editPrayerRequest({ id, body, audience })
    : deletePrayerRequest(id));
};
