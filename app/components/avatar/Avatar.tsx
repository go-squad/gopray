import { useEffect, useState } from 'react';
import fallback from '../../assets/images/pray.jpg';

const Avatar = ({
  url,
  givenName,
  username,
  email,
}: {
  url?: string | null;
  givenName?: string | null;
  username?: string | null;
  email?: string | null;
}) => {
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (url) {
      setAvatar(url);
    } else if (givenName) {
      setAvatar(`${givenName.charAt(0)}`);
    } else if (username) {
      setAvatar(`${username.charAt(0)}`);
    } else {
      setAvatar(`${email?.charAt(0)}`);
    }
  }, [url, givenName, username, email]);

  return (
    <div className="relative h-7 w-7 avatar mr-2">
      {url ? (
        <img
          alt="profile"
          src={url || fallback}
          className="mx-auto object-cover rounded-full h-7 w-7"
        />
      ) : (
        <div className="text-base relative inline-flex items-center justify-center h-7 w-7 overflow-hidden rounded-full bg-gray-600">
          <span className="font-medium text-center w-7 absolute text-gray-300">
            {avatar || '@'}
          </span>
        </div>
      )}
    </div>
  );
};

export default Avatar;
