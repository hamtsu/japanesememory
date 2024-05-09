import { createContext } from "react"

interface GlobalContextTypes {
    listView: string,
    setListView: (view: string) => void,
}

export const GlobalContext = createContext<GlobalContextTypes>({
    listView: 'large',
    setListView: () => {},
})
