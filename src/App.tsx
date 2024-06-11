import { useState } from 'react'
import { GlobalContext } from './context/GlobalContext'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Kanji from './pages/Kanji'
import Home from './pages/Home';
import About from './pages/About';
import Particles from './pages/Particles';
import VerbConjugation from './pages/conjugation/VerbConjugation';
import AdjectiveConjugation from './pages/conjugation/AdjectiveConjugation';

function App() {

  const [listView, setListView] = useState('large')

  return (
    <GlobalContext.Provider value={{ listView, setListView }}>
      <BrowserRouter>
        <Routes>
          <Route path="/japanesememory" element={<Home />} />
          <Route path="/japanesememory/about" element={<About />} />
          <Route path="/japanesememory/kanji" element={<Kanji />} />
          <Route path="/japanesememory/conjugation/verb" element={<VerbConjugation />} />
          <Route path="/japanesememory/conjugation/adjectives" element={<AdjectiveConjugation/>} />
          <Route path="/japanesememory/particles" element={<Particles />} />
        </Routes>
        </BrowserRouter>
    </GlobalContext.Provider>
  )
}

export default App
