import { Box } from '@chakra-ui/react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { Header } from './components/Header/Header'

import Login from './components/Login/Login'
import { userContext, UserProvider } from './contexts/userContext'
import './styles.css'
import { Detail } from './components/Detail/Detail'
import { Home } from './components/Home/Home'
import AllMovies from './components/AllMovies/AllMovies'
import { Results } from './components/results/Results'
import { Favorites } from './components/Favorites/Favorites'
import { useContext } from 'react'
const Auth = ({ children }) => {
  const { user } = useContext(userContext)
  console.log(user)
  return user ? children : <Navigate to='/login' />
}
function App () {
  return (
    <UserProvider>
      <Box backgroundColor='' minH='100vh' className='App' overflowX='hidden'>
        <Header />
        <Routes>
          <Route path='/login' element={<Login />} />

          <Route
            path='/'
            element={
              <Auth>
                <Home />
              </Auth>
            }
          />
          <Route
            path='/movies'
            element={
              <Auth>
                <AllMovies />
              </Auth>
            }
          />
          <Route
            path='/movies/:page'
            element={
              <Auth>
                <AllMovies />
              </Auth>
            }
          />
          <Route
            path='/search'
            element={
              <Auth>
                <Results />{' '}
              </Auth>
            }
          />
          <Route
            path='/movie/:id'
            element={
              <Auth>
                <Detail />
              </Auth>
            }
          />
          <Route
            path='/favorites'
            element={
              <Auth>
                <Favorites />
              </Auth>
            }
          />
        </Routes>
      </Box>
    </UserProvider>
  )
}

export default App
