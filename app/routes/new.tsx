import type { ActionArgs, V2_MetaFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import { TopHeader } from '~/components/TopHeader';
import { createPrayerRequest } from '~/services/prayer.server';
import { requireUser } from '~/services/session.server';

export const action = async ({ request }: ActionArgs) => {
  const user = await requireUser(request);

  const formData = await request.formData();
  const body = formData.get('body');
  const visibility = formData.get('visibility');

  //console.log('body', body);

  if (typeof body !== 'string' || body.length === 0) {
    return json({ errors: { body: 'Body is required' } }, { status: 400 });
  }

  await createPrayerRequest({ body, userId: user.id, cellId: user.cellId });

  return redirect('/');
};

export const meta: V2_MetaFunction = () => {
  return [{ title: 'New Prayer | Orem Club' }];
};

const New = () => {
  const actionData = useActionData<typeof action>();
  const bodyReference = useRef<HTMLTextAreaElement>(null);
  const [request, setRequest] = useState<string>();
  const [textAreaCount, setTextAreaCount] = useState<number>(0);
  const maxTextAreaCount = 215;
  const [visibility, setVisibility] = useState('cell');

  useEffect(() => {
    if (actionData?.errors?.body) {
      bodyReference.current?.focus();
    }
  }, [actionData]);

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRequest(event.target.value);
    setTextAreaCount(event.target.value.length);
  };

  const handleVisibilityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setVisibility(event.target.value);
  };

  return (
    <div className="mt-12 mb-4 max-w-md mx-auto">
      <TopHeader title={'Novo pedido'} isHome={false}>
        <Form method="post">
          <input type="hidden" name="body" defaultValue={request} />
          <button
            className="text-m text-sky-500 block  hover:text-white"
            type="submit"
          >
            enviar
          </button>
        </Form>
      </TopHeader>

      <div className="container relative flex flex-wrap px-6">
        <div className="w-full relative">
          <div className="md:mt-6">
            <form className="mt-8">
              <div className="mx-auto">
                <div className="py-1">
                  <label className="block text-gray-300 text-md mt-0">
                    Selecione visibilidade:
                    <select
                      name="visibility"
                      value={visibility}
                      onChange={handleVisibilityChange}
                      className="bg-gray-800 text-gray-100 border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                    >
                      <option value="church">Igreja</option>
                      <option value="cell">Célula</option>
                      <option value="me">Apenas Eu</option>
                    </select>
                  </label>
                  <label className="block text-md mt-5">
                    <textarea
                      autoFocus={true}
                      name="body"
                      maxLength={maxTextAreaCount}
                      placeholder="Escreva aqui seu pedido de oraçao ou agradecimento..."
                      ref={bodyReference}
                      rows={8}
                      className="resize-none bg-transparent height-100 min-h-full text-md text-white block rounded-lg w-full placeholder-gray-400 focus:placeholder-gray-500 focus:bg-transparent focus:outline-none"
                      aria-invalid={actionData?.errors?.body ? true : undefined}
                      aria-errormessage={
                        actionData?.errors?.body ? 'body-error' : undefined
                      }
                      onChange={event => handleOnChange(event)}
                    />
                    {actionData?.errors?.body ? (
                      <div className="pt-1 text-red-700" id="body-error">
                        {actionData.errors.body}
                      </div>
                    ) : // eslint-disable-next-line unicorn/no-null
                    null}
                  </label>
                </div>

                {maxTextAreaCount - textAreaCount <= 20 &&
                maxTextAreaCount - textAreaCount > 0 ? (
                  <span className="text-xs text-gray-400">
                    Você ainda pode adicionar{' '}
                    <b>{maxTextAreaCount - textAreaCount}</b> caracteres.
                  </span>
                ) : // eslint-disable-next-line unicorn/no-null
                null}

                {maxTextAreaCount - textAreaCount === 0 ? (
                  <span className="text-xs text-gray-400">
                    Você já atingiu o máximo de caracteres neste pedido.
                  </span>
                ) : // eslint-disable-next-line unicorn/no-null
                null}

                {/* <button className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black">
                  Compartilhar
                </button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
