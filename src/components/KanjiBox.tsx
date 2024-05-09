import { useEffect, FC, useState } from "react";
import "./../assets/raphael";
import "./../assets/dmak";
import Button from "./Button";

type KanjiBox = {
  kanji: string;
};

export const KanjiBox: FC<KanjiBox> = ({ kanji }) => {
  const [dmakInstance, setDmakInstance] = useState<any>(null);

  useEffect(() => {
    if (!dmakInstance) {
      const options = {
        uri: "./../../kanji/", // Path to SVG files
        skipLoad: true,
        autoplay: true,
        element: "kanjicontainer",
        width: 256,
        height: 256
      }
      const dmakInstance = new window.Dmak(kanji, options)
      
      setDmakInstance(dmakInstance)
  
      return () => {
        dmakInstance.pause()
      };
    }
  }, []);

  return (
    <div className="flex flex-col">
      <div className="rounded-md bg-slate-300 w-[16rem] h-[16rem]">
        <div id="kanjicontainer" className="p-1 text-[10rem] text-neutral-900"></div>
      </div>

      <div className="flex gap-1">
        <Button type="primary" onClick={() => dmakInstance.renderNextStrokes(1)}>Next</Button>
        <Button type="primary" onClick={() => dmakInstance.eraseLastStrokes(1)}>Previous</Button>
      </div>
    </div>
  );
};
