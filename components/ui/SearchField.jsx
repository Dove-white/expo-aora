import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../../constants";
import { Image } from "react-native";
import { router, usePathname } from "expo-router";

const SearchField = ({
  className,
  initialQuery,
  placeholder,
  disabled,
  newQuery,
  setNewQuery,
}) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View
      className={`rounded-2xl bg-black-100 border-2 border-black-200 h-[58px] w-full items-center flex-row focus-within:border-secondary px-4 relative ${className}`}
    >
      <TextInput
        className="text-white text-base font-pregular w-full h-full focus:outline-none"
        placeholder={placeholder ? placeholder : "Search for a video topic"}
        placeholderTextColor="#7b7b8b"
        value={newQuery || query}
        onChangeText={(e) => (newQuery ? setNewQuery(e) : setQuery(e))}
        autoComplete={undefined}
      />

      {!disabled && (
        <TouchableOpacity
          className="absolute right-4 top-1/2 -translate-y-1/2"
          onPress={() => {
            if (query === "")
              return Alert.alert(
                "Missing Query",
                "Please input something to search results across database"
              );

            if (pathname.startsWith("/search")) router.setParams({ query });
            else router.push(`/search/${query}`);
          }}
          disabled={disabled}
        >
          <Image
            source={icons.search}
            className="size-[20px]"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchField;

const styles = StyleSheet.create({});
