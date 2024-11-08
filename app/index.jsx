import { Image, Text, View, ScrollView, Platform } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import CustomButton from "../components/ui/CustomButton";
import { images } from "../constants";
import { useGlobalContext } from "../global_store/GlobalProvider";
import Logo from "../assets/logo.png";

const Home = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();
  if (isLoading)
    return (
      <SafeAreaView className="bg-primary h-full">
        <View className="items-center justify-center w-full h-full pb-12">
          <Image source={Logo} className="w-full" resizeMode="contain" />
        </View>
      </SafeAreaView>
    );

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex-1 items-center justify-start px-4 w-full h-full pt-[8vh]">
          <Image
            source={images.logo}
            className="w-[115px] h-[34px]"
            resizeMode="contain"
          />

          <Image
            source={images.cards}
            className="w-full max-w-[375px] h-[298px]"
            resizeMode="contain"
          />

          <Text className="text-center text-white font-psemibold text-3xl mt-7">
            Discover Endless Possibilities with
            <Text className="text-secondary-100 relative"> Aora</Text>
            {Platform.OS === "ios" && (
              <Image
                source={images.path}
                className="w-[80px] h-[14px] absolute bottom-[-2px] right-[-30px]"
                resizeMode="contain"
              />
            )}
          </Text>

          <Text className="text-center text-gray-100 mt-7 font-pregular">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>

          <CustomButton
            text="Connect with Email"
            onPress={() => router.push("/sign-in")}
            className="mt-7 w-full"
          />
        </View>
      </ScrollView>

      {/* this will show the status bar on you phone */}
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Home;
