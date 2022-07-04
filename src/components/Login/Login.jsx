import { Button, Container, Input, VStack } from '@chakra-ui/react'
import axios from 'axios'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import { userContext } from '../../contexts/userContext'

const regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$/

function swalError (error) {
  swal({
    title: 'Error',
    text: error,
    icon: 'error',
    button: 'Ok'
  })
}

export default function Login () {
  const { login } = useContext(userContext)
  const redirect = useNavigate()
  function handleSumbit (e) {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    if (email === '' || password === '') {
      // Los campos estan vacios
      return swalError('Los campos estan vacios')
    }
    if (!regexEmail.test(email)) {
      // El email no es valido
      return swalError('El email no es valido')
    }
    if (password.length < 5) {
      // La contraseña no es valida
      return swalError('La contraseña no es valida')
    }
    // email !== 'challenge@alkemy.org' || password !== 'react'
    axios
      .post('http://challenge-react.alkemy.org', {
        email,
        password
      })
      .then(res => {
        // set token in localStorage
        login(res.data.token)
        swal({
          title: 'Bienvenido',
          text: 'Has iniciado sesion correctamente',
          icon: 'success',
          button: 'Ok'
        })
        redirect('/listado')
      })
      .catch(() => {
        swalError('Las credenciales no son correctas')
      })
  }

  return (
    <div className='login'>
      <h3>Login</h3>
      <Container
        bgColor='gray.900'
        py={12}
        px={6}
        borderRadius='2xl'
        textColor='white'
      >
        <form onSubmit={handleSumbit}>
          <VStack fontWeight='semibold'>
            <label htmlFor='email'>E-mail</label>
            <Input
              type='text'
              id='email'
              name='email'
              placeholder='Email'
              bgColor='gray.700'
              borderColor='gray.700'
              pattern={regexEmail.toString().slice(1, -1)}
            />
            <label htmlFor='password'>Password</label>
            <Input
              type='password'
              id='password'
              name='password'
              bgColor='gray.700'
              borderColor='gray.700'
              placeholder='Password'
            />
            <Button colorScheme='orange' type='submit'>
              Ingresar
            </Button>
          </VStack>
        </form>
      </Container>
    </div>
  )
}
