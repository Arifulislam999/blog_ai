"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/assets/logo.svg";
import "../../styles/hreoSection.css";
import { signIn, signOut, getProviders, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
const Navbar = () => {
  const { data: session } = useSession();
  const [provider, setProvider] = useState(null);
  const [login, setLogin] = useState(false);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  useEffect(() => {
    const setProviderFunction = async () => {
      const response = await getProviders();
      setProvider(response);
    };
    setProviderFunction();
  }, []);
  const handlerLogin = () => {
    setLogin((prev) => !prev);
  };

  return (
    <div className="mt-4 flex justify-between">
      <nav className="flex">
        <Link href={"/"}>
          <Image
            src={logo}
            alt="logo"
            width={30}
            height={30}
            className="cursor-pointer"
          />
        </Link>
        <p className="sm:flex hidden  text-2xl font-bold ml-2 h-logo">
          AI Tool
        </p>
      </nav>
      {/* Desktop navigation  */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link className="" href={"/create-post"}>
              <button
                type="button"
                className="py-2 px-2 mt-1 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-500 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Create Post
              </button>
            </Link>
            <button
              onClick={signOut}
              className="border-2 border-green-300 rounded-lg text-sm px-2 my-1.5 text-sky-400 cursor-pointer hover:bg-gray-300 hover:text-blue-600 font-bold"
            >
              Sign Out
            </button>
            <Link href={"/profile"}>
              <Image
                src={session?.user.image}
                alt="logo"
                width={37}
                height={37}
                className="rounded-full object-contain cursor-pointer mt-1 border-sky-400 border-2"
              />
            </Link>
          </div>
        ) : (
          <div>
            {provider &&
              Object.values(provider).map((provider) =>
                provider.name === "GitHub" ? (
                  // <button
                  //   type="button"
                  //   key={provider.name}
                  //   onClick={() => signIn(provider.id)}
                  //   className="border-2 px-3 py-1 bg-gray-500 text-red-300 rounded-md hover:bg-gray-600 hover:text-red-400 transition-all delay-100"
                  // >
                  //   Sign In With GitHub
                  // </button>
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2"
                  >
                    <svg
                      className="w-4 h-4 mr-2 -ml-1"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="github"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 496 512"
                    >
                      <path
                        fill="currentColor"
                        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                      ></path>
                    </svg>
                    Sign in with Github
                  </button>
                ) : (
                  // <button
                  //   type="button"
                  //   key={provider.name}
                  //   onClick={() => signIn(provider.id)}
                  //   className="border-2 px-3 py-1 bg-gray-500 text-red-300 rounded-md hover:bg-gray-600 hover:text-red-400 transition-all delay-100"
                  // >
                  //   Sign In With Google
                  // </button>

                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                  >
                    <svg
                      className="w-4 h-4 mr-2 -ml-1"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="google"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 488 512"
                    >
                      <path
                        fill="currentColor"
                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                      ></path>
                    </svg>
                    Sign in with Google
                  </button>
                )
              )}
          </div>
        )}
      </div>

      {/* mobile Application  */}

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <div>
              <Image
                src={session?.user?.image}
                alt="logo"
                width={37}
                height={37}
                className="rounded-full object-contain cursor-pointer mt-1 border-sky-400 border-2 "
                onClick={() => setToggleDropDown((prev) => !prev)}
              />
            </div>
            {/* <div className="absolute top-10">
              {toggleDropDown && (
                <div className="text-xl">
                  <Link href={"/profile"} onClick={setToggleDropDown(false)}>
                    <span className="bg-red-400">My Profile</span>
                  </Link>
                  <Link href={"/profile"} onClick={setToggleDropDown(false)}>
                    <span>My Profile</span>
                  </Link>
                </div>
              )}
            </div> */}
          </div>
        ) : (
          <div className="text-right">
            <button
              onClick={handlerLogin}
              className="border-2 border-sky-400 px-2 py-1 rounded-md bg-gray-400 text-white"
            >
              Log In
            </button>
            {login && (
              <div className="flex flex-col justify-center items-center  bg-gray-400 p-2 rounded-md">
                {provider &&
                  Object.values(provider).map((provider) =>
                    provider.name === "GitHub" ? (
                      // <button
                      //   type="button"
                      //   key={provider.name}
                      //   onClick={() => signIn(provider.id)}
                      //   className="border-2 px-3 py-1 bg-gray-500 text-red-300 rounded-md hover:bg-gray-600 hover:text-red-400 transition-all delay-100"
                      // >
                      //   Sign In With GitHub
                      // </button>
                      <button
                        type="button"
                        key={provider.name}
                        onClick={() => signIn(provider.id)}
                        className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2"
                      >
                        <svg
                          className="w-4 h-4 mr-2 -ml-1"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fab"
                          data-icon="github"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 496 512"
                        >
                          <path
                            fill="currentColor"
                            d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                          ></path>
                        </svg>
                        Sign in with Github
                      </button>
                    ) : (
                      // <button
                      //   type="button"
                      //   key={provider.name}
                      //   onClick={() => signIn(provider.id)}
                      //   className="border-2 px-3 py-1 bg-gray-500 text-red-300 rounded-md hover:bg-gray-600 hover:text-red-400 transition-all delay-100"
                      // >
                      //   Sign In With Google
                      // </button>

                      <button
                        type="button"
                        key={provider.name}
                        onClick={() => signIn(provider.id)}
                        className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                      >
                        <svg
                          className="w-4 h-4 mr-2 -ml-1"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fab"
                          data-icon="google"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 488 512"
                        >
                          <path
                            fill="currentColor"
                            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                          ></path>
                        </svg>
                        Sign in with Google
                      </button>
                    )
                  )}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="absolute top-12 right-6 sm:hidden">
        {toggleDropDown && (
          <div className="text-sm flex flex-col  bg-gray-400 px-4 py-4 mt-2 rounded-lg">
            <Link
              href={"/profile"}
              className="my-1 font-semibold"
              onClick={() => setToggleDropDown(false)}
            >
              <span className=" text-sky-600 ai-drop">My Profile</span>
            </Link>
            <Link
              href={"/create-post"}
              className="font-semibold text-sky-600 ai-drop"
              onClick={() => setToggleDropDown(false)}
            >
              <span>Add Post</span>
            </Link>
            <div>
              <button
                className="font-semibold border-sky-300 border-2 px-2  rounded-md text-sky-600 bg-black"
                type="button"
                onClick={() => {
                  setToggleDropDown(false);
                  signOut();
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
// 1.14
