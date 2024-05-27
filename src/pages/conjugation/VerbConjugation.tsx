import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import ThemeButton from "../../components/ThemeButton";

import conjugationdata from "../../assets/conjugationdata.json";
import HiraganaInput from "../../components/HiraganaInput";
import { FaArrowRight, FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import Button from "../../components/Button";

const VerbConjugation = () => {
  const [currentVerb, setCurrentVerb] = useState<{
    kanji: string;
    hiragana: string;
    te_form: string;
    english: string;
  }>();

  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isIncorrect, setIsIncorrect] = useState<boolean>(false);

  const [enteredAnswer, setEnteredAnswer] = useState("")

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function nextRandomVerb() {
    const verbs = conjugationdata.verbs;
    let randomVerb = verbs[0][getRandomInt(0, verbs[0].length - 1)];

    if (currentVerb !== randomVerb) {
      setCurrentVerb(randomVerb);
    } else {
      while (randomVerb === currentVerb) {
        randomVerb = verbs[0][getRandomInt(0, verbs[0].length - 1)];
      }
    }
  }

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEnteredAnswer(e.target[0].value)

    if (e.target[0].value == currentVerb?.te_form) {
      setIsCorrect(true);
    } else {
      setIsIncorrect(true);
    }
  };

  useEffect(() => {
    // nextRandomVerb();
  }, []);

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
        <div className="flex flex-col w-full h-full items-center justify-center gap-20">
          {currentVerb && (
            <>
              <div className="flex gap-2">
                {isCorrect ? (
                  <>
                    <div className="text-slate-100 bg-green-600 p-3 rounded-md">
                      <h3 className="text-2xl">
                        <span className="opacity-70">you were</span>{" "}
                        <b>correct</b>
                      </h3>
                      <h1 className="text-8xl font-extrabold ">
                        {currentVerb.te_form}
                      </h1>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="text-slate-100 bg-green-600 p-3 rounded-md ">
                        <h4 className="text-2xl">う-verb</h4>
                        <p className="text-1xl font-extrabold ">Present</p>
                      </div>

                      <div className="text-slate-100 bg-green-600 p-3 rounded-md w-fit">
                        <FaCheck size="50px" />
                      </div>
                    </div>
                  </>
                ) : isIncorrect ? (
                  <>
                    <div className="text-slate-100 bg-red-600 p-3 rounded-md">
                      <h3 className="text-2xl">
                        <span className="opacity-70">you were</span>{" "}
                        <b>incorrect</b>
                      </h3>
                      <h1 className="text-8xl font-extrabold ">
                        {currentVerb.te_form}
                      </h1>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="text-slate-100 bg-red-600 p-3 rounded-md ">
                        <h4 className="text-2xl">う-verb</h4>
                        <p className="text-1xl font-extrabold ">Present</p>
                      </div>

                      <div className="text-slate-100 bg-red-600 p-3 rounded-md w-fit">
                        <FaXmark size="50px" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="dark:text-slate-100 bg-slate-200 dark:bg-neutral-800 p-3 rounded-md">
                      <h3 className="text-4xl font-extrabold">
                        {currentVerb.hiragana}
                      </h3>
                      <h1 className="text-9xl font-extrabold ">
                        {currentVerb.kanji}
                      </h1>
                    </div>

                    <div className="dark:text-slate-100 bg-slate-200 dark:bg-neutral-800 p-3 rounded-md">
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
                    <p className="text-neutral-800/50 dark:text-slate-100/60 my-2">you entered <b className="text-neutral-800 dark:text-slate-100">{enteredAnswer}</b></p>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default VerbConjugation;
