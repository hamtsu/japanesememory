import { FC, ReactNode } from "react"

type ButtonProps = {
    children: ReactNode,
    onClick?: () => void,
    type: ButtonType,
    className?: string,
    disabled?: boolean,
    padding?: string
}

type ButtonType = "primary" | "secondary" | "close" | "success" | "error" | "secret" | "secret-error" | "secret-success" | "warning"

const Button: FC<ButtonProps> = ({ type, children, onClick, disabled, className, padding }) => {
    switch (type.toLowerCase()) {
        case "primary":
            return (
                <button onClick={onClick} className={`${className} ${padding ? padding : 'p-2 px-3'} rounded-md text-slate-100 transition-all active:bg-main-700 hover:bg-main-600 
                    ${disabled ? 'pointer-events-none cursor-not-allowed bg-main-700' : 'bg-main-500'} `}
                >
                    {children}
                </button>
            )
        break;
        case "secondary":
            return (
                <button onClick={onClick} className={`${className} ${padding ? padding : 'p-2 px-3'} inline-block rounded-md text-gray-900 text-opacity-75 dark:text-slate-100 transition-all border border-black dark:border-white border-opacity-20 bg-opacity-0 
                dark:border-opacity-20 bg-black dark:bg-slate-300 dark:bg-opacity-0 active:dark:bg-opacity-5 hover:dark:bg-opacity-10 hover:border-opacity-100 hover:dark:border-opacity-60 hover:text-opacity-100 active:text-opacity-100
                    ${disabled ? 'pointer-events-none cursor-not-allowed' : ''} `}
                >
                    {children}
                </button>
            )
        break;
        case "close":
            return (
                <button onClick={onClick} className={`${className} ${padding ? padding : 'p-2 px-3'} rounded-lg bg-slate-200 dark:bg-neutral-700
                hover:bg-red-500 text-gray-900 dark:text-gray-300 hover:text-gray-50 hover:dark:text-gray-50
                    ${disabled ? 'pointer-events-none cursor-not-allowed bg-red-600' : 'bg-red-400'} `}
                >
                    {children}
                </button>
            )
        break;
        case "success":
            return (
                <button onClick={onClick} className={`${className} ${padding ? padding : 'p-2 px-3'} rounded-md 
                hover:bg-green-700 text-slate-100 border border-white border-opacity-20 hover:border-opacity-50
                    ${disabled ? 'pointer-events-none cursor-not-allowed bg-green-700' : 'bg-green-600'} `}
                >
                    {children}
                </button>
            )
        break;
        case "error":
            return (
                <button onClick={onClick} className={`${className} ${padding ? padding : 'p-2 px-3'} rounded-md
                hover:bg-red-500 text-slate-100 border border-white border-opacity-20 hover:border-opacity-50
                    ${disabled ? 'pointer-events-none cursor-not-allowed bg-red-600' : 'bg-red-400'} `}
                >
                    {children}
                </button>
            )
        break;
        case "warning":
            return (
                <button onClick={onClick} className={`${className} ${padding ? padding : 'p-2 px-3'} rounded-md
                hover:bg-orange-500 text-slate-100 border border-white border-opacity-20 hover:border-opacity-50
                    ${disabled ? 'pointer-events-none cursor-not-allowed bg-orange-600' : 'bg-orange-400'} `}
                >
                    {children}
                </button>
            )
        break;
        // Secret Buttons
        case "secret":
            return (
                <button onClick={onClick} className={`${className} ${padding ? padding : 'p-2 px-3'} rounded-md text-gray-700 dark:text-slate-100 transition-all 
                    active:bg-slate-400 hover:bg-slate-300 dark:active:bg-neutral-600 dark:hover:bg-neutral-700 hover:text-opacity-100 dark:hover:text-opacity-100
                    ${disabled ? 'pointer-events-none cursor-not-allowed text-opacity-20 dark:text-opacity-20 dark:bg-neutral-900' : 'bg-transparent text-opacity-60 dark:text-opacity-60'} `}
                >
                    {children}
                </button>
            )
        break;
        case "secret-error":
            return (
                <button onClick={onClick} className={`${className} ${padding ? padding : 'p-2 px-3'} rounded-md text-gray-700 dark:text-slate-100 transition-all 
                    active:bg-red-600 hover:bg-red-500 hover:text-slate-100 hover:text-opacity-100 hover:dark:text-opacity-100
                    ${disabled ? 'pointer-events-none cursor-not-allowed text-opacity-20 dark:text-opacity-20 dark:bg-neutral-900' : 'bg-transparent text-opacity-60 dark:text-opacity-60'} `}
                >
                    {children}
                </button>
            )
        break;
        case "secret-success":
            return (
                <button onClick={onClick} className={`${className} ${padding ? padding : 'p-2 px-3'} rounded-md text-gray-700 dark:text-slate-100 transition-all border-black hover:border-green-500 active:border-green-500 dark:border-white
                hover:bg-green-600 active:bg-green-700 hover:text-slate-100 dark:border-opacity-20 border border-opacity-20 hover:border-opacity-100 hover:dark:border-opacity-60 hover:text-opacity-100 hover:dark:text-opacity-100
                    ${disabled ? 'pointer-events-none cursor-not-allowed text-opacity-20 dark:text-opacity-20 bg-green-900' : 'bg-transparent text-opacity-75'} `}
                >
                    {children}
                </button>
            )
        break;
    }
}

export default Button