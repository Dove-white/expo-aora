import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PostCard from "../../components/PostCard";
import EmptyState from "../../components/ui/EmptyState";
import { getUserPosts, signOut } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import { icons, images } from "../../constants";
import { useGlobalContext } from "../../global_store/GlobalProvider";
import { router, usePathname } from "expo-router";

const Profile = () => {
  const [play, setPlay] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [showOptions, setShowOptions] = useState("");
  const [recall, setRecall] = useState(false);
  const { userData, setUserData, setIsLoggedIn } = useGlobalContext();
  const { data: post, refetch } = useAppwrite(() =>
    getUserPosts(userData?.$id)
  );

  const handleLogout = async () => {
    await signOut();
    setUserData(null);
    setIsLoggedIn(false);

    router.push("/sign-in");
  };

  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/profile") refetch();
  }, [pathname]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useEffect(() => {
    if (recall) {
      handleRefresh();
      setRecall(false);
    }
  }, [recall]);

  const darkMode = true;

  return (
    <SafeAreaView className="bg-primary h-full px-4">
      <FlatList
        data={post}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <PostCard
            key={item?.$id}
            setPlay={setPlay}
            play={play}
            item={item}
            showOptions={showOptions}
            setShowOptions={setShowOptions}
            setRecall={setRecall}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-5">
            <View className="items-end w-full">
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleLogout}
                className="align-self-end"
              >
                <Image
                  source={icons.logout}
                  style={{ width: 24, height: 24 }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View>
            <View className="items-center w-full">
              <Image
                source={{ uri: userData?.avatar }}
                style={{ width: 60, height: 60 }}
                className="rounded-lg border-2 border-secondary-200"
                resizeMode="cover"
              />

              <Text
                style={{ marginTop: 12 }}
                className="text-white font-psemibold text-lg"
              >
                {userData?.username}
              </Text>
            </View>

            <View
              style={{ gap: 30, marginTop: 16 }}
              className="flex-row justify-center w-full"
            >
              <View className="items-center">
                <Text className="text-white font-psemibold text-xl">
                  {post?.length || 0}
                </Text>
                <Text className="text-gray-100 font-pregular">Posts</Text>
              </View>
              <View className="items-center">
                <Text className="text-white font-psemibold text-xl">1.2k</Text>
                <Text className="text-gray-100 font-pregular">Views</Text>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            onPress={() => router.push("/create")}
            title={`No Videos Found`}
            subtitle={`No videos found for this profile`}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={darkMode ? "#ffffff" : "#000000"}
            colors={darkMode ? ["#ffffff"] : ["#000000"]}
            progressBackgroundColor={darkMode ? "#333333" : "#f5f5f5"}
          />
        }
      />
    </SafeAreaView>
  );
};

export default Profile;
