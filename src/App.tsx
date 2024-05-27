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
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/kanji" element={<Kanji />} />
          <Route path="/conjugation/verb" element={<VerbConjugation />} />
          <Route path="/conjugation/adjectives" element={<AdjectiveConjugation/>} />
          <Route path="/particles" element={<Particles />} />
        </Routes>
        </BrowserRouter>
    </GlobalContext.Provider>
  )
}

export default App
