import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/solid';
import type { LoaderFunction, V2_MetaFunction } from '@remix-run/node';
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { TopHeader } from '~/components/TopHeader';
import { requireUser } from '~/services/session.server';
import type { action } from './_protected.profile.edit';
import fallback from '../assets/images/pray.jpg';
import { MainFooter } from '~/components/MainFooter';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request);
  return { user };
};

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Profile | Orem Club' }];
};

// This is the function we wrote earlier
async function copyTextToClipboard(text: string) {
  return 'clipboard' in navigator
    ? await navigator.clipboard.writeText(text)
    : document.execCommand('copy', true, text);
}

const Profile = () => {
  const { user } = useLoaderData();
  const [isCopied, setIsCopied] = useState(false);
  const invitationTemplate = `Olá, será um prazer ter você conosco em nosso grupo de oração. Para entrar basta você se cadastrar no app do Orem Club nesse link aqui app.orem.club/signup?invitation=${user.cellId}`;
  const actionData = useActionData<typeof action>();
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (user?.avatarUrl) {
      setAvatar(user.avatar);
    } else if (user?.givenName && user?.surname) {
      setAvatar(`${user.givenName.charAt(0)}${user.surname.charAt(0)}`);
    } else if (user?.username) {
      setAvatar(`${user?.username.charAt(0)}`);
    } else {
      setAvatar(`${user?.email?.charAt(0)}`);
    }
  }, [user]);

  const handleCopyClick = () => {
    copyTextToClipboard(invitationTemplate).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    });
  };

  return (
    <>
      <TopHeader title={'Perfil'} isHome={false}>
        <Form action="/logout" method="post">
          <button
            className="text-m text-sky-500 block  hover:text-white"
            type="submit"
          >
            Logout
          </button>
        </Form>
      </TopHeader>
      <div className="h-full container p-4">
        <div className="flex justify-start items-center mb-4">
          <div className="avatar relative block mr-3">
            {user.avatarUrl ? (
              <img
                alt="profile"
                src={user.avatarUrl || fallback}
                className="mx-auto object-cover rounded-full h-24 w-24 "
              />
            ) : (
              <div className="relative inline-flex items-center justify-center w-20 h-20 overflow-hidden rounded-full bg-gray-600">
                <span className="font-medium text-gray-300">{avatar}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col text-gray-300">
            <span>{`${user.givenName || ''} ${user.surname || ''}`}</span>
            <span>{user.email} </span>
          </div>
        </div>

        <Form action={`edit`} method="post">
          <div>
            <label
              htmlFor="displayName"
              className="font-semibold text-sm text-gray-300 pb-1 block"
            >
              Display name
            </label>
            <input
              type="text"
              name="displayName"
              id="displayName"
              defaultValue={user.displayName}
              autoFocus={true}
              autoComplete="email"
              aria-invalid={actionData?.errors?.displayName ? true : undefined}
              aria-describedby="displayName-error"
              className="bg-gray-800 text-gray-100 border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            {actionData?.errors?.displayName ? (
              <div className="pt-1 text-red-700" id="displayName-error">
                {actionData.errors.displayName}
              </div>
            ) : // eslint-disable-next-line unicorn/no-null
            null}
            <input type="hidden" name="userId" value={user.id} />
          </div>
          <button
            className="text-m text-sky-500 block  hover:text-white"
            type="submit"
          >
            Salvar Modificações
          </button>
        </Form>

        <hr className="border border-orem-500.18 mb-4 mt-4" />
        <p className="mb-2 text-lg text-gray-100">
          Quer convidar alguém para sua célula?
        </p>
        <p className="mb-2 text-sm text-gray-400">
          Copie o texto abaixo e envier por email ou whatsapp.
        </p>
        <div className="relative group">
          <textarea
            className="resize-none bg-transparent text-gray-100 border border-orem-500.18 rounded-lg px-3 py-3 mt-1 mb-5 text-sm w-full min-height"
            value={invitationTemplate}
            rows={4}
            readOnly
          ></textarea>

          <button
            type="button"
            className="absolute flex right-3 -bottom-1 items-center"
            onClick={handleCopyClick}
          >
            {isCopied ? (
              <>
                <ClipboardDocumentCheckIcon className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-gray-400">Copiado!</span>
              </>
            ) : (
              <>
                <ClipboardDocumentListIcon className="h-4 w-4 text-gray-400 mr-1" />
                <span className="text-gray-400">Copiar</span>
              </>
            )}
          </button>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default Profile;
