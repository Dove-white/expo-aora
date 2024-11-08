import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useState } from "react";
import { icons } from "../../constants";
  
  const CustomField = ({
    title,
    placeholder,
    className,
    type,
    value,
    onChangeText,
    errorMsg,
    showError,
  }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <View className={`w-full mt-7 ${className}`}>
        <Text className="text-base font-pmedium text-gray-100">{title}</Text>
  
        <View className="rounded-2xl bg-black-100 border-2 border-black-200 h-[58px] w-full items-center flex-row focus-within:border-secondary px-4 relative mt-2">
          <TextInput
            className="text-white text-base font-psemibold w-full h-full focus:outline-none"
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            value={value}
            onChangeText={onChangeText}
            autoComplete={undefined}
            keyboardType={type}
            secureTextEntry={type === "visible-password" && !showPassword}
          />
  
          {type === "visible-password" && (
            <TouchableOpacity
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onPress={() => setShowPassword(!showPassword)}
            >
              <Image
                source={showPassword ? icons.eyeHide : icons.eye}
                className="size-[20px]"
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
  
        {(showError && !value) && (
          <Text className="font-pmedium text-[red] mt-1">
            {errorMsg ? errorMsg : `${title} field is required`}
          </Text>
        )}
      </View>
    );
  };
  
  export default CustomField;
  
  const styles = StyleSheet.create({});
  