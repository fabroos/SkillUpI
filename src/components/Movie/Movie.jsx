import { Box, Heading, Icon, Image, Skeleton, VStack } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdStar } from 'react-icons/md'
import { userContext } from '../../contexts/userContext'

export default function Movie ({ movie = {} }) {
  const [isHover, setIsHover] = useState(false)
  const { isLiked, removeFavorite, addFavorite } = useContext(userContext)
  const [isFav, setIsFav] = useState(() => isLiked(movie))

  function handleHover () {
    setIsHover(!isHover)
  }
  function handleClick (e) {
    e.preventDefault()
    // prevent bubbling to prevent adding the movie to the favorites list
    e.stopPropagation()
    if (isFav) {
      removeFavorite(movie)
      setIsFav(false)
    } else {
      addFavorite(movie)
      setIsFav(true)
    }
  }
  return (
    <Box
      boxShadow={isHover ? '0px 0px 15px rgba()' : 'none'}
      as={Link}
      to={`/movie/${movie.id}`}
      h={{ base: '290px', lg: '310px' }}
      key={movie.id}
      borderRadius='xl'
      overflow='hidden'
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      pos='relative'
    >
      <Image
        h='full'
        w='full'
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
        objectFit='cover'
        fallback={<Skeleton h={{ base: '290px', lg: '310px' }} w='full' />}
      />
      {isHover && (
        <Box
          pos='absolute'
          top='0'
          left='0'
          w='full'
          h='full'
          bg='blackAlpha.600'
          borderRadius='lg'
          zIndex={1}
        >
          <Icon
            pos='absolute'
            top='10px'
            _first={{ width: '20px', height: '20px' }}
            right='10px'
            onClick={handleClick}
            zIndex={100}
            as={MdStar}
            size='30px'
            color={() => (isFav ? 'yellow.500' : 'white')}
          />

          <VStack textColor='white' justify='center' h='full'>
            <Heading
              fontSize='md'
              textShadow='2xl'
              textOverflow='ellipsis'
              overflow='hidden'
              whiteSpace='nowrap'
              maxW='full'
              px={2}
              as='h3'
            >
              {movie.title}
            </Heading>
          </VStack>
        </Box>
      )}
    </Box>
  )
}
