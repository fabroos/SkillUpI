import { Box, Heading } from '@chakra-ui/react'
import swal from '@sweetalert/with-react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiKey } from '../../api'
import { MovieSlider } from '../MovieSlider/MovieSlider'
const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&include_adult=false&include_video=true&with_watch_monetization_types=flatrate`

export function Home () {
  const [movies, setMovies] = useState({
    popularity: [],
    release_date: [],
    vote_average: []
  })
  useEffect(() => {
    Promise.all([
      axios.get(url + '&sort_by=popularity.desc'),
      axios.get(url + '&sort_by=release_date.desc'),
      axios.get(url + '&sort_by=vote_average.desc')
    ])
      .then(([pop, rel, vote]) => {
        setMovies({
          popularity: pop.data.results,
          release_date: rel.data.results,
          vote_average: vote.data.results
        })
      })
      .catch(err => {
        swal('Error', err.message, 'error')
      })
  }, [])

  return (
    <Box textColor='white' overflow='hidden'>
      <Heading as='h1'>Home</Heading>
      <MovieSlider movies={movies.release_date}>Latest Movies</MovieSlider>
      <MovieSlider movies={movies.popularity}>Popular Movies</MovieSlider>
      <MovieSlider movies={movies.vote_average}>Top Rated Movies</MovieSlider>
    </Box>
  )
}
