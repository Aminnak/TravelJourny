import { useRef, useState } from "react";
import XIcon from "../iconCards/XIcon";
import FullscreenCard from "../iconCards/FullscreenCard";

interface FileInputProps {
    maxSize? : number;
    onFileSelected? : (file : File) => void;
    onChange: (files: FileList | null) => void;
    errors: string | undefined;
    value: FileList | null;  // From the form state
    ref: React.Ref<HTMLInputElement>;  // For native form elements
    onRemove?: () => Promise<void>;
}
const FileInput : React.FC<FileInputProps> = ({ onChange , errors , ref , onFileSelected }: FileInputProps) => {
    const [fileName , setFileName] = useState<string>('');
    const [fileSize , setFileSize] = useState<string>('');
    const [imgWidth , setImgWidth] = useState<null | number>(null);
    const [imgHeight , setImgHeight] = useState<null | number>(null);
    const [imgPreview , setImgPreview] = useState<null | string>(null);

    const userUploadedImgRef = useRef<HTMLImageElement>(null)

    const openFullscreen = () => {
        if(userUploadedImgRef.current?.requestFullscreen){
            userUploadedImgRef.current.requestFullscreen()
        }
    }

    const clearFile = () : void => {
        onChange(null)
        setFileName('');
        setFileSize('');
        setImgWidth(null);
        setImgHeight(null);
        setImgPreview(null);
    }

    const handleFileChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            onChange(files);
          } else {
            onChange(null);  // Handle case when no file is selected
          }
        const file = event.target.files?.[0]

        if(!file) return
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const image = new Image();
            image.src = e.target?.result as string;
            image.onload = () => {
                setImgHeight(image.height);
                setImgWidth(image.width);
                setFileName(file.name);
                setFileSize(`${(file.size / (1024 * 1024)).toFixed(2)} MB`);
                if(onFileSelected) onFileSelected(file);
            }
            setImgPreview(e.target?.result as string);
        }
        reader.readAsDataURL(file);
    }
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="h-70 w-full">
        {!fileName ?
            <><label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-full border border-stone-300 rounded-lg cursor-pointer  hover:bg-black/50 duration-300"
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
                <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept="image/*" ref={ref}/>
            </label>
            </> : imgPreview && (
                <div className="relative">
                  <img ref={userUploadedImgRef} src={imgPreview} alt="Preview" className="w-full md:h-full h-auto rounded-md" />
                  <span onClick={clearFile} className="absolute right-1 top-1 w-[20px] h-[20px] hover:cursor-pointer pr-2 pt-2">
                    <XIcon />
                  </span>
                  <span onClick={() => openFullscreen()} className="absolute right-2 bottom-2 w-[20px] h-[20px] opacity-100 scale-100 duration-300 hover:cursor-pointer group-hover:opacity-100 group-hover:scale-100"><FullscreenCard /></span>
                </div>
              )
    }
      </div>
      {!errors && fileName && (
        <div className="mt-2">
              <span className="text-gray-200">{fileName}</span>
              <div className="text-gray-200">Size: {fileSize}</div>
              {imgWidth !== null && imgHeight !== null && (
                <div className="text-gray-200">
                  Dimensions: {imgWidth}x{imgHeight}
                </div>
              )}
        </div>
      )}
    </div>
    )
}


export default FileInput;
