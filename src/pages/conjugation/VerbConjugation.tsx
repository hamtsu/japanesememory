import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import ThemeButton from "../../components/ThemeButton";

import conjugationdata from "../../assets/conjugationdata.json";
import HiraganaInput from "../../components/HiraganaInput";
import {
  FaArrowRight,
  FaCheck,
  FaExclamationCircle,
} from "react-icons/fa";
import { FaPersonCircleExclamation, FaXmark } from "react-icons/fa6";
import Button from "../../components/Button";
import StreakCounter from "../../components/StreakCounter";

const VerbConjugation = () => {
  const [currentVerb, setCurrentVerb] = useState<{
    kanji: string;
    hiragana: string;
    te_form: string;
    english: string;
    type: string;
  }>();

  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isIncorrect, setIsIncorrect] = useState<boolean>(false);

  const [currentStreak, setCurrentStreak] = useState<number>(0);

  const [enteredAnswer, setEnteredAnswer] = useState("");

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function nextRandomVerb() {
    const verbs = conjugationdata.verbs;
    let randomVerb;
    do {
      randomVerb = verbs[getRandomInt(0, verbs.length - 1)];
    } while (randomVerb === currentVerb);
    setCurrentVerb(randomVerb);
  }

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const answer = e.target[0].value;
    setEnteredAnswer(answer);

    if (answer === currentVerb?.te_form) {
      setIsCorrect(true);
      setCurrentStreak(currentStreak + 1);
    } else {
      setIsIncorrect(true);
      setCurrentStreak(0);
    }
  };

  useEffect(() => {
    nextRandomVerb();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter" && (isCorrect || isIncorrect)) {
        e.preventDefault();
        setIsCorrect(false);
        setIsIncorrect(false);
        nextRandomVerb();
      }
    };

    window.addEventListener("keydown", handler, false);
    return () => window.removeEventListener("keydown", handler, false);
  }, [isCorrect, isIncorrect]);

  return (
    <div className="w-screen h-screen flex">
      <Sidebar currentPage={"Verb-Conjugation"} />

      <div className="w-full h-full pl-2 bg-slate-50 dark:bg-neutral-900">
        {/* Header */}
        <div className="flex px-2 pt-3">
          <div className="flex flex-col">
            <p className="text-lg text-neutral-900 dark:text-slate-50 opacity-75 dark:opacity-50">
              <b className="underline underline-offset-4">動詞</b> の 活用
            </p>
            <h1 className="text-4xl text-neutral-900 dark:text-slate-50">
              <b>Verb</b> Conjugation
            </h1>
          </div>
          <div className="flex-grow" />
          <ThemeButton />
        </div>

        {/* Content */}
        <div className="flex flex-col w-full h-full items-center mt-24 gap-20">
          {currentVerb ? (
            <>
              <StreakCounter streak={currentStreak} />
              <div className="flex gap-2">
                {isCorrect ? (
                  <>
                    <div className="text-slate-100 bg-green-600 p-3 rounded-md antialiased animate-fade-in">
                      <h3 className="text-2xl">
                        <span className="opacity-70">you were</span>{" "}
                        <b>correct</b>
                      </h3>
                      <h1 className="text-8xl font-extrabold ">
                        {currentVerb.te_form}
                      </h1>
                    </div>

                    <div className="flex flex-col gap-2 animate-fade-in">
                      <div className="text-slate-100 bg-green-600 p-3 rounded-md ">
                        <h4 className="text-2xl">{currentVerb.type}</h4>
                        <p className="text-1xl font-extrabold ">Present</p>
                      </div>

                      <div className="text-slate-100 bg-green-600 p-3 rounded-md w-fit">
                        <FaCheck size="50px" />
                      </div>
                    </div>
                  </>
                ) : isIncorrect ? (
                  <>
                    <div className="text-slate-100 bg-red-600 p-3 rounded-md antialiased animate-fade-in">
                      <h3 className="text-2xl">
                        <span className="opacity-70">you were</span>{" "}
                        <b>incorrect</b>
                      </h3>
                      <h1 className="text-8xl font-extrabold ">
                        {currentVerb.te_form}
                      </h1>
                    </div>

                    <div className="flex flex-col gap-2 animate-fade-in">
                      <div className="text-slate-100 bg-red-600 p-3 rounded-md ">
                        <h4 className="text-2xl">{currentVerb.type}</h4>
                        <p className="text-1xl font-extrabold ">Present</p>
                      </div>

                      <div className="text-slate-100 bg-red-600 p-3 rounded-md w-fit">
                        <FaXmark size="50px" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="dark:text-slate-100 bg-slate-200 dark:bg-neutral-800 p-4 rounded-md antialiased animate-fade-in">
                      <h3 className="text-4xl font-extrabold">
                        {currentVerb.hiragana}
                      </h3>
                      <h1 className="text-9xl font-extrabold ">
                        {currentVerb.kanji}
                      </h1>
                    </div>

                    <div className="dark:text-slate-100 bg-slate-200 dark:bg-neutral-800 p-3 rounded-md animate-fade-in">
                      <h2 className="text-6xl font-bold">
                        {currentVerb.english}
                      </h2>
                      <p>Conjugate this to て form</p>
                      <p className="opacity-50 mt-2">Present</p>
                    </div>
                  </>
                )}
              </div>

              {isCorrect || isIncorrect ? (
                <div>
                  <div className="flex my-2">
                    <p className="text-neutral-800/50 dark:text-slate-100/60 ">
                      you entered{" "}
                      <b className="text-neutral-800 dark:text-slate-100">
                        {enteredAnswer}
                      </b>
                    </p>

                    <div className="flex-grow" />

                    <p className="text-neutral-800/50 dark:text-slate-100/60 flex items-center gap-1 hover:text-red-500 hover:dark:text-red-500 hover:cursor-pointer transition-colors">
                      <FaExclamationCircle size={15} /> report problem
                    </p>
                  </div>

                  <Button
                    type="secret-success"
                    className="w-96 font-bold text-lg flex items-center gap-1"
                    onClick={() => {
                      setIsCorrect(false);
                      setIsIncorrect(false);
                      nextRandomVerb();
                    }}
                  >
                    Next verb <FaArrowRight />
                  </Button>
                </div>
              ) : (
                <div className="dark:text-slate-100 bg-slate-200 dark:bg-neutral-800 p-2 rounded-md w-96">
                  <form onSubmit={onSubmit}>
                    <HiraganaInput />
                    <input type="submit" className="hidden" />
                  </form>
                </div>
              )}
            </>
          ) : (
            <div className="dark:text-slate-100 bg-slate-200 dark:bg-neutral-800 p-4 rounded-md antialiased">
              <FaPersonCircleExclamation
                className="animate-fade-in"
                size={30}
              />
              <h1 className="text-4xl ">Loading...</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerbConjugation;
