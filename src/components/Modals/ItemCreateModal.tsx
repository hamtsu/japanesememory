import { FC, ChangeEvent, useState, useEffect } from 'react'
import ModalTitle from "../ModalTitle";
import FormInput from '../FormInput';
import Button from '../Button';
import { FaAngleDown, FaCircle, FaPlus } from 'react-icons/fa';
import Item from '../LargeItem';
import Dropdown from '../Dropdown';

type ItemCreateModalProps = {
    handleClose?: () => void,
    closable?: boolean,
}

const DROPDOWN_PRIORITIES: Record<number, React.ReactElement> = {
    0: <> <span className="text-[0.5rem] text-red-600 dark:text-red-400 pr-1"><FaCircle /></span> High priority </>,
    1: <> <span className="text-[0.5rem] text-orange-600 dark:text-orange-400 pr-1"><FaCircle /></span> Medium priority </>,
    2: <> <span className="text-[0.5rem] text-green-600 dark:text-green-400 pr-1"><FaCircle /></span> Low priority </>

};

const ItemCreateModal: FC<ItemCreateModalProps> = ({ handleClose, closable }) => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [priority, setPriority] = useState(2)

    const [titleInvalid, setTitleInvalid] = useState<boolean>(false)

    const submit = () => {
        if (title.length > 1) {

            const storedItemsList = localStorage.getItem("itemsList")

            if (storedItemsList) {
                const itemsList = JSON.parse(storedItemsList)
                itemsList.push({ title, body, tags: ["Doing"], priority: priority, createdAt: new Date() })
                localStorage.setItem("itemsList", JSON.stringify(itemsList))
                window.dispatchEvent(new Event('storage'))
            }

            handleClose?.()
        } else {
            setTitleInvalid(true)
        }
    }

    useEffect(() => {
        if (closable) {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    handleClose?.()
                }
            })
        }

        return () => {
            closable && document.removeEventListener('keydown', () => { })
        }
    }, [])

    return (
        <div className='min-w-[400px] md:min-w-[700px]'>
            <ModalTitle closable={closable} handleClose={handleClose}>Create a Todo Item under <span className='text-blue-500'>School</span> </ModalTitle>

            <div className='flex gap-1 w-full p-1'>
                <div className='self-center w-[65%] flex-wrap pl-3 hidden sm:inline-block'>
                    <Item id={1} createdAt={new Date()} priority={priority} title={title ? title : "Homework stuff"} description={body ? body : 'Finish off homework...'} preview />
                </div>

                {/* TODO change priority of item and tags */}
                <div className='flex gap-3 flex-col py-2 px-3 flex-grow'>
                    <FormInput title="Enter a title" placeholder="Homework stuff" invalid={titleInvalid}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setTitle(e.target.value)
                            setTitleInvalid(false)
                        }} />
                    <FormInput title="Enter a description" onChange={(e: ChangeEvent<HTMLInputElement>) => setBody(e.target.value)} placeholder="Finish off homework..." />
                    <Dropdown 
                        items={[ { name: "Low Priority", icon: <span className='text-green-400 text-[0.5rem] mr-1'><FaCircle /></span>, callback: () => setPriority(2)},
                        { name: "Medium Priority", icon: <span className='text-orange-400 text-[0.5rem] mr-1'><FaCircle /></span>, callback: () => setPriority(1)},
                        { name: "High Priority", icon: <span className='text-red-400 text-[0.5rem] mr-1'><FaCircle /></span>, callback: () => setPriority(0) } ]}
                    >
                        <Button type="secondary" className="py-1 px-1 text-sm flex items-center gap-1 whitespace-nowrap">
                            {DROPDOWN_PRIORITIES[priority]} <FaAngleDown />
                        </Button>
                    </Dropdown>
                </div>

            </div>

            <div className='w-full flex gap-1 p-3 items-end'>
                <Button type='success' onClick={submit} padding='px-2 py-1' className='flex gap-1 justify-center items-center h-max'><FaPlus />Create</Button>
                <Button type='secondary' padding='px-2 py-1' onClick={handleClose}>Cancel</Button>
            </div>
        </div>
    )
}

export default ItemCreateModal;