import { useEffect, useRef, useState } from "react";
import { KanjiBox } from "../components/KanjiBox";
import Sidebar from "../components/Sidebar";
import ThemeButton from "../components/ThemeButton";

import axios from "axios";
import { FaTriangleExclamation } from "react-icons/fa6";
import Divider from "../components/Divider";

const Kanji = () => {
  const [currentKanji, setCurrentKanji] = useState("新");
  const [kanjiData, setKanjiData] = useState<{}>();
  const [kanjiVocabData, setKanjiVocabData] = useState<[]>();
  const [dataError, setDataError] = useState(false);

  const kanjiBoxRef = useRef()

  const fetchKanjiData = async (kanji: string) => {
    try {
      const response = await axios.get(
        `https://kanjiapi.dev/v1/kanji/` + kanji
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Kanji data:", error);
      setDataError(true);
      return null;
    }
  };

  const fetchKanjiVocabData = async (kanji: string) => {
    try {
      const response = await axios.get(
        `https://kanjiapi.dev/v1/words/` + kanji
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Kanji VOCAB data:", error);
      setDataError(true);
      return null;
    }
  }

  useEffect(() => {
    fetchKanjiData(currentKanji)
      .then((data) => {
        setKanjiData(data);
        console.log(data);

        kanjiBoxRef.current?.firstRender()
      })
      .catch((error) => {
        console.error("Error:", error);
      });

      fetchKanjiVocabData(currentKanji)
      .then((data) => {
        setKanjiVocabData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

  }, []);

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDataError(false);
    setCurrentKanji(e.target.elements.kanjiSearch.value);
    fetchKanjiData(e.target.elements.kanjiSearch.value)
      .then((data) => {
        setKanjiData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

      fetchKanjiVocabData(e.target.elements.kanjiSearch.value)
      .then((data) => {
        setKanjiVocabData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="w-screen h-screen flex">
      <Sidebar currentPage={"Kanji"} />

      <div className="h-full pl-2 bg-slate-50 dark:bg-neutral-900 w-full">
        {/* Header */}
        <div className="flex px-2 pt-3">
          <div className="flex flex-col">
            <p className="text-lg text-neutral-900 dark:text-slate-50 opacity-75 dark:opacity-50">
              <b className="underline underline-offset-4">漢字</b> の れんしゅう
            </p>
            <h1 className="text-4xl text-neutral-900 dark:text-slate-50">
              <b>Kanji</b> Practice
            </h1>
          </div>
          <form onSubmit={onSubmit} className="ml-32">
            <input
              name="kanjiSearch"
              className="bg-neutral-800 text-slate-100 p-2 text-lg rounded-md "
              defaultValue={currentKanji}
            />
            <input
              type="submit"
              className="bg-slate-200 rounded-md p-2 ml-1"
              value="Lookup"
            />
          </form>
          <div className="flex-grow" />
          <ThemeButton />
        </div>

        {/* Main */}
        {kanjiData && kanjiVocabData && !dataError ? (
          <div className="flex px-4 mt-8">
            <KanjiBox kanji={currentKanji} ref={kanjiBoxRef} />
            <div className="ml-5 dark:text-slate-100 text-neutral-900 flex ">
              <div className="flex flex-col">
                {/* Header Section */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <div className="text-4xl font-bold">
                      {kanjiData.meanings.map((meaning, index) => (
                        <>
                          <span
                            key={index}
                            className={`${
                              index == 0 &&
                              "bg-neutral-800 dark:bg-slate-100 bg-opacity-10 dark:bg-opacity-10 border border-opacity-20 dark:border-opacity-20 border-neutral-800 dark:border-slate-100 p-[2px] items-center rounded-md"
                            }`}
                          >
                            {meaning}
                          </span>
                          {index != kanjiData.meanings.length - 1 && (
                            <span className="">, </span>
                          )}
                        </>
                      ))}
                    </div>
                    <div className="bg-slate-100 text-neutral-850 p-1 rounded-md h-fit">
                      JLPT <b>N{kanjiData.jlpt}</b>
                    </div>
                    <div className="bg-slate-100 text-neutral-850 p-1 rounded-md h-fit">
                      Jōyō <b>Grade {kanjiData.grade}</b>
                    </div>
                  </div>
                  <p className="opacity-50 text-sm mt-2">
                    There are {kanjiData.stroke_count} strokes for this kanji
                  </p>
                </div>

                {/* Readings Section */}
                <div className="mt-10 mb-3 flex-col">
                  {/* Kunyomi */}
                  <div className="flex flex-col">
                    <p className="opacity-50 mb-[-8px] font-bold">訓 読 み</p>
                    <h2 className="font-bold text-lg">kun readings</h2>
                  </div>
                  <div className="flex gap-1">
                    {kanjiData.kun_readings.map((reading: string) => (
                      <div className="bg-neutral-800 text-slate-100 p-1 rounded-md">
                        {reading}
                      </div>
                    ))}
                  </div>

                  {/* Onyomi */}
                  <div className="flex flex-col mt-5">
                    <p className="opacity-50 mb-[-8px] font-bold">音 読 み</p>
                    <h2 className="font-bold text-lg">on readings</h2>
                  </div>
                  <div className="flex gap-1">
                    {kanjiData.on_readings.map((reading: string) => (
                      <div className="bg-neutral-800 text-slate-100 p-1 rounded-md">
                        {reading}
                      </div>
                    ))}
                  </div>
                </div>

                <Divider />

                {/* Vocab Section */}
                <div className="mt-3 flex-col">
                  <h2 className="font-bold text-lg">vocabulary</h2>
                  <div className="flex gap-1">
                    {kanjiVocabData.slice(0, 5).map((meanings: string[], variants: string[], t) => (
                      <div>{t[0].variants[0].written}</div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </div>
        ) : (
          dataError && (
            <div className="dark:text-slate-100 ml-12 w-full text-center max-w-[500px]">
              <h1 className="text-4xl opacity-50 font-bold">
                <FaTriangleExclamation className="mx-auto" /> Unable to find{" "}
                <b>{currentKanji}</b>
              </h1>
              <p className="text-lg mt-12 opacity-50">
                The API request for this character failed, so it may not exist.
                Please try refining your search for this term again, or check
                your internet connection if this issue persists.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Kanji;
