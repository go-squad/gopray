import { useLoaderData } from '@remix-run/react';
import { getUser } from '~/services/user.server';

export const loader = async () => {
  const user = await getUser();

  return { user };
};

const New = () => {
  const { user } = useLoaderData();
  return (
    <div className="container max-w-full mx-auto md:py-24 px-6">
      <div className="max-w-sm mx-auto px-6">
        <div className="relative flex flex-wrap">
          <div className="w-full relative">
            <div className="md:mt-6">
              <div className="text-center font-semibold text-black">
                Lorem ipsum dolor
              </div>
              <div className="text-center font-base text-black">
                Sed ut perspiciatis unde?
              </div>
              <form className="mt-8">
                <div className="mx-auto max-w-lg ">
                  <div className="py-1">
                    <span className="px-1 text-sm text-gray-600">
                      Add your prayer motive
                    </span>
                    <textarea
                      autoFocus={true}
                      maxLength={200}
                      placeholder="what would you like to share today?"
                      className="bg-gray-800 height-100 min-h-full text-md text-white block px-3 py-2 rounded-lg w-full border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-transparent focus:border-gray-600 focus:outline-none"
                    />
                  </div>

                  <button className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black">
                    Share
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
