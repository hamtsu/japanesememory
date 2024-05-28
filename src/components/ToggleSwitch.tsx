import { FC, useState } from "react";

type ToggleSwitchProps = {
  defaultOn?: boolean;
  handleToggle: (isOn: boolean) => void;
  offText?: string;
  onText?: string;
};

const ToggleSwitch: FC<ToggleSwitchProps> = ({
  defaultOn,
  handleToggle,
  offText,
  onText,
}) => {
  const [isOn, setIsOn] = useState<boolean>(defaultOn ? defaultOn : false);

  const handleClick = () => {
    setIsOn(!isOn);
    handleToggle(!isOn);
  };

  return (
    <div
      className="bg-slate-300 dark:bg-neutral-900 border border-neutral-900 dark:border-slate-100 border-opacity-30 dark:border-opacity-30 rounded-md overflow-hidden w-fit flex select-none cursor-pointer h-fit"
      onClick={handleClick}
    >
      <div
        className={`${
          isOn ? "" : "bg-slate-100 text-neutral-800"
        } w-[50%] h-full text-center font-semibold p-2 px-4`}
      >
        {offText ? offText : "off"}
      </div>
      <div
        className={`${
          isOn ? "bg-slate-100 text-neutral-800" : ""
        } w-[50%] h-full text-center fold-semibold p-2 px-4`}
      >
        {offText ? onText : "on"}
      </div>
    </div>
  );
};

export default ToggleSwitch;
