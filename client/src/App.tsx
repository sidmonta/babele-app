import React, { useState } from 'react'
import { Router } from '@reach/router'
import './App.css'
import Home from './views/Home/Home'
import CategoryPage from './views/CategoryPage/CategoryPage'
import BookView from './views/BookView/BookView'

import NavMenu from './components/menu/NavMenu'
import SearchResult from './views/SearchResult/SearchResult'
import SearchBar from './components/searchbar/SearchBar'
import { DeweyCategory } from '@sidmonta/babelelibrary/lib/types'
import { DeweySelectContext } from './context/dewey-select'
import { ThemeContext, Themes } from './context/theme'

function App() {
  const [selectDeweyCategory, setSelectDeweyCategory] = useState<DeweyCategory | null>(null)
  const value = { selectDeweyCategory, setSelectDeweyCategory }
  return (
    <ThemeContext.Provider value={process.env.REACT_APP_THEME as Themes}>
      <div className="App">
        <header>
          <NavMenu />
        </header>
        <main>
          <DeweySelectContext.Provider value={value}>
            <Router>
              <Home path="/" />
              <CategoryPage path="category/:categoryId">
                <BookView path="book/:bookUri" />
              </CategoryPage>
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
