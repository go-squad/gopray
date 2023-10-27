import { Form, useFetcher } from '@remix-run/react';
import { useEffect, type FormEvent, type ReactNode } from 'react';
import { FetcherStatus } from '~/models/fetcher.model';

const AvatarForm = ({
  children,
  avatarState,
}: {
  children: ReactNode;
  avatarState: (state: boolean) => void;
}) => {
  const avatarAPI = useFetcher();

  useEffect(() => {
    if (avatarAPI.state !== FetcherStatus.Loading && !!avatarAPI.data) {
      avatarState(false);
    }
  }, [avatarAPI, avatarState]);

  const handleClick = () => {
    avatarState(true);
  };

  const handleChange = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);

    if (!(formData.get('avatar') as File).name) {
      return;
    }

    avatarAPI.submit(formData, {
      method: 'post',
      action: '/profile/upload-avatar',
      encType: 'multipart/form-data',
    });
  };

  return (
    <Form
      className="flex w-fit flex-col items-center space-y-1 text-center"
      onChange={handleChange}
    >
      <label htmlFor="avatar" className="flex cursor-pointer justify-center">
        {children}
        <input
          id="avatar"
          name="avatar"
          type="file"
          className="hidden"
          onClick={handleClick}
        />
      </label>
    </Form>
  );
};

export default AvatarForm;
