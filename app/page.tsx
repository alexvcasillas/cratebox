import Image from "next/image";
import { Try } from "./(components)/try";
import { GithubIcon } from "./(components)/github.icon";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 min-h-screen">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
        />
      </svg>
      <svg
        viewBox="0 0 1108 632"
        aria-hidden="true"
        className="absolute left-[calc(50%-4rem)] top-10 -z-10 w-[69.25rem] max-w-none transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
      >
        <path
          fill="url(#175c433f-44f6-4d59-93f0-c5c51ad5566d)"
          fillOpacity=".2"
          d="M235.233 402.609 57.541 321.573.83 631.05l234.404-228.441 320.018 145.945c-65.036-115.261-134.286-322.756 109.01-230.655C968.382 433.026 1031 651.247 1092.23 459.36c48.98-153.51-34.51-321.107-82.37-385.717L810.952 324.222 648.261.088 235.233 402.609Z"
        />
        <defs>
          <linearGradient
            id="175c433f-44f6-4d59-93f0-c5c51ad5566d"
            x1="1220.59"
            x2="-85.053"
            y1="432.766"
            y2="638.714"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4F46E5" />
            <stop offset={1} stopColor="#80CAFF" />
          </linearGradient>
        </defs>
      </svg>
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-2xl lg:pt-8">
          <Image
            width={92}
            height={90}
            src="/cratebox-logo.svg"
            alt="Cratebox"
          />
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <p className="mt-6 bg-gray-100/5 font-mono text-white p-2 px-4 rounded-full ring-1 ring-gray-200/20">
              cratebox.io/:package@:version/:file
            </p>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            A global, fast content delivery network for NPM
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Cratebox is a rapid and widespread content delivery network that
            caters to all of NPM&apos;s offerings. It enables you to promptly
            and effortlessly retrieve any file from any package by employing a
            URL.
          </p>
          <div className="mt-10 items-center gap-x-6 flex">
            <Try />
          </div>
          <div className="mt-20 flex flex-col sm:flex-row sm:space-x-2 items-start sm:items-center text-white">
            <Link
              className="flex flex-row space-x-2 items-center hover:text-indigo-400"
              href="https://github.com/alexvcasillas/cratebox"
              target="_blank"
            >
              <span>Open Source in</span>
              <span>
                <GithubIcon />
              </span>
            </Link>
            <span className="px-2" />
            <Link
              className="flex flex-row space-x-2 items-center hover:text-indigo-400"
              href="https://www.vercel.com"
              target="_blank"
            >
              <span>Powered by Vercel</span>
              <span>
                <svg
                  aria-label="Vercel Logo"
                  fill="currentColor"
                  viewBox="0 0 75 65"
                  height="15.600000000000001"
                  width="18"
                >
                  <path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
                </svg>
              </span>
            </Link>
            <span className="px-2" />
            <Link
              className="flex flex-row space-x-2 items-center hover:text-indigo-400"
              href="https://www.alexvcasillas.com"
              target="_blank"
            >
              <span>Created with ❤️ by Alex Casillas</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
