import { ChangeEventHandler, FC } from "react";

type CheckboxProps = {
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
  id: string;
};

const Checkbox: FC<CheckboxProps> = ({ checked, onChange, label, id }) => {
  return (
    <div className="flex items-center">
      <input
        checked={checked}
        id={id}
        type="checkbox"
        value=""
        onChange={onChange}
        className="w-4 h-4 form-checkbox custom-checkbox" />
      <label
        htmlFor={id}
        className="ms-2 text-sm text-slate-900 dark:text-slate-200 font-bold"
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
