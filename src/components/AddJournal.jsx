import React, { useRef, useState, useEffect } from "react";
import Navbar from "./Navbar";

const AddJournal = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const editorRef = useRef(null);

  const [isTitleEmpty, setIsTitleEmpty] = useState(true);
  const [isSubtitleEmpty, setIsSubtitleEmpty] = useState(true);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
  });
  const [currentDateTime, setCurrentDateTime] = useState("");

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
    });
    editorRef.current?.focus();
  };

  const handleTitleInput = () =>
    setIsTitleEmpty(titleRef.current.innerText.trim() === "");

  const handleSubtitleInput = () =>
    setIsSubtitleEmpty(subtitleRef.current.innerText.trim() === "");

  useEffect(() => {
    handleTitleInput();
    handleSubtitleInput();
    setCurrentDateTime(new Date().toLocaleString());
  }, []);

  return (
    <>
      <Navbar />

      {/* Background Shape */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          className="relative left-[calc(50%-11rem)] w-[36rem] sm:left-[calc(50%-30rem)] sm:w-[72rem] aspect-[1155/678] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      {/* Top Buttons */}
      <div className="w-full flex flex-wrap justify-between items-center gap-3 px-4 sm:px-8 mt-4">
        <div className="text-sm text-gray-500">{currentDateTime}</div>
        <div className="flex flex-wrap gap-2">
          <button
            style={{
              backgroundColor: "oklch(60.9% 0.126 221.723)",
              boxShadow: "oklch(39.8% 0.07 227.392)",
            }}
            className="text-white hover:brightness-90 px-4 py-2 rounded shadow w-full sm:w-auto"
          >
            Save
          </button>
          <button
            style={{
              backgroundColor: "oklch(43.7% 0.078 188.216)",
              boxShadow: "oklch(39.8% 0.07 227.392)",
            }}
            className="text-white hover:brightness-90 px-4 py-2 rounded shadow w-full sm:w-auto"
          >
            Share
          </button>
          <button
            onClick={() => {
              titleRef.current.innerText = "";
              subtitleRef.current.innerText = "";
              editorRef.current.innerText = "";
              setIsTitleEmpty(true);
              setIsSubtitleEmpty(true);
              setActiveFormats({ bold: false, italic: false, underline: false });
            }}
            style={{
              backgroundColor: "oklch(39.1% 0.09 240.876)",
              boxShadow: "oklch(39.8% 0.07 227.392)",
            }}
            className="text-white hover:brightness-90 px-4 py-2 rounded shadow w-full sm:w-auto"
          >
            Restart
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="px-8 py-8 bg-transparent backdrop-blur-md rounded-lg shadow-lg max-w-3xl mx-auto mt-8">
        {/* Title */}
        <div className="relative text-3xl font-bold border-b border-gray-300 pb-1 mb-2">
          {isTitleEmpty && (
            <span className="absolute text-gray-400 pointer-events-none select-none">
              Title
            </span>
          )}
          <div
            ref={titleRef}
            contentEditable
            onInput={handleTitleInput}
            suppressContentEditableWarning
            className="outline-none w-full"
          />
        </div>

        {/* Subtitle */}
        <div className="relative text-lg text-gray-500 border-b border-gray-200 pb-1 mb-4">
          {isSubtitleEmpty && (
            <span className="absolute text-gray-400 pointer-events-none select-none">
              Subtitle
            </span>
          )}
          <div
            ref={subtitleRef}
            contentEditable
            onInput={handleSubtitleInput}
            suppressContentEditableWarning
            className="outline-none w-full"
          />
        </div>

        {/* Toolbar */}
        <div className="py-4 flex flex-wrap gap-3 mt-2 text-sm">
          {["bold", "italic", "underline"].map((cmd) => (
            <button
              key={cmd}
              onMouseDown={(e) => {
                e.preventDefault();
                execCommand(cmd);
              }}
              className={`px-2 py-1 border rounded ${
                activeFormats[cmd]
                  ? "bg-gray-900 text-white border-white"
                  : "border-gray-600 hover:bg-gray-700"
              }`}
            >
              {cmd.charAt(0).toUpperCase()}
            </button>
          ))}

          <select
            onChange={(e) => {
              const fontSize = e.target.value;
              const selection = window.getSelection();
              if (!selection || selection.rangeCount === 0) return;

              const range = selection.getRangeAt(0);
              if (range.collapsed) return;

              const span = document.createElement("span");
              span.style.fontSize = fontSize;
              span.appendChild(range.extractContents());
              range.insertNode(span);

              selection.removeAllRanges();
              const newRange = document.createRange();
              newRange.selectNodeContents(span);
              newRange.collapse(false);
              selection.addRange(newRange);
              editorRef.current?.focus();
            }}
            className="px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white"
          >
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
          </select>
        </div>

        {/* Editor */}
        <div className="relative">
          {editorRef.current?.innerText.trim() === "" && (
            <div className="absolute left-4 top-4 text-gray-400 pointer-events-none select-none">
              Start typing your notes here...
            </div>
          )}
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={() => setForceUpdate((prev) => !prev)}
            className="min-h-[300px] border border-gray-700 p-4 rounded bg-white outline-none"
          />
        </div>

        {/* Footer Buttons */}
        <div className="flex flex-wrap gap-2 mt-4 text-sm">
          <button
            onClick={() => {
              const checkbox = document.createElement("div");
              checkbox.innerHTML = `
                <label style="display:flex;align-items:center;gap:8px;">
                  <input type="checkbox"/> <span> </span>
                </label>`;
              const range = window.getSelection().getRangeAt(0);
              range.insertNode(checkbox);
              editorRef.current?.focus();
            }}
            className="min-w-[80px] px-3 py-1 border border-gray-600 rounded hover:bg-gray-700"
          >
            Todo
          </button>
          <button className="min-w-[80px] px-3 py-1 border border-gray-600 rounded hover:bg-gray-700">
            Aa
          </button>
          <button
            onClick={() =>
              execCommand("foreColor", prompt("Enter a color (e.g. red or #ff0000):"))
            }
            className="min-w-[80px] px-3 py-1 border border-gray-600 rounded hover:bg-gray-700"
          >
            Colors
          </button>
          <button
            onClick={() =>
              execCommand("hiliteColor", prompt("Enter highlight color:"))
            }
            className="min-w-[80px] px-3 py-1 border border-gray-600 rounded hover:bg-gray-700"
          >
            Highlighter
          </button>
        </div>
      </div>
    </>
  );
};

export default AddJournal;
