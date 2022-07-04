import {
  Button,
  Flex,
  Hide,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show
} from '@chakra-ui/react'

import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { userContext } from '../../contexts/userContext'
import { MotionBox } from '../anim/MotionBox'
import { SearchBar } from '../SearchBar/SearchBar'
export function Header () {
  const { token, logout } = useContext(userContext)
  const [isInTop, setIsInTop] = useState(true)

  useEffect(() => {
    const isInTopCb = () => {
      if (window.scrollY > 50) {
        setIsInTop(false)
      } else {
        setIsInTop(true)
      }
    }
    window.addEventListener('scroll', isInTopCb)
    return () => {
      window.removeEventListener('scroll', isInTopCb)
    }
  }, [isInTop, setIsInTop])

  return (
    <MotionBox
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      // mb={100}
    >
      <Flex
        w='full'
        position='fixed'
        justify='space-between'
        py={4}
        px={8}
        align='center'
        zIndex={100}
        fontWeight='bold'
        textColor='white'
        bg={isInTop ? 'transparent' : 'blackAlpha.800'}
        transition='all 0.3s ease-in-out'
        backdropFilter={'blur(2px)'}
      >
        <Link to='/'>Movies</Link>
        <Hide below='md'>
          <SearchBar />
          <HStack align='center' gap={8}>
            <Link to='/'>Home</Link>
            <Link to='/movies'>Listado</Link>

            {!token && (
              <Button as={Link} to='/login' colorScheme='orange'>
                Login
              </Button>
            )}
            {token && (
              <>
                <Link to='/favorites'>Favorites</Link>
                <Button
                  as={Link}
                  to='/login'
                  onClick={logout}
                  colorScheme='orange'
                >
                  Logout
                </Button>
              </>
            )}
          </HStack>
        </Hide>
        <Show below='md'>
          <Menu>
            <MenuButton color='white' w={6}>
              <svg
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
              </svg>
            </MenuButton>

            <MenuList>
              <MenuItem>
                <Link to='/'>Home</Link>
              </MenuItem>
            </MenuList>
          </Menu>
        </Show>
      </Flex>
    </MotionBox>
  )
}
