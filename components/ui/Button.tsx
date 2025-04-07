"use client"

interface ButtonProps {
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({label, onClick} : ButtonProps) => {
    return (
        <button
          onClick={onClick}
          className="inline-flex items-center justify-center 
         text-white bg-gray-800 hover:bg-gray-900 
         dark:text-gray-900 dark:bg-gray-300 dark:hover:bg-gray-400 
         focus:outline-none focus:ring-2 focus:ring-gray-300 
         dark:focus:ring-gray-500 
         rounded-lg sm:text-sm text-xs px-5 py-2.5 
         font-semibold text-center
         cursor-pointer transition duration-150 ease-in-out"
        >
          {label}
        </button>
      );
      
}