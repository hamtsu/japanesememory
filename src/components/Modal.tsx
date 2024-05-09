import { useRef, FC, useEffect, useState, ReactNode, cloneElement } from "react";

type ModalProps = {
    hide: () => void,
    content: ReactNode,
    closable?: boolean,
    modalProps: any
}

const Modal: FC<ModalProps> = ({ hide, content, closable, ...modalProps }) => {
    const [mounted, setMounted] = useState(false)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>()

    useEffect(() => {
        setMounted(true)

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, []);

    const handleClose = () => {
        setMounted(false)
        timeoutRef.current = setTimeout(() => {
            hide()
        }, 150)
    }

    return (
        <div className='h-screen w-screen flex justify-center z-40 fixed'>

            <div className={`h-full w-full bg-black transition-all ${mounted ? 'opacity-40' : 'opacity-0'}`} onClick={closable ? handleClose : undefined} />

            <div className={`bg-slate-200 dark:bg-neutral-900 rounded-lg absolute z-[41] self-center text-gray-900 dark:text-gray-50
                transition-[opacity] ${mounted ? 'opacity-100' : 'opacity-0'}`}
            >
                {cloneElement(content as React.ReactElement<any>, { handleClose, closable, ...modalProps })}
            </div>

        </div>
    );
}


export default Modal;