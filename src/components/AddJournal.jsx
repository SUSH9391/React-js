import React, { useRef } from 'react';
import Navbar from './Navbar'

const AddJournal = () => {
  const editorRef = useRef(null);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  return (<>
  <Navbar/>
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
    <div className="px-8 py-8 justify-center bg-white">
      {/* Title */}
      <div
        contentEditable
        suppressContentEditableWarning
        className="text-2xl font-bold border-b border-gray-700 pb-2 outline-none"
      >
        Title
      </div>

      {/* Subtitle */}
      <div
        contentEditable
        suppressContentEditableWarning
        className=" py-4 text-base text-gray-300 border-b border-gray-700 pb-2 outline-none"
      >
        Subtitle
      </div>

      {/* Toolbar */}
      <div className=" py-4 flex gap-3 mt-2 text-sm">
        <button
          onClick={() => execCommand('bold')}
          className="px-2 py-1 border border-gray-600 rounded hover:bg-gray-700"
        >
          B
        </button>
        <button
          onClick={() => execCommand('italic')}
          className="px-2 py-1 border border-gray-600 rounded hover:bg-gray-700"
        >
          I
        </button>
        <button
          onClick={() => execCommand('underline')}
          className="px-2 py-1 border border-gray-600 rounded hover:bg-gray-700"
        >
          U
        </button>
        <select
          onChange={(e) => execCommand('fontSize', e.target.value)}
          className="px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white"
        >
          <option value="3">12px</option>
          <option value="4">14px</option>
          <option value="5">16px</option>
          <option value="6">18px</option>
        </select>
      </div>

      {/* Editor */}
      <div 
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="min-h-[300px] border border-gray-700 p-4 rounded bg-white outline-none"
      >
        Start typing your notes here...
      </div>

      {/* Footer Tools */}
      <div className="flex gap-4 mt-4 text-sm">
        <button className="px-3 py-1 border border-gray-600 rounded hover:bg-gray-700">Todo</button>
        <button className="px-3 py-1 border border-gray-600 rounded hover:bg-gray-700">Aa</button>
        <button
          onClick={() => execCommand('foreColor', prompt('Enter a color (e.g. red or #ff0000):'))}
          className="px-3 py-1 border border-gray-600 rounded hover:bg-gray-700"
        >
          Colors
        </button>
        <button
          onClick={() => execCommand('hiliteColor', prompt('Enter highlight color:'))}
          className="px-3 py-1 border border-gray-600 rounded hover:bg-gray-700"
        >
          Highlighter
        </button>
      </div>
    </div>
    </>
  );
};

export default AddJournal;
