import { Form, useFetcher } from '@remix-run/react';
import type { FormEvent, ReactNode } from 'react';

const AvatarForm = ({ children }: { children: ReactNode }) => {
  const avatarAPI = useFetcher();

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
        <input id="avatar" name="avatar" type="file" className="hidden" />
      </label>
    </Form>
  );
};

export default AvatarForm;
