import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import ThemeButton from "../../components/ThemeButton";

import conjugationdata from "../../assets/conjugationdata.json";
import HiraganaInput from "../../components/HiraganaInput";
import {
  FaArrowRight,
  FaCheck,
  FaCog,
  FaExclamationCircle,
  FaFlag,
} from "react-icons/fa";
import { FaPersonCircleExclamation, FaXmark } from "react-icons/fa6";
import Button from "../../components/Button";
import StreakCounter from "../../components/StreakCounter";
import Checkbox from "../../components/Checkbox";
import Divider from "../../components/Divider";

const VerbConjugation = () => {
  const [currentVerb, setCurrentVerb] = useState<{
    kanji: string;
    hiragana: string;
    te_form: string;
    english: string;
    type: string;
    past_affirmative_plain: string;
    past_affirmative_polite: string;
    past_negative_plain: string;
    past_negative_polite: string;
    present_negative_plain: string;
    present_negative_polite: string;
  }>();
  const [currentConjugationType, setCurrentConjugationType] =
    useState<String>("te_form");

  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isIncorrect, setIsIncorrect] = useState<boolean>(false);

  const [currentStreak, setCurrentStreak] = useState<number>(0);

  const [enteredAnswer, setEnteredAnswer] = useState("");

  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomConjugationType() {
    const types = [
      "te_form",
      "past_affirmative_plain",
      "past_affirmative_polite",
      "past_negative_plain",
      "past_negative_polite",
      "present_negative_plain",
      "present_negative_polite",
    ];
    return types[getRandomInt(0, types.length - 1)];
  }

  function nextRandomVerb() {
    const verbs = conjugationdata.verbs;
    const randomType = randomConjugationType();
    let randomVerb;

    do {
      randomVerb = verbs[getRandomInt(0, verbs.length - 1)];
    } while (randomVerb === currentVerb);

    setCurrentVerb(randomVerb);
    setCurrentConjugationType(randomType);
  }

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const answer = e.target[0].value;
    setEnteredAnswer(answer);

    if (answer === currentVerb?.[currentConjugationType]) {
      setIsCorrect(true);
      setCurrentStreak(currentStreak + 1);
    } else {
      setIsIncorrect(true);
      setCurrentStreak(0);
    }
  };

  const onOptionChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    console.log(e.target.id);
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
          <div className="flex-grow" />
          <ThemeButton />
        </div>

        {/* Content */}
        <div className="flex flex-col w-full h-full items-center mt-20 gap-20">
          {currentVerb && !isSettingsOpen ? (
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
                        {currentVerb[currentConjugationType]}
                      </h1>
                    </div>

                    <div className="flex flex-col gap-2 animate-fade-in">
                      <div className="text-slate-100 bg-green-600 p-3 rounded-md ">
                        <h4 className="text-2xl">{currentVerb.type}</h4>
                        <p className="text-1xl font-extrabold ">
                          {currentConjugationType.replace(/_/g, " ")}
                        </p>
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
                        {currentVerb[currentConjugationType]}
                      </h1>
                    </div>

                    <div className="flex flex-col gap-2 animate-fade-in">
                      <div className="text-slate-100 bg-red-600 p-3 rounded-md ">
                        <h4 className="text-2xl">{currentVerb.type}</h4>
                        <p className="text-1xl font-extrabold ">
                          {currentConjugationType.replace(/_/g, " ")}
                        </p>
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

                    <div className="flex gap-2 flex-col">
                      <div className="dark:text-slate-100 bg-slate-200 dark:bg-neutral-800 p-3 rounded-md animate-fade-in h-fit">
                        <h2 className="text-6xl font-bold">
                          {currentVerb.english}
                        </h2>
                        <p className="opacity-50 mt-2">Conjugate this to</p>
                        <p className="opacity-100 font-bold">
                          {currentConjugationType.replace(/_/g, " ")}
                        </p>
                      </div>
                      <div className="dark:text-slate-100 flex gap-1 bg-slate-200 dark:bg-neutral-800 p-1 rounded-md animate-fade-in h-fit">
                        <Button
                          type="secret"
                          className="flex items-center gap-2"
                          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                        >
                          <FaCog /> settings
                        </Button>
                        <Button
                          type="secret"
                          className="hover:dark:text-red-500 hover:text-red-500 flex items-center gap-2"
                        >
                          <FaFlag /> report issue
                        </Button>
                      </div>
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
          ) : isSettingsOpen ? (
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <div className="flex gap-2 items-center w-fit dark:text-slate-100 bg-slate-200 dark:bg-neutral-800 p-4 rounded-md animate-fade-in antialiased">
                  <FaCog
                    className="animate-fade-in-late opacity-70"
                    size={30}
                  />
                  <h1 className="text-4xl font-bold">Verb settings</h1>
                </div>

                <div className="w-4 bg-slate-200 dark:bg-neutral-850 rounded-md animate-fade-in antialiased" />

                <Button type="secret-error" onClick={() => setIsSettingsOpen(false)} className="w-12 flex items-center">
                  <FaXmark size={30} />
                </Button>
              </div>
              <div className="flex w-96 flex-col gap-2 dark:text-slate-100 bg-slate-200 dark:bg-neutral-800 p-4 rounded-md animate-fade-in antialiased">
                <h3 className="text-2xl font-bold opacity-80">Verb type</h3>
                <Checkbox
                  id="u-verbs"
                  label="う-verbs"
                  onChange={onOptionChange}
                />
                <Checkbox
                  id="ru-verbs"
                  label="る-verbs"
                  onChange={onOptionChange}
                />
                <Checkbox
                  id="irregular-verbs"
                  label="irregular"
                  onChange={onOptionChange}
                />
                <Divider />

                <h3 className="text-2xl mt-3 font-bold opacity-80">
                  Verb tense
                </h3>
                <Checkbox
                  id="te-form"
                  label="(て) Te-form"
                  onChange={onOptionChange}
                />
                <Checkbox
                  id="past-tense"
                  label="past tense"
                  onChange={onOptionChange}
                />
                <Checkbox
                  id="present-tense"
                  label="present tense"
                  onChange={onOptionChange}
                />
                <Divider />

                <h3 className="text-2xl mt-3 font-bold opacity-80">
                  Verb assertion
                </h3>
                <Checkbox
                  id="affirmative"
                  label="affirmative"
                  onChange={onOptionChange}
                />
                <Checkbox
                  id="negative"
                  label="negative"
                  onChange={onOptionChange}
                />
                <Divider />

                <h3 className="text-2xl mt-3 font-bold opacity-80">
                  Verb formality
                </h3>
                <Checkbox id="plain" label="plain" onChange={onOptionChange} />
                <Checkbox
                  id="polite"
                  label="polite"
                  onChange={onOptionChange}
                />
                <Divider />
              </div>
            </div>
          ) : (
            <div className="dark:text-slate-100 w-96 h-36 mt-36 bg-slate-200 dark:bg-neutral-800 p-4 rounded-md antialiased">
              <FaPersonCircleExclamation
                className="animate-fade-in"
                size={30}
              />
              <h1 className="text-4xl font-bold">Loading...</h1>
              <p>Currently loading please wait</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerbConjugation;
