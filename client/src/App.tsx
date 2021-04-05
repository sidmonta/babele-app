import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Home from './views/Home/Home'
import CategoryPage from './views/CategoryPage/CategoryPage'

import NavMenu from './components/menu/NavMenu'
import SearchResult from './views/SearchResult/SearchResult'
import SearchBar from './components/searchbar/SearchBar'
import { DeweyCategory } from '@sidmonta/babelelibrary/build/types'
import { DeweySelectContext } from './context/dewey-select'
import { ThemeContext, Themes } from './context/theme'

const appTheme = process.env.REACT_APP_THEME as Themes

function App() {
  const [
    selectDeweyCategory,
    setSelectDeweyCategory,
  ] = useState<DeweyCategory | null>(null)
  const selectDeweyProvider = { selectDeweyCategory, setSelectDeweyCategory }
  return (
    <ThemeContext.Provider value={appTheme}>
      <div className="App">
        <Router>
          <header>
            <NavMenu />
          </header>
          <main>
            <DeweySelectContext.Provider value={selectDeweyProvider}>
              <Switch>
                <Route path="/">
                  <Home />
                </Route>
                <Route path="category/:categoryId">
                  <CategoryPage />
                </Route>
                <Route path="search/:query">
                  <SearchResult />
                </Route>
              </Switch>
            </DeweySelectContext.Provider>
          </main>
          <footer>
            <SearchBar />
          </footer>
        </Router>
      </div>
    </ThemeContext.Provider>
  )
}

export default App
