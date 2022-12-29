import { FC, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Pagination } from '@mui/material'
import DetailsBook from '../DetailsBook/DetailsBook'
import Book from '../../interfaces'

interface IBookListProps {
  favorites: Book[] | null
}

const Favorites: FC<IBookListProps> = (props) => {
  const { favorites } = props
  const [renderedFavorites, setRenderedFavorites] = useState<Book[] | null>(
    null,
  )
  const [pagesCount, setPagesCount] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const navigate = useNavigate()
  const ITEMS_PER_PAGE = 10
  const ALL_BOOKS_BTN = 'ALL BOOKS'

  useEffect(() => {
    setRenderedFavorites(favorites)
    if (favorites) {
      setPagesCount(Math.floor(favorites?.length / ITEMS_PER_PAGE + 1))
    }
  }, [])

  const handlePageChange = (event: any, value: number) => {
    setCurrentPage(value - 1)
  }

  const allBooksClick = () => {
    navigate('/books')
  }

  return (
    <>
      {favorites && favorites.length > 0 && (
        <Button
          onClick={allBooksClick}
          variant="contained"
          color="primary"
          style={{ marginTop: '8px', maxWidth: '10rem' }}
        >
          {ALL_BOOKS_BTN}
        </Button>
      )}
      {renderedFavorites
        ?.filter(
          (item: Book, index: number) =>
            index >= currentPage * ITEMS_PER_PAGE &&
            index <= currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE - 1,
        )
        .map((book: Book) => {
          return (
            <DetailsBook
              key={book.id}
              item={book}
              favorites={favorites}
              onFavoriteChange={() => {}}
            />
          )
        })}
      {favorites && favorites?.length > ITEMS_PER_PAGE && (
        <Pagination
          data-testid="list-pagination"
          sx={{ mt: '20px', display: 'flex', justifyContent: 'center' }}
          onChange={handlePageChange}
          count={pagesCount}
          variant="outlined"
          color="primary"
        />
      )}
    </>
  )
}

export default Favorites
