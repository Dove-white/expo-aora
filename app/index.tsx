import { Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

const Home = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-3xl font-pblack">Home</Text>
      <StatusBar style="auto" />
      <Link href="/home" className="text-blue-500">Go to Home</Link>
    </View>
  );
};

export default Home;
