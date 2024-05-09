import { useState } from 'react'
import { GlobalContext } from './context/GlobalContext'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Kanji from './pages/Kanji'

// TODO transfer to file storage instead of localstorage
function App() {

  const [listView, setListView] = useState('large')

  return (
    <GlobalContext.Provider value={{ listView, setListView }}>
      {/* <div className='w-screen h-screen flex rounded-lg overflow-hidden '>
        
        <Sidebar />

        <div className='w-full h-full bg-slate-50 dark:bg-neutral-900'>
          <div className='pr-5 py-3 h-full w-full'>
            <div className='bg-slate-100 dark:bg-neutral-950 rounded-lg overflow-hidden h-full'>
              <Titlebar />

              <div className='h-full w-full flex'>

                <div className='items-center flex flex-col h-full p-3 w-full'>
                  <QuickBar />
                  <List />
                </div>

                <ResizableContainer />
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Kanji />} />
        </Routes>
        </BrowserRouter>
    </GlobalContext.Provider>
  )
}

export default App
