import React from 'react'
import { Box, Heading, Image, Skeleton, VStack } from '@chakra-ui/react'

export function SkeletonMovie () {
  return (
    <Skeleton
      h={{ base: '290px', lg: '310px' }}
      w={{ base: '200px', lg: '200px' }}
      borderRadius='xl'
    ></Skeleton>
  )
}
