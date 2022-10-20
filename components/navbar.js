import React from "react";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";

export default function Navbar(props) {
  const menu = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "Blogs",
      href: "/post",
    },
    {
      label: "Codes",
      href: "/codes",
    },
    {
      label: "Github",
      href: "https://github.com/Aman7080",
      external: true,
    },
  ];

  const mobilemenu = [...menu];

  return (
    <>
      <div className="flex justify-around px-8 py-5 lg:py-8 mx-auto xl:px-5 ">
        <div className=" font-nabla font-bold text-4xl justify-start items-start">
          <span>STORM BLAZER</span>
        </div>
        <nav>
          <Disclosure>
            {({ open }) => (
              <>
                <div className="flex flex-wrap justify-between md:gap-10 md:flex-nowrap">
                  <div className="items-center order-1 hidden w-full md:flex md:flex-row md:justify-center md:w-auto md:order-none md:flex-1 ">
                    {menu.map((item, index) => (
                      <Link
                        href={item.href}
                        key={index}
                        target={item.external ? "_blank" : ""}
                        rel={item.external ? "noopener" : ""}
                      >
                        <a className="px-5 mx-1 py-2 text-base font-semibold text-gray-600 dark:text-gray-200 hover:text-cyan-600 hover:underline dark:hover:text-cyan-400">
                          {item.label}
                        </a>
                      </Link>
                    ))}
                  </div>
                  <div className="flex justify-between items-center w-full md:w-auto">
                    <Disclosure.Button
                      aria-label="Toggle Menu"
                      className="px-2 py-1 ml-auto text-gray-500 rounded-md md:hidden focus:text-blue-500 focus:outline-none dark:text-gray-300 "
                    >
                      <svg
                        className="w-6 h-6 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        {open && (
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                          />
                        )}
                        {!open && (
                          <path
                            fillRule="evenodd"
                            d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                          />
                        )}
                      </svg>
                    </Disclosure.Button>
                  </div>
                </div>
                <Disclosure.Panel>
                  <div className="flex flex-col items-center justify-start order-2 w-full md:hidden">
                    {mobilemenu.map((item, index) => (
                      <Link href={item.href} key={index}>
                        <a
                          className="px-5 py-2 text-base font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500"
                          target={item.external ? "_blank" : ""}
                          rel={item.external ? "noopener" : ""}
                        >
                          {item.label}
                        </a>
                      </Link>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </nav>
      </div>
      
    </>
  );
}
