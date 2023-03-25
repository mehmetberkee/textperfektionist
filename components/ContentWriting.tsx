"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowUturnLeftIcon, HomeIcon } from "@heroicons/react/24/solid";
import React, { Fragment } from "react";
const DynamicClientProvider = dynamic(() => import("./ClientProvider"), {
  ssr: false,
});

function Content() {
  const [textInput, setTextInput] = useState<string>("");
  const [result, setResult] = useState<string | undefined>(undefined);
  const [resultTrying, setResultTrying] = useState<string>(" ");

  let i = 0;

  function formatTextWithLineBreaks(text: string) {
    return text.split("\n").map((line: any, i: any) => (
      <Fragment key={i}>
        {line}
        <br />
      </Fragment>
    ));
  }
  function typing() {
    if (result && i < result.length) {
      setResultTrying((prev) => {
        return result.substr(0, i + 1);
      });
      i++;
      setTimeout(typing, 30);
    }
  }
  useEffect(() => {
    typing();
  }, [result]);
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const notification = toast.loading("AI is thinking...");
      const response = await fetch("/api/generatewriting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: textInput }),
      });

      let data;
      try {
        data = JSON.parse(await response.text());
      } catch (e) {
        console.error("Error parsing JSON response:", e);
        toast.error("Something went wrong!", {
          id: notification,
        });
        return;
      }

      if (response.status === 200) {
        toast.success("AI has responded!", {
          id: notification,
        });
        setResult(data.result);
        setTextInput("");
      } else {
        toast.error("Something went wrong!", {
          id: notification,
        });
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        alert(error.message);
      } else {
        console.error(error);
        alert("An error occurred.");
      }
    }
  }

  return (
    <main>
      <form onSubmit={onSubmit}>
        <div className="h-screen">
          <DynamicClientProvider />
          <div className="flex flex-col mx-2 items-center my-auto">
            <textarea
              className={`mt-1 mx-auto bg-gray-600 text-white rounded-md sm:w-[400px] w-[300px] h-[200px] p-[15px] text-[16px] border-[#bfbfbf] outline-none resize-none mb-5`}
              name="text"
              placeholder="Enter a german text"
              value={textInput}
              onChange={(e) => {
                setTextInput(e.target.value);
              }}
            />
            <div className="flex">
              <div className="flex space-x-1">
                <input
                  className="bg-[#2563EB] text-white rounded-md px-6 py-2 w-[150px] h-10 mx-auto hover:bg-blue-500 transition-all mb-5"
                  type="submit"
                  value="Generate a text"
                />
                <div>
                  <Link href="/">
                    <h1 className="bg-[#2563EB] text-white rounded-md px-3 py-2 h-10 mx-auto hover:bg-blue-500 transition-all mb-5">
                      <HomeIcon className="h-5 w-5" />
                    </h1>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-white lg:w-[800px] md:w-[600px] w-[350px] mx-auto">
            <div className="text-left mb-5 mx-2">
              {formatTextWithLineBreaks(resultTrying)}
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}

export default Content;
