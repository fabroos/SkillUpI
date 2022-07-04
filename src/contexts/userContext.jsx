import { createContext, useEffect, useState } from 'react'

const userContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem('user'))?.favorites
      ? JSON.parse(localStorage.getItem('user'))
      : null
  )
  const [token, setToken] = useState(() => localStorage.getItem('token'))

  const login = token => {
    setUser({
      favorites: []
    })
    localStorage.setItem('user', JSON.stringify(user))
    setToken(token)
    localStorage.setItem('token', token)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const addFavorite = movie => {
    setUser({
      ...user,
      favorites: [...user.favorites, movie]
    })
  }

  const removeFavorite = movie => {
    setUser({
      favorites: [...user.favorites.filter(f => f.id !== movie.id)]
    })
  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  const isLiked = movie => {
    return user.favorites.some(fav => fav.id === movie.id)
  }

  return (
    <userContext.Provider
      value={{
        user,
        login,
        logout,
        token,
        addFavorite,
        removeFavorite,
        isLiked
      }}
    >
      {children}
    </userContext.Provider>
  )
}

export { userContext, UserProvider }
