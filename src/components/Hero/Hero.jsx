import { Box, Heading, Image, Stack } from '@chakra-ui/react'
import React from 'react'

export function Hero ({ src, children }) {
  return (
    <>
      <Box h='600px' mb={12} />
      <Box
        h='600px'
        overflow='hidden'
        zIndex={1}
        top={0}
        w='full'
        pos='absolute'
      >
        <Image
          top='0'
          h='600px'
          left='0'
          w='full'
          objectFit='cover'
          pos='absolute'
          src={src}
        />
        <Stack
          zIndex={1}
          h='full'
          pos='relative'
          textColor={'white'}
          justify='center'
          align={'center'}
        >
          {children}
        </Stack>
      </Box>
    </>
  )
}
