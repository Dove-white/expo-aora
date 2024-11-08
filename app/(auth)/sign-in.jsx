import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { images } from "../../constants";
import CustomButton from "../../components/ui/CustomButton";
import CustomField from "../../components/ui/CustomField";
import { getCurrentUser, singIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../global_store/GlobalProvider";

const SingIn = () => {
  const { setUserData, setIsLoggedIn } = useGlobalContext();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (!user.email || !user.password) {
      return setShowError(true);
    }

    setIsLoading(true);

    try {
      await singIn(user.email, user.password);

      const result = await getCurrentUser();
      setUserData(result);
      setIsLoggedIn(true);

      Alert.alert("Success", "User signed in successfully");

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
            Sign In
          </Text>

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

          <View className="w-full items-end mt-5">
            <Text className="font-pregular text-gray-100">Forgot password</Text>
          </View>

          <CustomButton
            text="Long In"
            onPress={() => handleSignIn()}
            loading={isLoading}
            className="mt-7 w-full"
          />

          <View className="w-full items-center mt-5">
            <Text className="font-pregular text-gray-100">
              Don't have an account?{" "}
              <Link
                href={`/(auth)/sign-up`}
                className="font-psemibold text-secondary-100"
              >
                SignUp
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingIn;