import React, { useState } from "react";

interface FileInputProps {
    maxSize? : number;
    onFileSelected? : (file : File) => void;
}
const FileInput : React.FC<FileInputProps> = ({maxSize = 3 * 1024 * 1024 , onFileSelected}) => {
    const [fileName , setFileName] = useState<string>('');
    const [fileSize , setFileSize] = useState<string>('');
    const [error , setError] = useState<String>('');
    const [imgWidth , setImgWidth] = useState<null | number>(null);
    const [imgHeight , setImgHeight] = useState<null | number>(null);
    const [imgPreview , setImgPreview] = useState<null | string>(null);

    const handleFileChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if(!file){
            setFileName('');
            setFileSize('');
            setImgWidth(null);
            setImgHeight(null);
            setImgPreview(null);
            setError('No file selected.');
            return;
        }
        if (file.size > maxSize) {
            setFileName('');
            setFileSize('');
            setImgWidth(null);
            setImgHeight(null);
            setImgPreview(null);
            setError(`File size exceeds ${maxSize / (1024 * 1024)} MB. Please choose a smaller file`);
            return;
        }
        if (!file.type.startsWith('image/')) {
            setFileName('');
            setFileSize('');
            setImgWidth(null);
            setImgHeight(null);
            setImgPreview(null);
            setError('Only image files are allowed.');
            return;
        }
        setError('');
        setFileName(file.name);
        setFileSize(`${(file.size / (1024 * 1024)).toFixed(2)} MB`);

        const reader = new FileReader();
        reader.onload = (e) => {
            const image = new Image();
            image.onload = () => {
                setImgHeight(image.height);
                setImgWidth(image.width);
                if (onFileSelected) {
                    onFileSelected(file);
                }
            }
            image.src = e.target?.result as string;
            setImgPreview(e.target?.result as string);
        }
        reader.readAsDataURL(file);
    }
  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
      </label>
      {error ? (
        <div className="text-red-500 mt-2">{error}</div>
      ) : (
        <div className="text-gray-600 mt-2">
          {fileName ? (
            <div>
              <span>{fileName}</span>
              <div>Size: {fileSize}</div>
              {imgWidth !== null && imgHeight !== null && (
                <div>
                  Dimensions: {imgWidth}x{imgHeight}
                </div>
              )}
              {imgPreview && (
                <div className="m-12">
                  <img src={imgPreview} alt="Preview" className="w-48 h-auto" />
                </div>
              )}
            </div>
          ) : (
            <span>No image chosen</span>
          )}
        </div>
      )}
    </div>
    )
}


export default FileInput;
