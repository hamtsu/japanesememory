import { FC, ReactNode } from 'react'
import { FaTimes } from 'react-icons/fa';
import Button from './Button';


type ModalTitleProps = {
    children: ReactNode,
    closable?: boolean,
    handleClose?: () => void;
}

const ModalTitle: FC<ModalTitleProps> = ({ closable, handleClose = () => {}, children }) => {
    return (
        <div className="flex bg-slate-100 dark:bg-neutral-800 p-2 w-full rounded-t-lg">
            <div className="flex-grow text-gray-700 dark:text-gray-300 font-semibold ml-1">
                {children}
            </div>
            {closable && (
                <Button type='close' onClick={handleClose}>
                    <FaTimes size='14px' />
                </Button>
            )}
        </div>
    )
}

export default ModalTitle