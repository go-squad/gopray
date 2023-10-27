import { json, type ActionArgs, type ActionFunction } from '@remix-run/node';
import {
  removeSavedPrayerWithIds,
  savePrayerWithIds,
} from '~/services/saved-prayers.server';
import { getUserId } from '~/services/session.server';

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const userId = await getUserId(request);
  const formData = await request.formData();
  const requestId = formData.get('requestId') as string;
  const isSaved = formData.get('isSaved') as string;

  if (!userId || !requestId || !isSaved) {
    return json(
      { errors: { userId: 'Invalid user or request' } },
      { status: 400 }
    );
  }

  return await (isSaved === 'true'
    ? removeSavedPrayerWithIds(requestId, userId)
    : savePrayerWithIds(requestId, userId));
};
