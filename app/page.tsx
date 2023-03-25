import Header from "@/components/Header";
import Head from "next/head";
import Content from "@/components/Content";
import Link from "next/link";
import SquigglyLines from "@/components/SquigglyLines";

export default function Home() {
  return (
    <div>
      <div className="flex flex-1 flex-col justify-center items-center h-[calc(100vh-88px)] text-center px-4">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-gray-300 sm:text-7xl">
          Simplify your German learning process{" "}
          <span className="relative whitespace-nowrap text-blue-600">
            <SquigglyLines />
            <span className="relative">using AI</span>
          </span>{" "}
        </h1>

        <h2 className="mx-auto mt-12 mb-6 max-w-xl text-lg sm:text-gray-400  text-gray-500 leading-7">
          Effortlessly correct your grammar mistakes and generate customized
          texts tailored to your needs.
        </h2>
        <div className="flex justify-center items-center space-x-2  ">
          <Link
            href="fix"
            className="bg-[#2563EB] text-white rounded-md px-6 py-2 hover:bg-blue-500 transition-all"
          >
            Fix your text
          </Link>
          <Link
            href="/write"
            className="bg-[#2563EB] text-white rounded-md px-6 py-2 hover:bg-blue-500 transition-all"
          >
            Generate a text
          </Link>
        </div>
      </div>
    </div>
  );
}
