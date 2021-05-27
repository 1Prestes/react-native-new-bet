import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import * as yup from 'yup'

import Header from '../../Components/Header'
import { NavigationProps } from '../../Routes/routes'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchUser, updateUser } from '../../store/userReducer'
import showMessage from '../../helpers/toasts'
import {
  Container,
  Title,
  FormContainer,
  InputContainer
} from './Account-style'
import Input from '../../Components/Input'
import { theme } from '../../assets/style/theme'
import Button from '../../Components/Button'

const schema = yup.object().shape({
  password: yup
    .string()
    .min(6)
    .required(),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  email: yup
    .string()
    .email()
    .required(),
  username: yup
    .string()
    .min(3)
    .required('')
})

export default function Account ({ navigation }: NavigationProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(
    false
  )

  const [userUpdate, setUserUpdate] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const user = useAppSelector(state => state.user.user)
  const error = useAppSelector(state => state.user.error)
  const token = useAppSelector(state => state.session.token)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUser(token)).then(res => {
      if (!res.payload) {
        if (error) {
          showMessage('error', error)
        }
      }
    })
  }, [])

  useEffect(() => {
    setUserUpdate({ ...userUpdate, username: user.username, email: user.email })
  }, [user])

  const handleClick = async () => {
    await schema
      .validate(userUpdate)
      .then(res => {
        dispatch(updateUser(res))
          .then(response => {
            if (response.payload === undefined) {
              return showMessage('error', 'Email already exists')
            }

            showMessage(
              'success',
              'Successfully changed data, you will be redirected',
              3000
            )
            setTimeout(() => {
              navigation.navigate('Home')
              setUserUpdate({
                username: '',
                email: '',
                password: '',
                password_confirmation: ''
              })
            }, 2000)
          })
          .catch(err => showMessage('error', err.error.message))
      })
      .catch(err => showMessage('error', err.errors[0]))
  }

  const handleChange = (value: string, key: string) => {
    setUserUpdate({ ...userUpdate, [key]: value })
  }

  return (
    <>
      <Header navigation={navigation} />
      <StatusBar style='auto' translucent={true} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
      >
        <View>
          <ScrollView
            keyboardShouldPersistTaps='always'
            showsVerticalScrollIndicator={false}
          >
            <Container>
              <FormContainer>
                <Title>Hello {user.username}</Title>
                <InputContainer>
                  <Input
                    onChangeText={(value: string) =>
                      handleChange(value, 'username')
                    }
                    value={userUpdate.username}
                    placeholder='Name'
                  />
                  <Input
                    onChangeText={(value: string) =>
                      handleChange(value, 'email')
                    }
                    autoCapitalize='none'
                    value={userUpdate.email}
                    placeholder='Email'
                  />
                  <Input
                    onChangeText={(value: string) =>
                      handleChange(value, 'password')
                    }
                    secureTextEntry={!showPassword}
                    autoCapitalize='none'
                    value={userUpdate.password}
                    placeholder='Password'
                  />

                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: 25,
                      top: 162
                    }}
                  >
                    <MaterialCommunityIcons
                      onPress={() => setShowPassword(!showPassword)}
                      name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={24}
                      color='#C1C1C1'
                    />
                  </TouchableOpacity>

                  <Input
                    onChangeText={(value: string) =>
                      handleChange(value, 'password_confirmation')
                    }
                    secureTextEntry={!showPasswordConfirmation}
                    autoCapitalize='none'
                    value={userUpdate.password_confirmation}
                    placeholder='Password confirmation'
                  />

                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: 25,
                      top: 232
                    }}
                  >
                    <MaterialCommunityIcons
                      onPress={() =>
                        setShowPasswordConfirmation(!showPasswordConfirmation)
                      }
                      name={
                        showPasswordConfirmation
                          ? 'eye-outline'
                          : 'eye-off-outline'
                      }
                      size={24}
                      color='#C1C1C1'
                    />
                  </TouchableOpacity>

                  <Button
                    onPress={handleClick}
                    margin='21px'
                    fontSize='30px'
                    width='180px'
                    color={theme.colors.green}
                  >
                    <Text>
                      Update{' '}
                      <AntDesign
                        name='arrowright'
                        size={30}
                        color={theme.colors.green}
                      />
                    </Text>
                  </Button>
                </InputContainer>
              </FormContainer>
            </Container>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </>
  )
}
