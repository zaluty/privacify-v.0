"use client";

import { useState, useEffect } from "react";
import { analyzeTOs } from "./actions/submit";
import ReactMarkdown from "react-markdown";
import { bouncy } from "ldrs";
import { Circle } from "./percentage";
import Navbar from "@/components/navbar";
import { z } from "zod";
import Footer from "@/components/footer";

export default function Home() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { bouncy } = require("ldrs");
      bouncy.register();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiResponse = await analyzeTOs(value);
      console.log("API Response:", apiResponse);
      setResponse(apiResponse);
      setValue("");
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse({
        error: "An error occurred while analyzing the terms of service.",
      });
    }
    setLoading(false);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-blue-50 font-sans p-4">
        <h1 className="text-blue-900 text-center text-2xl font-bold inline">
          Analyze the terms of service before you agree
        </h1>

        <form onSubmit={handleSubmit} className="w-full max-w-lg mb-8 mt-24">
          <input
            type="text"
            className="w-full p-4 bg-blue-100 text-blue-900 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Paste the terms of service"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-4 disabled:bg-blue-500 disabled:shadow shadow-inner rounded-full shadow-white/55 mt-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            disabled={value === "" || loading}
          >
            Submit
          </button>
          {loading && (
            <div className="text-blue-600 mt-4 text-center">
              <l-bouncy size="45" speed="1.75" color="#0A3242"></l-bouncy>
            </div>
          )}
        </form>
        {response && response.isItvalid === false && (
          <div className="text-red-600 mt-4 text-center font-semibold">
            The provided terms of service are invalid. Please provide a valid
            terms of service.
          </div>
        )}
        {response && !response.error && response.isItvalid === true && (
          <>
            <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bad takes */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-blue-900 mb-4">
                  Bad takes
                </h1>
                <ReactMarkdown className="bg-blue-100 text-blue-900 p-4 rounded shadow-md">
                  {response.badComments || "No bad comments available."}
                </ReactMarkdown>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-blue-900 mb-4">
                  Good takes
                </h1>
                <ReactMarkdown className="bg-blue-100 text-blue-900 p-4 rounded shadow-md">
                  {response.goodComments || "No good comments available."}
                </ReactMarkdown>
              </div>
              {/* Privacy score */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-center items-center">
                  <p className="text-2xl font-bold text-blue-900 mb-4">
                    <p className="text-2xl font-bold text-blue-9000 mb-4 text-center">
                      Privacy score
                    </p>
                    {response.percentage + "%" === "100" && (
                      <Circle
                        color="rgb(0, 222, 0)"
                        percentage={response.percentage}
                      />
                    )}
                    {response.percentage + "%" === "0" && (
                      <Circle
                        color="rgb(222, 0, 0)"
                        percentage={response.percentage}
                      />
                    )}
                    {response.percentage + "%" < "50" && (
                      <Circle
                        color="rgb(222, 0, 0)"
                        percentage={response.percentage}
                      />
                    )}
                    {response.percentage + "%" > "50" && (
                      <Circle
                        color="rgb(0, 222, 0)"
                        percentage={response.percentage}
                      />
                    )}
                  </p>
                </div>
              </div>
              {/* Company's name */}
              <div className="bg-white text-center text-blue-900 p-6 rounded-lg shadow-md">
                <p className="text-2xl font-bold  text-center mb-4">
                  Company&apos;s name
                  <div className="flex justify-center items-center m-20">
                    <p className="text-2xl font-bold text-pink-500   mb-4 text-center">
                      {response.company}
                    </p>
                  </div>
                </p>
              </div>
              {/* Acceptable or not */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p>
                  {response.isAcceptableUsePolicy === true ? (
                    <div className="text-green-500 font-bold text-center">
                      Acceptable
                    </div>
                  ) : (
                    <div className="text-red-500 font-bold text-center">
                      Not acceptable
                    </div>
                  )}
                </p>
              </div>
            </div>{" "}
          </>
        )}
        {response && response.error && (
          <div className="text-red-600 mt-4 text-center">{response.error}</div>
        )}
        <Footer />
      </div>
    </>
  );
}
