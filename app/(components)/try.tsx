"use client";

import { Transition, Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { ChangeEvent, Fragment, useState } from "react";

const DEFAULT_PACKAGE =
  "https://cratebox.io/react@18.2.0/umd/react.production.min.js";

export function Try() {
  const [open, setOpen] = useState(false);
  const [fetchingPkg, setFetchingPkg] = useState(false);
  const [pkg, setPkg] = useState("");
  const [value, setValue] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.currentTarget.value);

  const packageName = (value || DEFAULT_PACKAGE)
    .split("/")
    .filter((p) => p.includes("@"));

  const fetchPackage = async () => {
    setFetchingPkg(true);
    const req = await fetch(value || DEFAULT_PACKAGE, {
      method: "GET",
      headers: {
        "Content-Type": "plain/text",
        "Cache-Control": "max-age: 31536000, immutable",
      },
    });
    const res = await req.text();
    setPkg(res);
    setFetchingPkg(false);
    setOpen(true);
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <label
          htmlFor="name"
          className="ml-px block pl-4 text-sm leading-6 text-gray-200"
        >
          Give it a try!
        </label>
        <div className="flex flex-col space-y-4 w-full mt-2">
          <input
            type="text"
            name="name"
            id="name"
            value={value}
            onChange={handleInputChange}
            className="block w-full shrink-0 rounded-full bg-transparent font-mono border-0 px-4 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="https://cratebox.io/react@18.2.0/umd/react.production.min.js"
          />
          <button
            type="submit"
            disabled={fetchingPkg}
            className="rounded-full shrink-0 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={fetchPackage}
          >
            {fetchingPkg ? "Fetching..." : "Get it!"}
          </button>
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="flex flex-col">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {packageName}
                    </Dialog.Title>
                    <div className="mt-4 w-full">
                      <pre className="flex w-full">
                        <code className="text-sm text-gray-500 font-mono break-all overflow-x-auto w-full pr-4">
                          {pkg}
                        </code>
                      </pre>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Nice!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
