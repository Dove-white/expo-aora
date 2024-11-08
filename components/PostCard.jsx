import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { icons, images } from "../constants";
import { ResizeMode, Video } from "expo-av";
import OptionButton from "./ui/OptionButton";
import { deletePost, toggleSave } from "../lib/appwrite";
import { useGlobalContext } from "../global_store/GlobalProvider";

const PostCard = ({
  item,
  play,
  setPlay,
  showOptions,
  setShowOptions,
  setRecall,
}) => {
  const { userData } = useGlobalContext();
  const { title, thumbnail, prompt, video_creator, video, saved } = item;

  const handleDelete = async () => {
    setShowOptions("");
    if (video_creator?.$id !== userData?.$id) {
      Alert.alert("Error", "You can't delete this post");
      return;
    }

    await deletePost(item?.$id);
    setRecall(true);
    Alert.alert("Success", "Post deleted successfully");
  };

  const saveStatus = saved ? saved.split(",") : [];

  const handleToggleSave = async () => {
    setShowOptions("");
    await toggleSave(item?.$id, userData?.$id);

    setRecall(true);
    if (saveStatus.includes(userData?.$id)) {
      Alert.alert("Success", "Post removed from bookmarks");
    } else {
      Alert.alert("Success", "Post saved to bookmarks");
    }
  };

  return (
    <View className="gap-[18px] mb-[30px]">
      <View className="flex-row justify-between gap-2 w-full">
        <View className="flex-row items-center gap-2">
          <View className="">
            <Image
              source={{ uri: video_creator?.avatar }}
              className="size-[46px] rounded-lg border-2 border-secondary-200"
              resizeMode="cover"
            />
          </View>
          <View>
            <Text className="text-white font-psemibold" numberOfLines={1}>
              {title}
            </Text>
            <Text
              className="text-xs font-pregular text-gray-100"
              numberOfLines={1}
            >
              {video_creator?.username}
            </Text>
          </View>
        </View>

        <View className="relative">
          <TouchableOpacity
            className=""
            onPress={() => {
              if (showOptions === item?.$id) {
                setShowOptions("");
              } else {
                setShowOptions(item?.$id);
              }
            }}
          >
            <Image
              source={icons.menu}
              className="size-[23px]"
              resizeMode="contain"
            />
          </TouchableOpacity>
          {showOptions === item?.$id && (
            <View className="absolute z-50 top-[80%] right-0 w-[111px] rounded-[5px] bg-black-100 border border-black-200">
              <OptionButton
                onPress={handleToggleSave}
                image={icons.bookmark}
                title={saveStatus.includes(userData?.$id) ? `Unsave` : `Save`}
              />
              <OptionButton
                onPress={handleDelete}
                image={icons.delete_icon}
                title={`Delete`}
              />
            </View>
          )}
        </View>
      </View>

      {play === item?.$id ? (
        <Video
          source={{ uri: video }}
          resizeMode={ResizeMode.CONTAIN}
          style={{
            width: "100%",
            height: 200,
            backgroundColor: "#000000",
            borderRadius: 10,
            marginTop: 18,
            marginBottom: 18,
          }}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay("");
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative"
          onPress={() => setPlay(item?.$id)}
          activeOpacity={0.7}
        >
          <ImageBackground
            source={{ uri: thumbnail }}
            className="w-full h-[200px] rounded-[10px] my-[18px] overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            resizeMode="contain"
            className="absolute size-[40px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PostCard;
