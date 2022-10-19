import { useTheme } from "next-themes";
import { SunIcon, MoonIcon,Cog8ToothIcon } from "@heroicons/react/24/outline";

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-end dark:text-gray-200 my-3">
       <div
        className="flex cursor-pointer  hover:scale-110 "
        onClick={(e) => setTheme("system")}
      >
        <Cog8ToothIcon className=" w-6 h-6 mx-4" />
        <p className="text">System</p>
      </div>
      <div
        className="flex cursor-pointer  hover:scale-110 "
        onClick={(e) => setTheme("dark")}
      >
        <MoonIcon className=" w-6 h-6 mx-4" />
        <p className="text">Dark</p>
      </div>
      <div
        className="flex cursor-pointer hover:scale-110 "
        onClick={(e) => setTheme("light")}
      >
        <SunIcon className="w-6 h-6 mx-4" />
        <p>Light</p>
      </div>
    </div>
  );
};
