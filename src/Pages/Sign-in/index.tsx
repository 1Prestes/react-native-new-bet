import React, { useState } from 'react'
import * as yup from 'yup'
import { AntDesign } from '@expo/vector-icons'

import { Title, FormContainer, InputContainer } from './SignIn-style'
import Input from '../../Components/Input'
import { theme } from '../../assets/style/theme'
import Button from '../../Components/Button'

const signInValidationSchema = yup.object().shape({
  password: yup
    .string()
    .min(6)
    .required(),
  email: yup
    .string()
    .email()
    .required()
})

export default function SignIn () {
  const [login, setLogin] = useState({ email: '', password: '' })

  const handleChange = (text: string, key: string) => {
    console.log(text, key)
    setLogin({ ...login, [key]: text })
  }

  const handleClick = () => {
    console.log(login)
  }

  return (
    <FormContainer>
      <Title style={{ fontSize: 34 }}>Authentication</Title>
      <InputContainer>
        <Input
          onChangeText={(value: string) => handleChange(value, 'email')}
          value={login.email}
          autoCapitalize='none'
          placeholder='Email'
        />
        <Input
          onChangeText={(value: string) => handleChange(value, 'password')}
          value={login.password}
          secureTextEntry
          autoCapitalize='none'
          placeholder='Password'
        />

        <Button
          align='flex-end'
          margin='20px 31px'
          label='I forgot my password'
          weight='normal'
          fontSize='14px'
          color='#C1C1C1'
        />
        <Button
          onPress={handleClick}
          fontSize='30px'
          color={theme.colors.green}
        >
          Log In{' '}
          <AntDesign name='arrowright' size={30} color={theme.colors.green} />
        </Button>
      </InputContainer>
      <Button
        onPress={handleClick}
        fontSize='30px'
        color={theme.colors.primary_color}
        width='200px'
      >
        Sign Up{' '}
        <AntDesign
          name='arrowright'
          size={30}
          color={theme.colors.primary_color}
        />
      </Button>
    </FormContainer>
  )
}
