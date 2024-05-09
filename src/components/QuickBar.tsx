import { FaAngleDown, FaMinus, FaPlus, FaRegMinusSquare } from "react-icons/fa"
import Button from "./Button"
import Dropdown from "./Dropdown"
import { MdOutlineViewAgenda, MdOutlineViewHeadline } from "react-icons/md"
import { PiMoonStarsBold } from "react-icons/pi"
import { FaRegPenToSquare, FaRegSquareCheck } from "react-icons/fa6"
import { useContext, useState } from "react"
import { GlobalContext } from "../context/GlobalContext"
import useModal from "../hooks/useModal"
import useDarkMode from "../hooks/useDarkMode"
import ItemCreateModal from "./Modals/ItemCreateModal"

const QuickBar = () => {
    const { listView, setListView } = useContext(GlobalContext)

    const [theme, setTheme] = useDarkMode()
    const { createModal } = useModal()

    const [isSelecting, setIsSelecting] = useState(false)

    const toggleTheme = () => {
        if (theme === 'dark') {
            setTheme('light')
        } else {
            setTheme('dark')
        }
    }

    return (
        <div className='flex w-full mb-5'>

            <div className='w-full flex justify-start gap-1'>
                <Button type='secret' padding='px-2 py-1' className={`text-md ${isSelecting ? 'animate-pulse text-red-500 dark:text-red-500' : ''}`} onClick={() => setIsSelecting(!isSelecting)}>
                    <FaRegPenToSquare />
                </Button>
                <Button type='secret' padding='px-2 py-1' className='text-md' onClick={toggleTheme}>
                    <FaRegSquareCheck />
                </Button>
                <Button type='secret' padding='px-2 py-1' className='text-md' onClick={toggleTheme}>
                    <FaRegMinusSquare />
                </Button>
            </div>

            <div className=' w-full flex justify-end gap-1'>
                {isSelecting ? (
                    <Button type='error' padding='p-2 py-1'>
                        <FaMinus />
                    </Button>
                ) : (
                    <Button type='secret-success' padding='p-2 py-1' onClick={() => createModal(<ItemCreateModal />, true)}>
                        <FaPlus />
                    </Button>
                )}
                <Dropdown centered items={[{ name: "Large", icon: <MdOutlineViewAgenda />, callback: () => setListView("large") },
                { name: "Compact", icon: <MdOutlineViewHeadline />, callback: () => setListView("compact") }]}>
                    <Button type='secondary' className='text-xl h-full flex gap-1 items-center' padding='p-2 py-1'>
                        {listView == "compact" ? (<MdOutlineViewHeadline />) : (<MdOutlineViewAgenda />)}
                        <span className='text-[1rem]'><FaAngleDown /></span>
                    </Button>
                </Dropdown>
                <Button type='secondary' padding='px-2' className='text-xl py-1' onClick={toggleTheme}>
                    <PiMoonStarsBold />
                </Button>
            </div>
        </div>
    )
}

export default QuickBar