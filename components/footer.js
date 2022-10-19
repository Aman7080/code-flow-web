import Image from "next/image";
import { myLoader } from "@utils/all";
import { ThemeSwitch } from "./themeSwitch";

export default function Footer(props) {
  return (
    <footer>
      <ThemeSwitch />
      <div className=" px-8 py-5 border-t border-gray-200 dark:border-gray-700 lg:py-8 mx-auto xl:px-5">
        <div className="text-sm text-center">
          Copyright © {new Date().getFullYear()} {props?.copyright}. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
