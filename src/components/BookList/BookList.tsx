import { FC, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, CircularProgress, Pagination } from '@mui/material'
import DetailsBook from '../DetailsBook/DetailsBook'
import Book from '../../interfaces'

interface IBookListProps {
  favorites: Book[] | null
  onFavoriteChange(book: Book): void
}

const BookList: FC<IBookListProps> = (props) => {
  const { favorites, onFavoriteChange } = props
  const [bookList, setBookList] = useState<[] | null>(null)
  const [pagesCount, setPagesCount] = useState<number>(0)
  const navigate = useNavigate()
  const ITEMS_PER_PAGE = 10
  const MY_FAVORITE_BTN = 'MY FAVORITES'
  const FETCH_URL_BASE =
    'https://www.googleapis.com/books/v1/volumes?q=flowers&filter=full'

  const fetchData = async (fetchUrl: string) => {
    try {
      const response = await fetch(fetchUrl)
      const data = await response.json()
      const books = data.items?.map((item: any) => {
        return {
          id: item.id,
          selfLink: item.selfLink,
          authors: item.volumeInfo.authors,
          title: item.volumeInfo.title,
          subtitle: item.volumeInfo.subtitle,
          publishedDate: item.volumeInfo.publishedDate,
          pageCount: item.volumeInfo.pageCount,
          categories: item.volumeInfo.categories,
          imageLinks: item.volumeInfo.imageLinks,
          language: item.volumeInfo.language,
          webReaderLink: item.accessInfo.webReaderLink,
          buyLink: item.saleInfo.buyLink,
        }
      })
      setBookList(books)
      setPagesCount(Math.floor(data?.totalItems / ITEMS_PER_PAGE + 1))
    } catch (err) {
      console.log(err)
      setBookList([])
    }
  }

  useEffect(() => {
    fetchData(FETCH_URL_BASE)
  }, [])

  const handlePageChange = async (event: any, value: number) => {
    const fetchUrl =
      FETCH_URL_BASE + `&startIndex=${(value - 1) * ITEMS_PER_PAGE}`
    fetchData(fetchUrl)
  }

  const favoriteTogleHandler = (book: Book | null) => {
    book && onFavoriteChange(book)
  }

  const myFavoritesClick = () => {
    navigate('/favorites')
  }

  return (
    <>
      {favorites && favorites.length > 0 && (
        <Button
          onClick={myFavoritesClick}
          variant="contained"
          color="primary"
          style={{ marginTop: '8px', maxWidth: '10rem' }}
        >
          {MY_FAVORITE_BTN}
        </Button>
      )}
      {!bookList ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress size={60} />
        </div>
      ) : (
        bookList?.map((book: Book) => {
          return (
            <DetailsBook
              key={book.id}
              item={book}
              favorites={favorites}
              onFavoriteChange={favoriteTogleHandler}
            />
          )
        })
      )}
      {bookList && (
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

export default BookList
