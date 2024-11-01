import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Home = () => {
  return (
    <View>
      <Link href="/" className="text-blue-500">Go to Home</Link>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})