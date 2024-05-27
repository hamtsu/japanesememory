import { FC } from "react";

type SteppedSliderProps = {
  maxValue: number;
  value?: number;
  loaded?: boolean;
  autoplay?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const SteppedSlider: FC<SteppedSliderProps> = ({ maxValue, value, autoplay, onChange }) => {
  return (
    <div className="w-full">
      <input
          type="range"
          min={0}
          max={maxValue}
          disabled={autoplay}
          value={value}
          step={1}
          onChange={onChange}
          className=""
        />
    </div>
  );
};

export default SteppedSlider;
