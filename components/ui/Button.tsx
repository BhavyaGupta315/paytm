"use client"

interface ButtonProps {
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({label, onClick} : ButtonProps) => {
    return (
        <button
          onClick={onClick}
          className="inline-flex items-center justify-center text-white bg-gray-800 hover:bg-gray-900 
          focus:outline-none  focus:ring-gray-300 font-medium 
          rounded-lg text-sm px-5 py-2.5 cursor-pointer w-auto dark:bg-white/[0.2] 
          dark:hover:bg-white/[0.1] dark:border-gray-700"
        >
          {label}
        </button>
      );
      
}