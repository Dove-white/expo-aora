import { Image, Text, TouchableOpacity } from "react-native";
import React from "react";

const OptionButton = ({ image, title, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex z-50 flex-row px-[16px] py-[11px] gap-4 items-center"
      onPress={onPress}
    >
      <Image source={image} className="size-[12px]" resizeMode="contain" />
      <Text className="text-xs font-pmedium text-gray-100">{title}</Text>
    </TouchableOpacity>
  );
};

export default OptionButton;
