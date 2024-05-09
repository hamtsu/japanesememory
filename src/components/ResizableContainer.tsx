import { useRef, useEffect } from 'react'

const ResizableContainer = () => {

    const refBox = useRef<HTMLDivElement>(null)
    const refLeft = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const resizableElement = refBox.current
        const resizerLeft = refLeft.current

        if (resizableElement && resizerLeft) {
            const styles = window.getComputedStyle(resizableElement)
            let width = parseInt(styles.width, 10)
            let xCord = 0

            const onMouseMove = (event: MouseEvent) => {
                const deltaX = event.clientX - xCord
                console.log(event.clientX, xCord)
                xCord = event.clientX
                width = width - deltaX
                resizableElement.style.width = width + 'px'
            }

            const onMouseDown = (event : MouseEvent) => {
                xCord = event.clientX
                resizableElement.style.left = styles.left
                document.addEventListener("mousemove", onMouseMove)
                document.addEventListener("mouseup", onMouseUp)
            }

            const onMouseUp = () => {
                document.removeEventListener("mousemove", onMouseMove)
            }

            resizerLeft.addEventListener("mousedown", onMouseDown)

            return () => {
                resizerLeft.removeEventListener("mousedown", onMouseDown)
            }
        }
    }, [])

    return (
        <div ref={refBox} className='h-full ml-auto w-44 border-slate-300 dark:border-neutral-700 min-w-[100px] max-w-[25%]'>
            <div ref={refLeft} className='left-0 cursor-col-resize h-full w-2 bg-slate-300 dark:bg-neutral-800'></div>
        </div>
    )
}

export default ResizableContainer