import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomField from "../../components/ui/CustomField";
import CustomUpload from "../../components/ui/CustomUpload";
import CustomButton from "../../components/ui/CustomButton";
import { icons, images } from "../../constants";
import { ResizeMode, Video } from "expo-av";
import video from "../../constants/video";
import * as DocumentPicker from "expo-document-picker";
import { useGlobalContext } from "../../global_store/GlobalProvider";
import { createVideoPost } from "../../lib/appwrite";
import { router } from "expo-router";

const Create = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);
  const { userData } = useGlobalContext();

  const [post, setPost] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: selectType === "image" ? "image/*" : "video/*",
    });

    if (!result.canceled) {
      const selectedFile = result.assets ? result.assets[0] : result;
      if (selectType === "image") {
        setPost({
          ...post,
          thumbnail: selectedFile,
        });
      }

      if (selectType === "video") {
        setPost({
          ...post,
          video: selectedFile,
        });
      }
    }

    // else {
    //   setTimeout(() => {
    //     Alert.alert("Document picked", JSON.stringify(result, null, 2));
    //   }, 100);
    // }
  };

  const handleSignUp = async () => {
    if (!post.title || !post.video || !post.thumbnail || !post.prompt) {
      return setShowError(true);
    }

    setIsSubmitting(true);

    try {
      await createVideoPost({
        ...post,
        userId: userData.$id,
      });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setPost({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full px-4">
      <ScrollView className="my-5">
        <Text className="text-white font-psemibold text-[1.4rem]">
          Upload Video
        </Text>

        <CustomField
          title="Video Title"
          type="default"
          value={post.title}
          placeholder={`Give your video a catchy title...`}
          onChangeText={(e) => setPost({ ...post, title: e })}
          showError={showError}
        />

        <CustomUpload
          value={post.video}
          title={`Upload Video`}
          showError={showError}
        >
          <TouchableOpacity
            onPress={() => openPicker("video")}
            activeOpacity={0.7}
          >
            <>
              {post.video ? (
                <Video
                  source={post.video}
                  resizeMode={ResizeMode.CONTAIN}
                  style={{
                    width: "100%",
                    height: 200,
                    backgroundColor: "#000000",
                    borderRadius: 16,
                    marginTop: 8,
                  }}
                />
              ) : (
                <View className="rounded-2xl bg-black-100 border-2 border-black-200 h-[149px] w-full items-center justify-center focus-within:border-secondary px-4 relative mt-2">
                  <View className="border border-dashed border-secondary size-[50px] justify-center items-center rounded-[10px]">
                    <Image
                      source={icons.upload}
                      resizeMode="contain"
                      className="size-[24px]"
                    />
                  </View>
                </View>
              )}
            </>
          </TouchableOpacity>
        </CustomUpload>

        <CustomUpload
          value={post.thumbnail}
          title={`Thumbnail Image`}
          showError={showError}
        >
          <TouchableOpacity
            onPress={() => openPicker("image")}
            activeOpacity={0.7}
          >
            <>
              {post.thumbnail ? (
                <ImageBackground
                  source={post.thumbnail}
                  className="w-full h-[200px] rounded-2xl mt-2 overflow-hidden shadow-lg shadow-black/40"
                  resizeMode="cover"
                />
              ) : (
                <View className="rounded-2xl bg-black-100 border-2 border-black-200 h-[58px] w-full items-center justify-center focus-within:border-secondary px-4 relative mt-2">
                  <View className="justify-center items-center rounded-[10px] flex-row">
                    <Image
                      source={icons.upload}
                      resizeMode="contain"
                      className="size-[24px]"
                    />
                    <Text className="text-gray-100 font-pmedium ml-2">
                      Choose a file
                    </Text>
                  </View>
                </View>
              )}
            </>
          </TouchableOpacity>
        </CustomUpload>

        <CustomField
          title="AI Prompt"
          type="default"
          value={post.prompt}
          placeholder={`The AI prompt of your video....`}
          onChangeText={(e) => setPost({ ...post, prompt: e })}
          showError={showError}
        />

        <CustomButton
          text="Submit & Publish"
          onPress={handleSignUp}
          loading={isSubmitting}
          loadingText="Uploading..."
          className="my-7 w-full"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
