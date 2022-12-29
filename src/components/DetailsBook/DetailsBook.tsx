import React, { FC } from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Book from '../../interfaces'

interface IDetailsProps {
  favorites: Book[] | null
  item: Book | null
  onFavoriteChange: (book: Book | null) => void
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

const DetailsBook: FC<IDetailsProps> = (props) => {
  const { favorites, item, onFavoriteChange } = props
  const [expanded, setExpanded] = React.useState(false)
  const NA = 'NA'

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const checkIsFavorite = (id: string) => {
    return favorites?.find((book: Book) => book.id === id)
  }

  return (
    <Card
      sx={{
        width: '50rem',
        margin: '2rem auto',
        display: 'table',
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
            {item?.language}
          </Avatar>
        }
        title={item?.title}
        subheader={item?.subtitle || NA}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Authors: {item?.authors || NA}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Categories: {item?.categories || NA}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Published Date: {item?.publishedDate || NA}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => onFavoriteChange(item)}
          style={
            checkIsFavorite(item?.id || '')
              ? { color: '#e36375' }
              : { color: 'rgba(0, 0, 0, 0.54)' }
          }
        >
          <FavoriteIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>More Information:</Typography>
          <Typography paragraph>Self link: {item?.selfLink || NA}</Typography>
          <Typography paragraph>Page count: {item?.pageCount || NA}</Typography>
          <Typography paragraph>Buy link: {item?.buyLink || NA}</Typography>
          <Typography>Web reader link: {item?.webReaderLink || NA}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default DetailsBook
