import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { images } from "../../constants";
import CustomField from "../../components/ui/CustomField";
import CustomButton from "../../components/ui/CustomButton";
import { createAccount } from "../../lib/appwrite";
import { useGlobalContext } from "../../global_store/GlobalProvider";

const SingUp = () => {
  const { setUserData, setIsLoggedIn } = useGlobalContext();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (!user.username || !user.email || !user.password) {
      return setShowError(true);
    }

    setIsLoading(true);

    try {
      const result = await createAccount(
        user.username,
        user.email,
        user.password
      );

      setUserData(result);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex-1 justify-start items-start w-full px-4 h-full pt-[8vh]">
          <Image
            source={images.logo}
            className="w-[115px] h-[34px]"
            resizeMode="contain"
          />

          <Text className="text-[1.375rem] font-psemibold text-white mt-10">
            Sign Up
          </Text>

          <CustomField
            title="Username"
            type="default"
            value={user.username}
            onChangeText={(e) => setUser({ ...user, username: e })}
            showError={showError}
          />
          <CustomField
            title="Email"
            type="email-address"
            value={user.email}
            onChangeText={(e) => setUser({ ...user, email: e })}
            showError={showError}
          />
          <CustomField
            title="Password"
            type="visible-password"
            value={user.password}
            onChangeText={(e) => setUser({ ...user, password: e })}
            showError={showError}
          />

          <CustomButton
            text="Sign Up"
            onPress={() => handleSignUp()}
            loading={isLoading}
            className="mt-7 w-full"
          />

          <View className="w-full items-center mt-5">
            <Text className="font-pregular text-gray-100">
              Already have an account?{" "}
              <Link
                href={`/(auth)/sign-in`}
                className="font-psemibold text-secondary-100"
              >
                Login
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingUp;

const styles = StyleSheet.create({});
