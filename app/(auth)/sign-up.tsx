import { router } from 'expo-router'
import React from 'react'
import { Button, Text, View } from 'react-native'

const SignUp = () => {
  return (
    <View>
      <Text>sign-up</Text>
        <Button title='Sign In' onPress={()=> router.push("/sign-in")}></Button>
    </View>
  )
}

export default SignUp