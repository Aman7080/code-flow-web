// import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export const SideThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="fixed flex-row justify-center sm:hidden">
      <div className=" bg-slate-50 dark:bg-slate-600 p-4 border border-gray-900" onClick={(e) => setTheme("dark")}>
        <MoonIcon className=" w-8 h-8" />
      </div>
      <div className=" bg-slate-50 dark:bg-slate-600  p-4 border border-gray-900" onClick={(e) => setTheme("light")}>
        <SunIcon className="w-8 h-8" /> 
      </div>
    </div>
  );
};


