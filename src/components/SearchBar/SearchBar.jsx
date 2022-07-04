import { Icon, Input, InputGroup, InputRightAddon } from '@chakra-ui/react'

import React from 'react'
import { MdSearch } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

export const SearchBar = () => {
  const navigate = useNavigate()
  function captureSearch (e) {
    e.preventDefault()
    const search = e.currentTarget.search.value
    if (search.length < 3) return
    navigate(`/search?q=${search}`)
  }
  return (
    <form onSubmit={captureSearch}>
      <InputGroup>
        <Input placeholder='Search...' bg='transparent' name='search' />
        <InputRightAddon cursor='pointer' _hover={{ bg: 'whiteAlpha.500' }}>
          <Icon name='search' as={MdSearch} />
        </InputRightAddon>
      </InputGroup>
    </form>
  )
}
