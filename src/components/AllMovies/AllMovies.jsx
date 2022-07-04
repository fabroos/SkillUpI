import { Heading } from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { apiKey } from '../../api'
import { userContext } from '../../contexts/userContext'
import { Hero } from '../Hero/Hero'
import MoviesList from '../MoviesList/MoviesList'
import { Pagination } from '../Pagination/Pagination'
const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es_ES&sort_by=popularity.desc&include_adult=false&include_video=true&with_watch_monetization_types=flatrate`

export default function AllMovies () {
  const { page } = useParams()
  const { token } = useContext(userContext)
  const [moviesList, setMoviesList] = useState({
    total_pages: 0,
    total_results: 0,
    results: []
  })
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setIsLoading(true)
    axios
      .get(url + `&page=${page || 1}`)
      .then(res => {
        setMoviesList({
          total_pages: 99,
          total_results: res.data.total_results,
          results: res.data.results
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
      .catch(() => {
        // swal('Error', 'Error al cargar la lista', err)
      })
  }, [page])
  return (
    <>
      {!token && <Navigate to='/login' />}
      <Hero src={'https://images7.alphacoders.com/122/1229914.jpg'}>
        <Heading as='h1' fontSize='6xl' textShadow='2xl'>
          Listado de Peliculas
        </Heading>
      </Hero>
      <MoviesList isLoading={isLoading} moviesList={moviesList.results} />
      <Pagination page={parseInt(page || 1)} length={moviesList.total_pages} />
    </>
  )
}
