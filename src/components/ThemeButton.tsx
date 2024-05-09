import { FaAngleDown, FaMoon, FaSun } from "react-icons/fa";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import useDarkMode from "../hooks/useDarkMode";

const ThemeButton = () => {
  const [theme, setTheme] = useDarkMode();

  return (
    <Dropdown
      left
      items={[
        {
          name: "Light mode",
          icon: <FaSun />,
          callback: () => setTheme("light"),
        },
        {
          name: "Dark mode",
          icon: <FaMoon />,
          callback: () => setTheme("dark"),
        },
      ]}
    >
      <Button
        type="secondary"
        className="text-xl flex gap-1 items-center py-2"
        padding="p-2 py-1"
      >
        {theme == "light" ? <FaSun /> : <FaMoon />}
        <span className="text-[1rem]">
          <FaAngleDown />
        </span>
      </Button>
    </Dropdown>
  );
};

export default ThemeButton;
