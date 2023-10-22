import type { ActionArgs, ActionFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { editUser } from '~/services/user.server';

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const displayName = formData.get('displayName') as string;
  const givenName = formData.get('givenName') as string;
  const surname = formData.get('surname') as string;
  const userId = formData.get('userId') as string;

  if (!userId) {
    return json({ errors: { user: 'Usuário inválido.' } }, { status: 400 });
  }

  if (!displayName) {
    return json({ errors: { displayName: 'Nome inválido.' } }, { status: 400 });
  }

  return await editUser(userId, { displayName, givenName, surname });
};

export const loader = async () => redirect('/profile');
