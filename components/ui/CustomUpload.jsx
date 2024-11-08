import { Text, View } from "react-native";
import React from "react";

const CustomUpload = ({ title, children, value, errorMsg, showError }) => {
  return (
    <View className={`w-full mt-7`}>
      <Text className="text-base font-pmedium text-gray-100">{title}</Text>

      {children}

      {showError && !value && (
        <Text className="font-pmedium text-[red] mt-1">
          {errorMsg ? errorMsg : `${title} field is required`}
        </Text>
      )}
    </View>
  );
};

export default CustomUpload;