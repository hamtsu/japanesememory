import { FC, ReactNode, useState } from "react"

type DropdownTypes = {
    children: ReactNode,
    items: { name: string, icon?: ReactNode, callback: () => void }[],
    centered?: boolean,
    left?: boolean
}

const Dropdown: FC<DropdownTypes> = ({ children, items, centered, left }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className="relative" onMouseDown={() => setIsOpen(!isOpen)}>
                {children}

                {isOpen && (
                    <div className={`absolute flex flex-col gap-1 ${centered? 'left-[-50%]' : ''} ${left? 'left-[-100%]' : ''} z-10 mt-2 bg-slate-100 text-gray-900 dark:text-slate-100 
                    dark:bg-neutral-800 border border-gray-400 dark:border-neutral-700 py-1 rounded-md shadow-md`}>
                        {items.map((item, i) => (
                            <>
                                <div key={i} onMouseDown={item.callback} className="p-1 px-2 cursor-pointer
                                whitespace-nowrap rounded-md hover:dark:bg-neutral-700 flex items-center gap-1 mx-1 text-sm"
                                >
                                    {item.icon}
                                    {item.name}
                                </div>

                                {i !== (items.length - 1) && (
                                    <div key={i + items.length} className="w-full h-[1px] bg-gray-400 dark:bg-neutral-700"></div>
                                )}
                            </>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default Dropdown