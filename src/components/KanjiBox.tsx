import {
  useEffect,
  FC,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import "./../assets/raphael";
import "./../assets/dmak";
import Button from "./Button";
import SteppedSlider from "./SteppedSlider";
import {
  FaBackward,
  FaCog,
  FaForward,
  FaPause,
  FaPlay,
  FaRedo,
} from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

type KanjiBox = {
  kanji: string;
};

export const KanjiBox: FC<KanjiBox> = forwardRef(({ kanji }, ref) => {
  const [dmakInstance, setDmakInstance] = useState<any>(null);
  const [currentStroke, setCurrentStroke] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!dmakInstance) {
      const options = {
        uri: "./../../kanji/", // Path to SVG files
        skipLoad: false,
        autoplay: false,
        element: "kanjicontainer",
        width: 256,
        height: 256,
        step: 0.02,
        stroke: {
          attr: {
            active: "#FFFFFF",
          },
          order: {
            visible: true,
          },
        },
        grid: {
          attr: {
            stroke: "#2C2C2C",
            "stroke-dasharray": "- ",
            "stroke-width": 0.2,
          },
        },
        erased: function () {
          setCurrentStroke((prevState) => prevState - 1);
        },
        drew: function () {
          setCurrentStroke((prevState) => prevState + 1);
        },
        loaded: function () {
          setIsLoaded((prevState) => true);
        },
      };

      const dmakInstance = new window.Dmak(kanji, options);

      setDmakInstance(dmakInstance);

      return () => {
        dmakInstance.destroy();
        setDmakInstance(null);
        setIsLoaded(false);
      };
    }
  }, [kanji]);

  // When autoplay finished
  useEffect(() => {
    if (dmakInstance && currentStroke === dmakInstance.strokes.length) {
      setIsAutoPlaying(false);
    }
  }, [currentStroke, dmakInstance]);

  const render = () => {
    if (currentStroke != dmakInstance.strokes.length) {
      console.log("exec");
      setIsAutoPlaying(true);
      dmakInstance.render();
    }
  };

  const firstRender = () => {
    setIsAutoPlaying(true);
    dmakInstance.render();
  };

  useImperativeHandle(ref, () => ({
    firstRender: firstRender,
  }));

  const pause = () => {
    if (currentStroke != dmakInstance.strokes.length) {
      setIsAutoPlaying(false);
      dmakInstance.pause();
    }
  };

  const redraw = () => {
    if (currentStroke == dmakInstance.strokes.length) {
      dmakInstance.erase();
    }
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(event.target.value) > currentStroke) {
      dmakInstance.renderNextStrokes(
        parseInt(event.target.value) - currentStroke
      );
    } else {
      dmakInstance.eraseLastStrokes(
        currentStroke - parseInt(event.target.value)
      );
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-md bg-slate-300 border-slate-400 border-2 w-[17rem] overflow-hidden p-2 flex flex-col items-center">
        <div className="w-full flex">
          <div className="opacity-50 uppercase mb-5 mr-auto">
            <FaCog />
          </div>
        </div>
        <div
          id="kanjicontainer"
          className="text-[10rem] text-neutral-900 h-[16rem] overflow-hidden"
        >
          {!isLoaded && <p className="text-sm">Loading...</p>}
        </div>
        <div className="flex w-full flex-row gap-2 justify-center mt-2 text-lg">
          <Button
            type="secret-kanji"
            onClick={() => dmakInstance.eraseLastStrokes(1)}
            disabled={isAutoPlaying}
          >
            <FaBackward />
          </Button>
          <Button
            type="secret-kanji"
            disabled={isAutoPlaying}
            onClick={
              isAutoPlaying
                ? pause
                : currentStroke > 0 &&
                  currentStroke === dmakInstance?.strokes.length
                ? redraw
                : render
            }
          >
            {isAutoPlaying ? (
              <FaPause />
            ) : currentStroke > 0 &&
              currentStroke == dmakInstance?.strokes.length ? (
              <FaRedo />
            ) : (
              <FaPlay />
            )}
          </Button>
          <Button
            type="secret-kanji"
            onClick={() => dmakInstance.renderNextStrokes(1)}
            disabled={isAutoPlaying}
          >
            <FaForward />
          </Button>
        </div>
        <div className="flex w-full flex-row items-end">
          <div className="opacity-50 uppercase self-start text-sm items-end">
            {isAutoPlaying && <FaPlay className="animate-pulse" />}
          </div>
          <div className="flex-grow" />
          <div className="opacity-50 uppercase self-end">{currentStroke}</div>
        </div>
      </div>

      {/* Slider */}
      <div className="flex gap-1 rounded-md bg-slate-200 dark:bg-neutral-800 p-2">
        <SteppedSlider
          autoplay={isAutoPlaying}
          onChange={handleSliderChange}
          value={currentStroke}
          maxValue={dmakInstance?.strokes.length}
          loaded={currentStroke == dmakInstance?.strokes.length}
        />
      </div>

      {/* Frequency */}
      <div className="flex gap-1 rounded-md">
        <div className="bg-purple-700 p-1 px-2 text-purple-300 flex rounded-md items-center font-bold gap-2">
          Netflix <FaStar /><b>5</b>
        </div>

        <div className="bg-green-700 p-1 px-2 text-green-300 flex rounded-md items-center font-bold gap-2">
          Novels <FaStar /><b>5</b>
        </div>
      </div>
    </div>
  );
});
