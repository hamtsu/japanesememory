import Sidebar from "../../components/Sidebar";
import ThemeButton from "../../components/ThemeButton";

const AdjectiveConjugation = () => {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar currentPage={"Adjective-Conjugation"} />

      <div className="w-full h-full pl-2 bg-slate-50 dark:bg-neutral-900">
        {/* Header */}
        <div className="flex px-2 pt-3">
          <div className="flex flex-col">
            <p className="text-lg text-neutral-900 dark:text-slate-50 opacity-75 dark:opacity-50">
              <b className="underline underline-offset-4">形容詞</b> の 活用
            </p>
            <h1 className="text-4xl text-neutral-900 dark:text-slate-50">
              <b>Adjective</b> Conjugation
            </h1>
          </div>
          <div className="flex-grow" />
          <ThemeButton />
        </div>
      </div>
    </div>
  );
};

export default AdjectiveConjugation;
