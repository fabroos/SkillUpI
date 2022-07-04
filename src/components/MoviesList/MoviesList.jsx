import { Box, SimpleGrid } from '@chakra-ui/react'

import Movie from '../Movie/Movie'

// import adultMovies from './../../adultMovies.json'

export default function MoviesList ({ isLoading, moviesList }) {
  return (
    <Box px={12} color='white'>
      <SimpleGrid columns={{ sm: 2, md: 4, lg: 6 }} gap={8}>
        {isLoading &&
          Array.from({ length: 20 }).map((_, i) => <Movie key={i} />)}
        {!isLoading &&
          moviesList.map(movie => <Movie movie={movie} key={movie.id} />)}
      </SimpleGrid>
    </Box>
  )
}
