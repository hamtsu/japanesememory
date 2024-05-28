import { FC, useState } from "react";

type MultiSelectProps = {
  items: { name: string; defaultOn: boolean }[];
  handleToggleItem: (name: string, isOn: boolean) => void;
};

const MultiSelect: FC<MultiSelectProps> = ({ items, handleToggleItem }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(
    items.filter((item) => item.defaultOn).map((item) => item.name)
  );

  const [error, setError] = useState<string>();

  const onItemClick = (name: string) => {
    if (selectedItems.includes(name)) {
      if (selectedItems.length - 1 === 0) {
        setError(name);
      } else {
        setSelectedItems(selectedItems.filter((item) => item !== name));
        handleToggleItem(name, false);
      }
    } else {
      setSelectedItems([...selectedItems, name]);
      handleToggleItem(name, true);
    }
  };

  return (
    <div className="bg-slate-300 dark:bg-neutral-900 border border-neutral-900 dark:border-slate-100 border-opacity-30 dark:border-opacity-30 rounded-md overflow-hidden w-fit flex select-none cursor-pointer h-fit">
      {items.map((item) => (
        <div
          key={item.name}
          onClick={() => onItemClick(item.name)}
          className={`${
            selectedItems.includes(item.name)
              ? `${error === item.name && 'animate-error'} bg-slate-100 text-neutral-800`
              : ""
          } w-[50%]whitespace-nowrap h-full text-center font-semibold p-2 px-4`}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default MultiSelect;
