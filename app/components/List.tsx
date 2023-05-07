import React, { useEffect, useRef, useState } from 'react';
import { ListItem } from './ListItem';

type ListProperties = {
  title: string;
  description: string;
  collection: [];
};
export const List = ({ title, description, collection }: ListProperties) => {
  const headerReference = useRef<HTMLDivElement>(null);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver;
    const current = headerReference.current;
    if (headerReference) {
      observer = new IntersectionObserver(
        ([headerElement]) => {
          setIsPinned(headerElement.intersectionRatio < 1);
          return headerElement.target.classList.toggle(
            'is-pinned',
            headerElement.intersectionRatio < 1
          );
        },

        { threshold: [1] }
      );

      observer.observe(headerReference.current!);
    }
    return () => {
      if (current && observer) {
        observer.unobserve(current);
      }
    };
  }, [headerReference]);

  return (
    <div className="container divide-y divide-slate-700 flex flex-col items-center justify-center w-full mx-auto bg-slate-900 rounded-lg shadow">
      <div></div>

      <div
        ref={headerReference}
        className={`w-full px-4 py-5 sm:px-6 sticky -top-px bg-slate-900 z-10 ${
          isPinned && 'shadow shadow-slate-950'
        }`}
      >
        <h3 className="text-lg font-medium leading-6 text-pink-600">{title}</h3>

        <p className="max-w-2xl mt-1 text-sm text-gray-500">{description}</p>
      </div>
      {collection.length === 0 ? (
        <p className="p-4 text-gray-400">
          Está célula não possui nenhum pedido de oração ainda.
        </p>
      ) : (
        <ul className="flex flex-col w-full divide-y divide-slate-700">
          {collection.map((item, index) => (
            <ListItem key={index} item={item} />
          ))}
          <li className="mb-16"></li>
        </ul>
      )}
    </div>
  );
};
