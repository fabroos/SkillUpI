import { Heading } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { userContext } from '../../contexts/userContext'
import MoviesList from '../MoviesList/MoviesList'

export const Favorites = () => {
  const { user } = useContext(userContext)
  console.log(user)
  return (
    <>
      <Heading pt={24} pb={12} px={12}>
        Favoritos
      </Heading>
      {user.favorites.length === 0 && (
        <Heading textAlign='center'>No hay favoritos</Heading>
      )}
      <MoviesList moviesList={user.favorites} isLoading={false} />
    </>
  )
}
