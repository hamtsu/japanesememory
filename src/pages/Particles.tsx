import Sidebar from "../components/Sidebar";
import ThemeButton from "../components/ThemeButton";

const Particles = () => {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar currentPage={"Particles"} />

      <div className="w-full h-full pl-2 bg-slate-50 dark:bg-neutral-900">
        {/* Header */}
        <div className="flex px-2 pt-3">
          <div className="flex flex-col">
            <h1 className="text-4xl text-neutral-900 dark:text-slate-50">
              <b>Particle</b> Practice
            </h1>
          </div>
          <div className="flex-grow" />
          <ThemeButton />
        </div>
      </div>
    </div>
  );
};

export default Particles;
