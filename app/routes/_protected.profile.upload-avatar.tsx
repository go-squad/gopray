import {
  unstable_parseMultipartFormData,
  type ActionArgs,
  type ActionFunction,
} from '@remix-run/node';
import { requireUser } from '../services/session.server';
import { uploadHandler } from '../services/storage/upload.server';
import { editUser } from '../services/user.server';

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const user = await requireUser(request);

  // get file info back after image upload
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );
  const avatarUrl = formData.get('avatar') as string;
  const userUpdated = await editUser(user.id, { avatarUrl });

  return { userUpdated };
};
