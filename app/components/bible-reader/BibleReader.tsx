import { BookOpenIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { PASSAGES } from '~/models/constants';

export interface Passage {
  text: string;
  verse: string;
}

const RandomBibleReader = ({ className }: { className?: string }) => {
  const [passage, setPassage] = useState(PASSAGES[0]);

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * PASSAGES.length);
    setPassage(PASSAGES[randomNumber]);
  }, []);

  return (
    <div className={`flex flex-col items-center px-10 ${className}`}>
      <BookOpenIcon className="text-gray-400 w-8 mt-6" />
      <p className="p-px text-sm text-center italic text-gray-400 mt-3 mb-2">
        {passage.text}
      </p>
      <span className="text-sm font-bold text-gray-300">{passage.verse}</span>
    </div>
  );
};

export default RandomBibleReader;
