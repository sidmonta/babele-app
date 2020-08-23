import React, { useState } from 'react'
import { Router } from '@reach/router'
import './App.css'
import Home from './views/Home/Home'
import CategoryPage from './views/CategoryPage/CategoryPage'

import NavMenu from './components/menu/NavMenu'
import SearchResult from './views/SearchResult/SearchResult'
import SearchBar from './components/searchbar/SearchBar'
import { DeweyCategory } from '@sidmonta/babelelibrary/lib/types'
import { DeweySelectContext } from './context/dewey-select'
import { ThemeContext } from './context/theme'

function App() {
  const [selectDeweyCategory, setSelectDeweyCategory] = useState<DeweyCategory | null>(null)
  const value = { selectDeweyCategory, setSelectDeweyCategory }
  return (
    <ThemeContext.Provider value="real">
      <div className="App">
        <header>
          <NavMenu />
        </header>
        <main>
          <DeweySelectContext.Provider value={value}>
            <Router>
              <Home path="/" />
              <CategoryPage path="category/:categoryId" />
              <SearchResult path="search/:query" />
            </Router>
          </DeweySelectContext.Provider>
        </main>
        <footer>
          <SearchBar />
        </footer>
      </div>
    </ThemeContext.Provider>
  )
}

export default App
