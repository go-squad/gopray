import { json, type ActionArgs, type ActionFunction } from '@remix-run/node';
import {
  prayForRequestWithId,
  removePrayForRequestWithId,
} from '~/services/request-pray.server';
import { getUserId } from '~/services/session.server';

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const userId = await getUserId(request);
  const formData = await request.formData();
  const requestId = formData.get('requestId') as string;
  const isSaved = formData.get('isSaved') as string;

  console.log('requestId', requestId);
  console.log('userId', userId);
  console.log('isSaved', isSaved);

  if (!userId || !requestId || !isSaved) {
    return json(
      { errors: { userId: 'Invalid user or request' } },
      { status: 400 }
    );
  }

  return await (isSaved === 'true'
    ? removePrayForRequestWithId(requestId, userId)
    : prayForRequestWithId(requestId, userId));
};
