import React from "react";
import { DocumentIcon, PaperClipIcon } from "@heroicons/react/24/solid";
import { XCircleIcon } from "@heroicons/react/24/outline";

type PDFInputProps = {
  attachedFile: File | null;
  setAttachedFile: (file: File | null) => void;
};

export const PDFInput: React.FC<PDFInputProps> = ({
  attachedFile,
  setAttachedFile,
}: PDFInputProps) => {
  const attachFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file?.type === "application/pdf") {
      setAttachedFile(file);
    }
  };
  return (
    <>
      <label className="p-2 rounded-md border-2 border-inherit hover:bg-gray-200 cursor-pointer">
        <PaperClipIcon className="h-6 w-6 text-gray-500" />
        <input
          type="file"
          className="hidden"
          accept="application/pdf"
          onChange={attachFile}
        />
      </label>
      {attachedFile && (
        <div className="flex items-center justify-center px-2 rounded-lg shadow ml-1">
          <DocumentIcon className="h-6 w-6 text-red-500" />
          <span className="ml-1 text-sm">
            <p className="font-medium truncate w-24" title={attachedFile?.name}>
              {attachedFile?.name}
            </p>
            <p className="text-gray-500">PDF</p>
          </span>
          <button
            type="button"
            onClick={() => {
              setAttachedFile(null);
            }}
            className="text-gray-700 hover:text-gray-900"
          >
            <XCircleIcon className="h-4 w-4" />
          </button>
        </div>
      )}
    </>
  );
};
