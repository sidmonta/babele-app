import React from 'react'
import { Router } from '@reach/router'
import './App.css'
import Home from './views/Home/Home'
import CategoryPage from './views/CategoryPage/CategoryPage'

import NavMenu from './components/menu/NavMenu'

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
        </Router>
      </main>
      <footer>Luca</footer>
    </div>
  )
}

export default App
