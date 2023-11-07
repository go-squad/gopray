import { useFetcher } from '@remix-run/react';
import { useState } from 'react';
import PrayIcon from '../icons/PrayIcon';

const ShowPrayerSupport = ({
  requestId,
  isItemSaved,
}: {
  requestId: string;
  isItemSaved: boolean;
}) => {
  const [isSaved, setIsSaved] = useState(isItemSaved);
  const fetcher = useFetcher();

  const handleClick = () => {
    fetcher.submit(
      { requestId, isSaved },
      {
        method: 'post',
        action: '/prayers/show-support',
      }
    );
    setIsSaved(state => !state);
  };

  return (
    <div className="flex w-fit flex-col items-center space-y-1 text-center">
      <button
        className={`text-sm text-gray-400 flex items-center ${
          isSaved ? 'text-sky-500' : 'text-gray-400'
        }`}
        type="button"
        onClick={handleClick}
      >
        <PrayIcon
          svgFill={isSaved ? 'fill-sky-500' : 'fill-gray-400'}
          className="mb-px mr-1 h-5 w-5"
        />
        {/* <span className={isSaved ? 'text-sky-500' : 'text-gray-400'}>
          Orando
        </span> */}
      </button>
    </div>
  );
};

export default ShowPrayerSupport;
