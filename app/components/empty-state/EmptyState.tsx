import EmptyContentIcon from '../illustrations/EmptyContent';

export const EmptyState = ({
  title,
  content,
  className,
}: {
  title: string;
  content?: string;
  className?: string;
}) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <EmptyContentIcon className="w-full mb-2" />
      <h2 className="text-xl font-bold text-center text-gray-300 mb-1">
        {title}
      </h2>
      {content && <p className="text-gray-400 text-center">{content}</p>}
    </div>
  );
};
