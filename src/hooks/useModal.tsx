import Modal from '../components/Modal'
import ReactDOM from 'react-dom/client';
import { useRef } from 'react'

const useModal = () => {
    const root = useRef<ReactDOM.Root | null>()

    const removeModal = () => {
        if (root.current) {
            root.current.unmount()
            root.current = null
        }
    }

    const createModal = (content: React.ReactNode, closable?: boolean, modalProps?: any) => {
        if (root.current) removeModal()

        const modalRoot = document.getElementById("modalRoot")

        if (modalRoot) {
            root.current = ReactDOM.createRoot(modalRoot)

            root.current.render(
                <Modal hide={removeModal} content={content} closable={closable} modalProps={modalProps} />
            )
        }
    }

    return { createModal, removeModal }
}

export default useModal