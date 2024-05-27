import { FC, useEffect, useState } from "react";

type StreakCounterProps = {
  streak: number;
};

const StreakCounter: FC<StreakCounterProps> = ({ streak }) => {
  const [maxStreak, setMaxStreak] = useState(5);
  const incrementValue = 5;

  const widthPercentage = `${(streak / maxStreak) * 100}%`;

  useEffect(() => {
    if (streak >= maxStreak) {
      setMaxStreak(maxStreak + incrementValue);
    }
  }, [streak]);

  return (
    <div className="dark:text-slate-100 bg-slate-200 dark:bg-neutral-800 px-4 pt-4 pb-2 rounded-md antialiased w-96 flex flex-col justify-center">
      <div className="w-full bg-slate-300 dark:bg-neutral-700 rounded-sm h-[5px] overflow-hidden">
        <div
          className={`bg-neutral-800 dark:bg-slate-200 transition-all h-full`}
          style={{ width: widthPercentage }}
        ></div>
      </div>

      <div className="flex">
        {streak > 0 ? (
          <>
            <p className="text-neutral-800/50 dark:text-slate-100/50 text-sm">
              you have a{" "}
              <b className="text-neutral-800 dark:text-slate-100">{streak}</b>{" "}
              streak
            </p>
            <div className="flex-grow" />
            <p className="text-neutral-800/50 dark:text-slate-100/50 text-sm">
              <b className="text-neutral-800 dark:text-slate-100">
                {maxStreak - streak}
              </b>{" "}
              left to go till {maxStreak}
            </p>
          </>
        ) : (
          <p className="text-neutral-800/50 dark:text-slate-100/50 text-sm">
            no current streak
          </p>
        )}
      </div>
    </div>
  );
};

export default StreakCounter;
