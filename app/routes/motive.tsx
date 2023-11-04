import { Audience } from '@prisma/client';
import type {
  ActionArgs,
  LoaderArgs,
  LoaderFunction,
  V2_MetaFunction,
} from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import Avatar from '~/components/avatar/Avatar';
import { TopHeader } from '~/components/layout/TopHeader';
import MentionedPrayer from '~/components/prayers/MentionedPrayer';
import type { Prayer } from '~/models/prayer.model';

import {
  createPrayerRequest,
  editPrayerRequest,
  fetchPrayerRequestById,
} from '~/services/prayer.server';
import { requireUser } from '~/services/session.server';
import { getUserById } from '~/services/user.server';

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const url = new URL(await request.url);
  const id = url.searchParams.get('id') as unknown as string;
  const mentionId = url.searchParams.get('mentionId') as unknown as string;
  const user = await requireUser(request);

  const mentionedPrayer =
    mentionId && (await fetchPrayerRequestById(mentionId));

  const mentionedUser =
    mentionedPrayer && (await getUserById(mentionedPrayer.userId!));

  const mainMotive = {
    ...(id && (await fetchPrayerRequestById(id))),
    audience: Audience.CELL,
  };

  return { mainMotive, mentionedPrayer, user, mentionedUser };
};

export const action = async ({ request }: ActionArgs) => {
  const user = await requireUser(request);
  if (!user.id || !user.cellId) {
    return json(
      { errors: { body: 'User is missing, please contact support' } },
      { status: 400 }
    );
  }

  const formData = await request.formData();
  const body = formData.get('body');
  const audience = formData.get('audience') as Audience;
  const id = formData.get('id') as string;
  const mentionedId = formData.get('mentionedId') as string;

  if (typeof body !== 'string' || body.length === 0) {
    return json(
      { errors: { body: 'Por favor, digite a seu pedido de oração' } },
      { status: 400 }
    );
  }

  const allowedAudiences = [
    Audience.CELL,
    Audience.ONLY_ME,
    Audience.CHURCH,
  ] as Audience[];

  if (!allowedAudiences.includes(audience)) {
    return json(
      {
        errors: {
          body: 'Por favor, escolher somente Igreja, Célula ou Apenas eu',
        },
      },
      { status: 400 }
    );
  }

  id
    ? await editPrayerRequest({
        id,
        body,
        audience: audience,
      })
    : await createPrayerRequest({
        body,
        userId: user.id,
        cellId: user.cellId,
        churchId: user.churchId,
        mentionedId,
        audience: audience,
      });

  return redirect('/');
};

export const meta: V2_MetaFunction = () => {
  return [{ title: 'New Prayer | Orem Club' }];
};

const New = () => {
  const actionData = useActionData<typeof action>();
  const { mainMotive, mentionedPrayer, user, mentionedUser } = useLoaderData();
  const bodyReference = useRef<HTMLTextAreaElement>(null);
  const [request, setRequest] = useState<Prayer>(mainMotive);
  const [textAreaCount, setTextAreaCount] = useState<number>(0);
  const maxTextAreaCount = 215;

  useEffect(() => {
    if (actionData?.errors?.body) {
      bodyReference.current?.focus();
    }
  }, [actionData]);

  const handleOnChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>,
    control: string
  ) => {
    setRequest(state => ({ ...state, [control]: event.target.value }));
    if (control === 'body') {
      setTextAreaCount(event.target.value.length);
    }
  };

  return (
    <div className="mb-4 max-w-md mx-auto">
      <TopHeader
        start={
          <>
            <Avatar
              url={user.avatarUrl}
              givenName={user.givenName}
              username={user.username}
              email={user.email}
            />
            <label className="flex items-center">
              <select
                name="audience"
                defaultValue={request.audience}
                onChange={event => handleOnChange(event, 'audience')}
                className="bg-transparent text-gray-100 rounded-lg text-sm"
              >
                <option value="CHURCH">Igreja</option>
                <option value="CELL">Célula</option>
                <option value="ONLY_ME">Apenas Eu</option>
              </select>
            </label>
          </>
        }
        isHome={false}
        end={
          <Form method="post">
            <input type="hidden" name="body" defaultValue={request.body} />
            <input
              type="hidden"
              name="audience"
              defaultValue={request.audience}
            />
            <input type="hidden" name="id" defaultValue={request.id} />
            <input
              type="hidden"
              name="mentionedId"
              defaultValue={mentionedPrayer?.id}
            />

            <button
              className="text-m text-sky-500 block  hover:text-white"
              type="submit"
            >
              enviar
            </button>
          </Form>
        }
      />

      <div className="container relative flex flex-wrap px-6">
        <div className="w-full relative">
          <div className="md:mt-6">
            <form>
              <div className="mx-auto">
                {textAreaCount > 0 &&
                  (maxTextAreaCount - textAreaCount > 0 ? (
                    <span className="text-xs text-gray-400">
                      Você ainda pode adicionar{' '}
                      <b>{maxTextAreaCount - textAreaCount}</b> caracteres.
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">
                      Você já atingiu o máximo de caracteres neste pedido.
                    </span>
                  ))}
                <div className="relative pl-4 mt-4">
                  {mentionedPrayer && (
                    <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-slate-600"></div>
                  )}
                  <label className="block text-base">
                    <textarea
                      autoFocus={false}
                      defaultValue={request.body}
                      name="body"
                      maxLength={maxTextAreaCount}
                      placeholder="Escreva aqui seu pedido de oraçao ou agradecimento..."
                      ref={bodyReference}
                      rows={3}
                      className="resize-none bg-transparent height-100 min-h-full text-md text-white block rounded-lg w-full placeholder-gray-400 focus:placeholder-gray-500 focus:bg-transparent focus:outline-none"
                      aria-invalid={actionData?.errors?.body ? true : undefined}
                      aria-errormessage={
                        actionData?.errors?.body ? 'body-error' : undefined
                      }
                      onChange={event => handleOnChange(event, 'body')}
                    />
                    {actionData?.errors?.body && (
                      <div className="pt-1 text-red-700" id="body-error">
                        {actionData.errors.body}
                      </div>
                    )}
                  </label>
                  {mentionedPrayer && (
                    <MentionedPrayer
                      mentionedUser={mentionedUser}
                      mentionedPrayer={mentionedPrayer}
                      currentUser={user}
                    />
                    // <div className="h-[100px] w-full bg-sky-950/20 p-4">
                    //   <div className="flex items-center">
                    //     <Avatar
                    //       url={mentionedUser.avatarUrl}
                    //       givenName={mentionedUser.givenName}
                    //       username={mentionedUser.username}
                    //       email={mentionedUser.email}
                    //     />
                    //     <div className="flex items-center user-info  text-gray-400">
                    //       <b className="text-gray-300 text-base">
                    //         {mentionedUser.displayName ||
                    //           mentionedUser.username ||
                    //           mentionedUser.givenName}
                    //       </b>
                    //       {mentionedUser.id === user.id && (
                    //         <span className="ml-1 text-sm">(você)</span>
                    //       )}
                    //       <span className="mx-1">•</span>
                    //       <span className="text-sm">
                    //         {' '}
                    //         célula {mentionedUser.cellName}
                    //       </span>
                    //     </div>
                    //   </div>
                    //   <div className="pl-9 mb-2">
                    //     <div className={`text-base text-gray-100 mb-1`}>
                    //       {mentionedPrayer.body}
                    //     </div>
                    //   </div>
                    // </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
