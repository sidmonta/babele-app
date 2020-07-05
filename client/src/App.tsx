import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Router } from '@reach/router'
import './App.css'
import BookCase, { BookCaseType } from './components/bookcase/BookCase'
import Home from './views/Home/Home'
import CategoryPage from './views/CategoryPage/CategoryPage'

// type Book = {
//   name: string
//   dewey: string
//   id: string
// }

function App() {
  return (
    <div className="App">
      <header>
        <nav>Menu</nav>
        <h1>Babele's Library</h1>
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
