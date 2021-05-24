import * as SecureStore from 'expo-secure-store'

export async function saveToken (token: string) {
  await SecureStore.setItemAsync('authToken', token)
}

export async function getToken () {
  let token = await SecureStore.getItemAsync('authToken')

  if (token) {
    return token
  } else {
    alert('No values stored under that key.')
  }
}

export async function removeToken () {
  await SecureStore.deleteItemAsync('authToken')
}
