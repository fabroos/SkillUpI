import { Box, Button, Heading, Hide, Skeleton } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { MotionBox } from '../anim/MotionBox'
import Movie from '../Movie/Movie'
import { SkeletonMovie } from '../Skeletons/SkeletonMovie'

export function MovieSlider ({ movies = [], children }) {
  const movieFlex = useRef(null)
  const scrollRight = () =>
    (movieFlex.current.scrollLeft += movieFlex.current.offsetWidth)
  const scrollLeft = () =>
    (movieFlex.current.scrollLeft -= movieFlex.current.offsetWidth)

  return (
    <Box py={4} pos='relative'>
      <Heading mb={2} px={8}>
        {children}
      </Heading>

      <MotionBox
        ref={movieFlex}
        overflowX='scroll'
        scrollBehavior='smooth'
        css={{
          '&::-webkit-scrollbar': {
            width: '4px'
          },
          '&::-webkit-scrollbar-track': {
            width: '6px'
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '24px'
          }
        }}
      >
        <Hide below='sm'>
          <Button
            pos='absolute'
            zIndex={10}
            top='50%'
            right={5}
            p={2}
            bg='gray.700'
            onClick={scrollRight}
          >
            👉
          </Button>
          <Button
            pos='absolute'
            zIndex={10}
            top='50%'
            left={5}
            p={2}
            bg='gray.700'
            onClick={scrollLeft}
          >
            👈
          </Button>
        </Hide>

        <MotionBox
          display='flex'
          w='max-content'
          gap={3}
          overflowX='visible'
          px={8}
        >
          {movies.length > 0 &&
            movies.map(movie => <Movie key={movie.id} movie={movie} />)}
          {movies.length < 1 &&
            Array(10)
              .fill(0)
              .map((_, i) => <SkeletonMovie key={i} />)}
        </MotionBox>
      </MotionBox>
    </Box>
  )
}
