import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({
  text,
  onPress,
  className,
  textClassName,
  loading,
  loadingText,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={` ${
        loading && "opacity-50"
      } px-[1.6rem] bg-secondary-200 rounded-lg min-h-[58px] justify-center ${className}`}
      disabled={loading}
    >
      <Text
        className={`font-psemibold text-primary text-center text-lg ${textClassName}`}
      >
        {loading ? `${loadingText || "Loading..."}` : text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
