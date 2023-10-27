import { BookmarkIcon } from '@heroicons/react/24/solid';
import { useFetcher } from '@remix-run/react';
import { useState } from 'react';

const SavePrayer = ({
  requestId,
  isSavedInPrayerList,
}: {
  requestId: string;
  isSavedInPrayerList: boolean;
}) => {
  const [isSaved, setIsSaved] = useState(isSavedInPrayerList);
  const fetcher = useFetcher();

  const handleClick = () => {
    fetcher.submit(
      { requestId, isSaved },
      {
        method: 'post',
        action: '/prayers/save-prayer',
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
        <BookmarkIcon className="h-4 w-4 mr-1" />
        <span>Salvar</span>
      </button>
    </div>
  );
};

export default SavePrayer;
