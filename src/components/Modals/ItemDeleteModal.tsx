import { FC, useEffect } from 'react'
import ModalTitle from "../ModalTitle";
import Button from '../Button';
import { FaMinus } from 'react-icons/fa';
import Item from '../LargeItem';

type ItemDeleteModalProps = {
    handleClose?: () => void,
    closable?: boolean,
    itemTitle: string,
    itemBody?: string,
    itemPriority: number,
    itemCreatedAt: Date,
    itemId: number,
}

const ItemDeleteModal: FC<ItemDeleteModalProps> = ({ handleClose, closable, itemTitle, itemBody, itemCreatedAt, itemPriority, itemId }) => {

    const deleteItem = () => {
        const storedItemsList = localStorage.getItem("itemsList")

        if (storedItemsList) {
            const itemsList = JSON.parse(storedItemsList)
            if (itemsList[itemId]) {
                itemsList.splice(itemId, 1)
                localStorage.setItem("itemsList", JSON.stringify(itemsList))
                window.dispatchEvent(new Event('storage'))
            }
        }

        handleClose?.()
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
        <div className='min-w-[400px]'>
            <ModalTitle closable={closable} handleClose={handleClose}>Delete this todo item?</ModalTitle>

            <div className='self-center w-full flex-wrap p-3'>
                <Item id={1} createdAt={itemCreatedAt} priority={itemPriority} title={itemTitle} description={itemBody && itemBody} preview />
            </div>

            <div className='w-full flex gap-2 p-3'>
                <Button type='error' padding='px-2 py-1' onClick={deleteItem} className='flex gap-1 justify-center items-center h-max'><FaMinus />Delete</Button>
                <Button type='secondary' padding='px-2 py-1' onClick={handleClose} className='flex gap-1 justify-center items-center'>Cancel</Button>
            </div>
        </div>
    )
}

export default ItemDeleteModal;