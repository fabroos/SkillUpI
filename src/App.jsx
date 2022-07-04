import { Box } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'

import { Header } from './components/Header/Header'

import Login from './components/Login/Login'
import { UserProvider } from './contexts/userContext'
import './styles.css'
import { Detail } from './components/Detail/Detail'
import { Home } from './components/Home/Home'
import AllMovies from './components/AllMovies/AllMovies'
import { Results } from './components/results/Results'
import { Favorites } from './components/Favorites/Favorites'

function App () {
  return (
    <UserProvider>
      <Box backgroundColor='' minH='100vh' className='App' overflowX='hidden'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/movies' element={<AllMovies />} />
          <Route path='/movies/:page' element={<AllMovies />} />
          <Route path='/search' element={<Results />} />
          <Route path='/movie/:id' element={<Detail />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
      </Box>
    </UserProvider>
  )
}

export default App
