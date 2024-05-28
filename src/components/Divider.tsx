import { FC } from "react"

type Divider = {
    height?: number,
    className?: string
}

const Divider: FC<Divider> = ({ height, className }) => {
  return (
    <div className={`${className} w-full rounded-md ${height ? 'h-[' + height + 'px]': 'h-[2px]'} bg-neutral-400 dark:bg-neutral-700`}/>
  )
}

export default Divider