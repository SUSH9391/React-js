import Navbar from "./Navbar";

import { useState } from "react";

export default function Main() {
  const [journals, setJournals] = useState([
    { title: "Personal", subtitle: "myJournal_03" },
    { title: "Work", subtitle: "myJournal_02" },
    { title: "Ideas", subtitle: "myJournal_01" },
    { title: "Dreams", subtitle: "myJournal_00" },
  ]);
  const handleNewJournal = () => {
    const title = prompt("Enter journal title:");
    const subtitle = prompt("Enter journal subtitle:");

    if (!title || !subtitle) return;

    const newJournal = { title, subtitle };

    setJournals([newJournal, ...journals]);
  };

  return (
    <>
      <Navbar />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
        />
      </div>

      <div className="min-h-full">
        <header className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              My Journals
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold mb-6">My Journals</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* + New Journal Card */}
              <div
                onClick={handleNewJournal}
                className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:shadow-[0_0_10px_4px_#4040a1] transition"
              >
                <div className="text-4xl font-bold">+</div>
                <p className="text-sm mt-2">New Journal</p>
              </div>

              {/* Template Card */}
              <div className="h-40 p-4 rounded-lg shadow bg-white hover:shadow-[0_0_10px_4px_#4040a1] transition">
                <p className="text-lg font-semibold">Template</p>
              </div>

              {/* Dynamic Journal Cards */}
              {journals.map((journal, index) => (
                <div
                  key={index}
                  className="h-40 p-4 rounded-lg shadow bg-white hover:shadow-[0_0_10px_4px_#4040a1] transition"
                >
                  <p className="text-lg font-semibold">{journal.title}</p>
                  <p className="text-sm text-gray-600">{journal.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </main>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div>
      </div>
    </>
  );
}
