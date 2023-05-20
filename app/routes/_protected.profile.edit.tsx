import type { ActionArgs, ActionFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { editUser } from '~/services/user.server';

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const displayName = formData.get('displayName') as string;
  const userId = formData.get('userId') as string;

  console.log('userId', userId);
  console.log('new URL(request.url)', new URL(request.url));

  if (!userId) {
    return json({ errors: { user: 'Usuário inválido.' } }, { status: 400 });
  }

  if (!displayName) {
    return json({ errors: { displayName: 'Nome inválido.' } }, { status: 400 });
  }

  return await editUser(userId, displayName);
};

export const loader = async () => redirect('/profile');
