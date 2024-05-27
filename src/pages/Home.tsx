import Sidebar from "../components/Sidebar";
import ThemeButton from "../components/ThemeButton";

const Home = () => {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar currentPage={"Home"} />

      <div className="w-full h-full p-2 bg-slate-50 dark:bg-neutral-900">
        {/* Header */}
        <div className="flex px-2 pt-3">
          <div className="flex flex-col">
            <h1 className="text-5xl text-neutral-900 dark:text-slate-50">
              <b>Home</b>
            </h1>
          </div>
          <div className="flex-grow" />
          <ThemeButton />
        </div>

        {/* Content */}
        <div className="flex p-4 mt-14 gap-4">
            <div className="bg-slate-200 dark:bg-neutral-850 rounded-lg p-3 dark:text-slate-100 border dark:border-neutral-700">
                <h1 className="text-2xl font-bold">Kanji Lookup</h1>

                <div className="flex mt-4 h-fit">
                    <div className="bg-gray-600 w-2 h-full rounded-md" />
                    <p>Look up kanji information here, including the stroke order.</p>
                </div>
            </div>

            <div className="bg-slate-200 dark:bg-neutral-850 rounded-lg p-3 dark:text-slate-100 border dark:border-neutral-700">
                <h1 className="text-2xl font-bold">Conjugation</h1>

                <div className="flex mt-4 h-fit">
                    <div className="bg-gray-600 w-2 h-full rounded-md" />
                    <p>Look up kanji information here, including the stroke order.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
