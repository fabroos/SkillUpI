import { Box, Heading } from '@chakra-ui/react'

import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { apiKey } from '../../api'

import MoviesList from '../MoviesList/MoviesList'
const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}`

export function Results () {
  const [searchParams] = useSearchParams()
  const bottom = useRef(null)
  const [moviesList, setMoviesList] = useState({
    total_pages: 0,
    total_results: 0,
    results: [],
    actual_page: 1
  })
  useEffect(() => {
    axios(url + `&query=${searchParams.get('q')}`).then(res => {
      setMoviesList({
        total_pages: res.data.total_pages,
        total_results: res.data.total_results,
        results: res.data.results,
        actual_page: res.data.page
      })
    })
  }, [searchParams])

  return (
    <>
      <Heading pt={24} pb={12} px={12}>
        Resultados de la busqueda: {searchParams.get('q')}
      </Heading>
      {moviesList.results.length < 0 && (
        <Heading textAlign='center'>No hay resultados</Heading>
      )}
      {moviesList.results.length > 0 && (
        <MoviesList moviesList={moviesList} isLoading={false} />
      )}
      <Box w={1} h={1} ref={bottom} />
    </>
  )
}
