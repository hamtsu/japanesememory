import { useState } from "react"
import Chevron from "./Icons/Chevron"

const Sidebar = () => {
    const [isHover, setIsHover] = useState<boolean>()
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
        setIsHover(false)
    }

    
    return (
        <>
            <div className={`${isSidebarOpen ? 'w-0' : 'sm:inline-block'} h-screen max-w-36 bg-slate-200 dark:bg-neutral-850 p-1`}>
                <h1 className='px-2 text-2xl text-neutral-500 dark:text-slate-300 whitespace-pre-wrap'><b>Japanese</b> Memory</h1>
            </div>

            <div className='h-screen flex items-center bg-slate-200 dark:bg-neutral-900 text-neutral-500/50 dark:text-slate-300/50'>
                {!isSidebarOpen ? (
                    <span onClick={toggleSidebar} className={`px-2 absolute z-10 transition-opacity ${isHover ? 'opacity-100' : 'opacity-50'}`} onMouseLeave={() => setIsHover(false)} onMouseEnter={() => setIsHover(true)}>
                        {isHover ? (
                            <Chevron color="#e2e8f0" />
                        ) : (
                            <div className="h-5 rounded-md w-1 bg-neutral-500/50 dark:bg-slate-300/50"></div>
                        )}
                    </span>
                ) : (
                    <span onClick={toggleSidebar} className={`px-2 rotate-180 transition-opacity ${isHover ? 'opacity-100' : 'opacity-50'}`} onMouseLeave={() => setIsHover(false)} onMouseEnter={() => setIsHover(true)}>
                        <Chevron color="#e2e8f0" />
                    </span>
                )}
            </div>
        </>
    )
}

export default Sidebar