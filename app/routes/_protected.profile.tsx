import {
  ArrowUpTrayIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  PencilIcon,
} from '@heroicons/react/24/solid';
import type { LoaderFunction, V2_MetaFunction } from '@remix-run/node';
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { MainFooter } from '~/components/MainFooter';
import { TopHeader } from '~/components/TopHeader';
import { requireUser } from '~/services/session.server';
import fallback from '../assets/images/pray.jpg';
import type { action } from './_protected.profile.edit';

import {
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import AvatarForm from '../components/forms/AvatarForm';

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
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);
  const sizeIcons = 30;

  useEffect(() => {
    if (user?.avatarUrl) {
      setAvatar(user.avatarUrl);
    } else if (user?.givenName && user?.surname) {
      setAvatar(`${user.givenName.charAt(0)}${user.surname.charAt(0)}`);
    } else if (user?.username) {
      setAvatar(`${user?.username.charAt(0)}`);
    } else {
      setAvatar(`${user?.email?.charAt(0)}`);
    }
  }, [user]);

  const handleAvatarUploadStatus = (state: boolean) => {
    setIsAvatarUploading(state);
  };

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
          <div className="avatar relative block mr-4">
            <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-600">
              {user.avatarUrl ? (
                <img
                  alt="profile"
                  src={user.avatarUrl || fallback}
                  className="mx-auto object-cover rounded-full h-24 w-24"
                />
              ) : (
                <span className="h-24 w-24 font-medium text-gray-300">
                  {avatar}
                </span>
              )}
              <AvatarForm
                avatarState={state => handleAvatarUploadStatus(state)}
              >
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center  absolute right-1 bottom-1 cursor-pointer">
                  {
                    // eslint-disable-next-line unicorn/no-negated-condition
                    !isAvatarUploading ? (
                      avatar ? (
                        <PencilIcon className="w-3 h-3" />
                      ) : (
                        <ArrowUpTrayIcon className="w-3 h-3" />
                      )
                    ) : (
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="w-3 h-3 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    )
                  }
                </div>
              </AvatarForm>
            </div>
          </div>
          <div className="flex flex-col text-gray-300">
            <div className="flex flex-col mb-2">
              <span className="text-xs text-gray-500">Nome</span>
              <span>{`${user.givenName || ''} ${user.surname || ''} (${
                user.displayName
              })`}</span>
            </div>
            <div className="flex text-xs flex-col mb-2">
              <span className=" text-gray-500">Email</span>
              <span>{user.email} </span>
            </div>
            <div className="flex">
              <div className="flex text-xs  flex-col mb-2 mr-3">
                <span className=" text-gray-500">Igreja</span>
                <span>{user.churchName}</span>
              </div>
              <div className="flex text-xs flex-col mb-2">
                <span className="text-gray-500">Célula</span>
                <span>{user.cellName} </span>
              </div>
            </div>
          </div>
        </div>

        <Form action={`edit`} method="post">
          <div>
            <label
              htmlFor="displayName"
              className="font-semibold text-sm text-gray-300 pb-1 block"
            >
              Apelido
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
              className="bg-gray-800 text-gray-100 border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full"
            />
            {actionData?.errors?.displayName ? (
              <div className="pt-1 text-red-700" id="displayName-error">
                {actionData.errors.displayName}
              </div>
            ) : // eslint-disable-next-line unicorn/no-null
            null}
            <input type="hidden" name="userId" value={user.id} />
          </div>
          <div>
            <label
              htmlFor="givenName"
              className="font-semibold text-sm text-gray-300 pb-1 block"
            >
              Nome
            </label>
            <input
              type="text"
              name="givenName"
              id="givenName"
              defaultValue={user.givenName}
              placeholder="Nome"
              autoFocus={true}
              autoComplete="email"
              aria-invalid={actionData?.errors?.givenName ? true : undefined}
              aria-describedby="givenName-error"
              className="bg-gray-800 text-gray-100 border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full"
            />
            {actionData?.errors?.givenName ? (
              <div className="pt-1 text-red-700" id="givenName-error">
                {actionData.errors.givenName}
              </div>
            ) : // eslint-disable-next-line unicorn/no-null
            null}
          </div>
          <div>
            <label
              htmlFor="surname"
              className="font-semibold text-sm text-gray-300 pb-1 block"
            >
              Sobrenome
            </label>
            <input
              type="text"
              name="surname"
              id="surname"
              defaultValue={user.surname}
              placeholder="Sobrenome"
              autoFocus={true}
              autoComplete="email"
              aria-invalid={actionData?.errors?.surname ? true : undefined}
              aria-describedby="surname-error"
              className="bg-gray-800 text-gray-100 border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full"
            />
            {actionData?.errors?.surname ? (
              <div className="pt-1 text-red-700" id="surname-error">
                {actionData.errors.surname}
              </div>
            ) : // eslint-disable-next-line unicorn/no-null
            null}
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
          Copie o texto abaixo e envie por email ou whatsapp.
        </p>
        <div className="relative group mb-24">
          <textarea
            className="resize-none bg-transparent text-gray-100 border border-orem-500.18 rounded-lg px-3 py-3 mt-1 mb-5 text-sm w-full min-height"
            value={invitationTemplate}
            rows={4}
            readOnly
          ></textarea>

          <button
            type="button"
            className="absolute flex left-3 -bottom-1 items-center"
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
          <div className="items-center absolute right-3 -bottom-5">
            <WhatsappShareButton url={invitationTemplate} className="mr-1">
              <WhatsappIcon size={sizeIcons} round />
            </WhatsappShareButton>

            <TelegramShareButton url={invitationTemplate}>
              <TelegramIcon size={sizeIcons} round />
            </TelegramShareButton>
          </div>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default Profile;
