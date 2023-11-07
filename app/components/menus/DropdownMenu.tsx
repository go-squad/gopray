import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { NavLink } from '@remix-run/react';

export enum PrayerOptions {
  edit = 'edit',
  delete = 'delete',
}

const DropdownMenuDemo = ({
  id,
  onSelection,
}: {
  id: string;
  onSelection: (option: PrayerOptions) => void;
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-violet11  shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
          aria-label="Customise options"
        >
          <EllipsisVerticalIcon className="h-5 w-5 text-gray-400" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[120px] bg-gray-700 rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={1}
          collisionPadding={10}
        >
          <DropdownMenu.Item className="group text-base text-left leading-none text-gray-100 rounded-[3px] flex items-center h-[25px] p-4 py-6 relative select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
            <NavLink
              to={`/motive?id=${id}`}
              className="flex justify-center flex-col items-center"
            >
              <span className="font-light mt-1">Editar</span>
            </NavLink>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="h-px bg-gray-400" />

          <DropdownMenu.Item className="group text-base leading-none text-orem-500 rounded-[3px] flex items-center h-[25px] p-4 py-6 relative select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
            <button onClick={() => onSelection(PrayerOptions.delete)}>
              Deletar
            </button>
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className="fill-gray-700" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownMenuDemo;
