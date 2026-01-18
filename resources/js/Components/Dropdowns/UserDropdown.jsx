import React from "react";
import ResponsiveNavLink from "../ResponsiveNavLink";
import { useState } from 'react';
import { usePage } from "@inertiajs/react";
import Dropdown from "../Dropdown";

const UserDropdown = () => {
  // dropdown props

  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

  const user = usePage().props.auth.user;
  console.log("image", user.avatar);

  return (
    <>

      <div className="items-center flex">

        <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
          <div className="mt-3 space-y-1">

            <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>

              <div className="pt-2 pb-3 space-y-1">
                <ResponsiveNavLink href='dashboard' active={route().current('dashboard')}>
                  Dashboard
                </ResponsiveNavLink>
              </div>

              <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">


                <div className="mt-3 space-y-1">
                  <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                  <ResponsiveNavLink method="post" href={route('logout')} as="button">
                    Log Out
                  </ResponsiveNavLink>
                </div>
              </div>
            </div><nav className="">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">


                  <div className="hidden sm:flex sm:items-center sm:ms-6">
                    <div className="ms-3 relative">
                      <Dropdown>
                        <Dropdown.Trigger>
                          <span className="inline-flex rounded-md w-12 h-12">
                            <img
                              alt="..."
                              className="w-full rounded-full align-middle border-none shadow-lg"
                              src={user && user.avatar ? user.avatar : ""}
                            />
                            <button
                              type="button"
                              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                            >



                            </button>
                          </span>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                          <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                          <Dropdown.Link href={route('logout')} method="post" as="button">
                            Log Out
                          </Dropdown.Link>
                        </Dropdown.Content>
                      </Dropdown>
                    </div>
                  </div>

                  <div className="-me-2 flex items-center sm:hidden">
                    <button
                      onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                      className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                    >
                      <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path
                          className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                        <path
                          className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                <div className="pt-2 pb-3 space-y-1">
                  <ResponsiveNavLink href='dashboard' active={route().current('dashboard')}>
                    Dashboard
                  </ResponsiveNavLink>
                </div>

                <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">


                  <div className="mt-3 space-y-1">
                    <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                    <ResponsiveNavLink method="post" href={route('logout')} as="button">
                      Log Out
                    </ResponsiveNavLink>
                  </div>
                </div>
              </div>
            </nav>
          </div>

        </span>
      </div>


    </>
  );
};

export default UserDropdown;
