import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router, usePathname } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchField from "../../components/ui/SearchField";
import Trending from "../../components/Trending";
import PostCard from "../../components/PostCard";
import EmptyState from "../../components/ui/EmptyState";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import { useGlobalContext } from "../../global_store/GlobalProvider";

const Home = () => {
  const { isLoading, data: post, refetch } = useAppwrite(getAllPosts);
  const { data: latest, refetch: refetchLatest } = useAppwrite(getLatestPosts);
  const [refreshing, setRefreshing] = useState(false);
  const [play, setPlay] = useState("");
  const [showOptions, setShowOptions] = useState("");
  const [recall, setRecall] = useState(false);
  const { userData } = useGlobalContext();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/home") {
      refetchLatest();
      refetch();
    }
  }, [pathname]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetchLatest();
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
          <View className="mb-11 mt-5">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-gray-100 font-pmedium">
                  Welcome back,
                </Text>
                <Text className="text-white font-psemibold text-2xl">
                  {userData?.username}
                </Text>
              </View>
              <View>
                <Image
                  source={images.logoSmall}
                  className="w-[30px] h-[34px]"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchField className="mt-7" />

            <Text className="text-gray-100 font-pmedium mt-7">
              Trending Videos
            </Text>

            <Trending isLoading={isLoading} item={latest} />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            onPress={() => router.push("/create")}
            title={`No Videos Found`}
            subtitle={`Be the first one to upload a video`}
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

export default Home;
