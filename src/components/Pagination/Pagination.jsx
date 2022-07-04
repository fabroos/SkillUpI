import { Button, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export function Pagination ({ page, length = 99 }) {
  return (
    <HStack justify='center' py={14}>
      {page > 2 && (
        <Button as={Link} to={'/movies/1'}>
          1
        </Button>
      )}

      {page > 1 && (
        <Button as={Link} to={`/movies/${parseInt(page) - 1}`}>
          {parseInt(page) - 1}
        </Button>
      )}
      <Button colorScheme='orange'>{page}</Button>
      {page !== length && (
        <Button as={Link} to={`/movies/${page + 1}`}>
          {page + 1}
        </Button>
      )}

      {page < length - 1 && (
        <Button disabled={page === length} as={Link} to={`/movies/${length}`}>
          {length}
        </Button>
      )}
    </HStack>
  )
}
