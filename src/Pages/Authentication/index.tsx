import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView } from 'react-native'
import * as yup from 'yup'

import {
  Title,
  Container,
  LogoContainer,
  BorderBottom
} from './Authentication-style'
import SignIn from '../Sign-in'
import SignUp from '../Sign-up'

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

export default function Authentication () {
  return (
    <>
      <Container>
        <StatusBar style='auto' translucent={true} />
        <KeyboardAvoidingView behavior='height' enabled>
          <LogoContainer>
            <Title>TGL</Title>
            <BorderBottom />
          </LogoContainer>

          <SignIn />
        </KeyboardAvoidingView>
      </Container>
    </>
  )
}
