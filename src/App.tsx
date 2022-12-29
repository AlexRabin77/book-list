import { Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import BookList from './components/BookList/BookList'
import Favorites from './components/Favorites/Favorites'
import { useState } from 'react'
import Book from './interfaces'

const App = () => {
  const [favorites, setFavorites] = useState<Book[] | null>(null)

  const favoriteTogle = (book: Book) => {
    const founded = favorites?.find((item: Book) => item.id === book.id)
    if (founded) {
      const updated = favorites?.filter((item: Book) => item.id !== book.id)
      setFavorites(updated as Book[])
    } else {
      setFavorites((oldArray) => [...(oldArray || []), book])
    }
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/books"
          element={
            <BookList favorites={favorites} onFavoriteChange={favoriteTogle} />
          }
        ></Route>
        <Route
          path="/favorites"
          element={<Favorites favorites={favorites} />}
        ></Route>
      </Routes>
    </>
  )
}

export default App
