import {
  AspectRatio,
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
  Tooltip
} from '@chakra-ui/react'
import { MdStar, MdStarHalf } from 'react-icons/md'
import React, { useEffect, useState } from 'react'
import { apiKey } from '../../api'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { formatDate } from '../../utils/formatDate'

export function Detail () {
  const { id } = useParams()
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setIsLoading(true)
    Promise.all([
      axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`),
      axios.get(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiKey}`
      ),
      axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=es_AR`
      )
    ])
      .then(([res1, res2, res3]) => {
        setMovie({
          ...res1.data,
          images: res2.data,
          videos: res3.data
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  return (
    <Box>
      {!isLoading && (
        <>
          <Flex
            mb={32}
            align='center'
            w='full'
            h='360px'
            pos='relative'
            justify={{ base: 'center', md: 'normal' }}
          >
            <Image
              pos='absolute'
              objectFit='cover'
              objectPosition='top'
              w='full'
              h='full'
              src={`https://image.tmdb.org/t/p/original/${movie?.images
                ?.backdrops[0]?.file_path || movie?.backdrop_path}`}
            />

            <Box
              w='220px'
              borderRadius='lg'
              overflow='hidden'
              pos='relative'
              transform={'translateY(30%)'}
              left={{ base: '0px', sm: '30px' }}
              zIndex={1}
              boxShadow='0px 0px 20px rgba(60, 60, 60, 0.3)'
            >
              <Image
                src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
              />
            </Box>
          </Flex>
          <Stack pb={12} px={12} justify='space-between' w='full'>
            <Flex wrap='wrap' gap={1}>
              {/* TODO link with a page with the corresponding genre */}
              {movie.genres.map(genre => (
                <Badge key={genre.id} colorScheme='yellow'>
                  {genre.name}
                </Badge>
              ))}
            </Flex>
            <HStack justify='space-between'>
              <Heading color='white'>{movie.title}</Heading>
              <Text color='gray.500'>
                {formatDate(movie.release_date) || ''}
              </Text>
            </HStack>
            <HStack justify='space-between'>
              <Heading as='h4' fontSize='lg' color='gray.500'>
                {movie.original_title}
              </Heading>
              <Tooltip label={movie.vote_average + ' / 10'}>
                <Flex wrap='wrap' gap={0}>
                  {Array(parseInt(movie.vote_average))
                    .fill(' ')
                    .map((_, i) => (
                      <Icon as={MdStar} key={i} color='yellow.500' />
                    ))}

                  {movie.vote_average % 1 >= 0.5 && (
                    <Icon as={MdStarHalf} color='yellow.500' />
                  )}
                </Flex>
              </Tooltip>
            </HStack>

            <Stack>
              <Text fontSize='lg' color='gray.500'>
                {movie.overview}
              </Text>
            </Stack>
          </Stack>
          {movie.videos?.results.length > 0 && (
            <Stack mx={12} justify='center'>
              <AspectRatio
                ratio={16 / 9}
                w='full'
                maxW='container.md'
                minW='260px'
                mx='auto'
              >
                <iframe
                  width='100%'
                  height='100%'
                  style={{ border: 'none', margin: 'auto' }}
                  src={`https://www.youtube.com/embed/${movie?.videos?.results[0].key}`}
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                />
              </AspectRatio>
            </Stack>
          )}
          {/* <SimpleGrid minChildWidth={'180px'} columns={4}>
            {[...movie.images?.backdrops, ...movie.images?.posters].map(
              (image, index) => (
                <Image
                  key={index}
                  src={`https://image.tmdb.org/t/p/original/${image.file_path}`}
                  alt={movie.title}
                  objectFit='cover'
                />
              )
            )}
          </SimpleGrid> */}
        </>
      )}
    </Box>
  )
}
