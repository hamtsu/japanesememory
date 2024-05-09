import { FC } from "react"

type ChevronProps = {
    color: string
}

const Chevron: FC<ChevronProps> = ({ color }) => {
    return (
        <svg width="6" height="19" viewBox="0 0 6 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1.73648" width="4" height="10" rx="1" transform="rotate(10 1.73648 0)" fill={color} />
            <rect y="8.49922" width="4" height="10" rx="1" transform="rotate(-10 0 8.49922)" fill={color} />
        </svg>

    )
}

export default Chevron