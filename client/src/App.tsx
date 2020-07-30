import React from 'react'
import { Router } from '@reach/router'
import './App.css'
import Home from './views/Home/Home'
import CategoryPage from './views/CategoryPage/CategoryPage'

import NavMenu from './components/menu/NavMenu'
import SearchResult from './views/SearchResult/SearchResult'
import SearchBar from './components/searchbar/SearchBar'

function App() {
  return (
    <div className="App">
      <header>
        <NavMenu />
      </header>
      <main>
        <Router>
          <Home path="/" />
          <CategoryPage path="category/:categoryId" />
          <SearchResult path="search/:query" />
        </Router>
      </main>
      <footer>
        <SearchBar />
      </footer>
    </div>
  )
}

export default App
