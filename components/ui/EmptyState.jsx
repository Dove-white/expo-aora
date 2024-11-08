import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { images } from "../../constants";
import CustomButton from "./CustomButton";

const EmptyState = ({ title, subtitle, onPress, actionText }) => {
  return (
    <View className="items-center mb-16">
      <Image
        source={images.empty}
        className="w-full h-[13rem]"
        resizeMode="cover"
      />
      <Text className="text-white text-xl font-psemibold">{title}</Text>
      <Text className="text-gray-100 font-pmedium">{subtitle}</Text>

      <CustomButton
        onPress={onPress}
        text={actionText || `Create video`}
        className={`w-full mt-7`}
      />
    </View>
  );
};

export default EmptyState;
