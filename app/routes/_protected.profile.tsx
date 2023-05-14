import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/solid';
import type { LoaderFunction, V2_MetaFunction } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { TopHeader } from '~/components/TopHeader';
import { requireUser } from '~/services/session.server';

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
      <TopHeader title={'Perfil'} isHome={false} />
      <div className="h-full container">
        <p className="text-gray-600 text-center">
          <span>user: {user.email} </span>
        </p>
        <Form action="/logout" method="post">
          <button
            className="mt-3 text-lg font-semibold bg-gray-600 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
            type="submit"
          >
            Logout
          </button>
        </Form>
        <hr className="dive-solid mb-4 mt-4" />
        <p className="mb-2 text-lg text-gray-100">
          Quer convidar alguém para sua célula?
        </p>
        <p className="mb-2 text-sm text-gray-400">
          Copie o texto abaixo e envier por email ou whatsapp.
        </p>
        <div className="relative group">
          <textarea
            className="resize-none bg-gray-800 text-gray-100 border rounded-lg px-3 py-3 mt-1 mb-5 text-sm w-full min-height"
            value={invitationTemplate}
            rows={3}
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
    </>
  );
};

export default Profile;
