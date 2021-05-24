import Toast from 'react-native-toast-message'

type TypeMessage = 'error' | 'success' | 'info'

export default function showMessage (type: TypeMessage, message: string) {
  return Toast.show({
    type: type,
    position: 'top',
    text1: type,
    text2: message,
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 60
  })
}
