import { KanjiBox } from "../components/KanjiBox";
import Sidebar from "../components/Sidebar";
import ThemeButton from "../components/ThemeButton";

const Kanji = () => {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar />

      <div className="w-full h-full bg-slate-50 dark:bg-neutral-900">

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
          <div className="flex-grow" />
          <ThemeButton />
        </div>

        {/* Main */}
        <div className="flex px-4 mt-8">
            <KanjiBox kanji="新" />
        </div>
      </div>
    </div>
  );
};

export default Kanji;
