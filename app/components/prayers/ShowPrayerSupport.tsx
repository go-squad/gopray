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
    console.log('valeu:', isSaved);
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
        className={`text-xs text-gray-400 flex items-center ${
          isSaved ? 'text-sky-500' : 'text-gray-400'
        }`}
        type="button"
        onClick={handleClick}
      >
        <PrayIcon svgFill={isSaved ? 'fill-sky-500' : 'fill-gray-400'} />
        <span className={isSaved ? 'text-sky-500' : 'text-gray-400'}>Orar</span>
      </button>
    </div>
  );
};

export default ShowPrayerSupport;
