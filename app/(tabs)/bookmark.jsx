import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import SearchField from "../../components/ui/SearchField";
import { SafeAreaView } from "react-native-safe-area-context";
import PostCard from "../../components/PostCard";
import EmptyState from "../../components/ui/EmptyState";
import useAppwrite from "../../lib/useAppwrite";
import { getSavedPosts } from "../../lib/appwrite";
import { useGlobalContext } from "../../global_store/GlobalProvider";
import { router, usePathname } from "expo-router";
import { RefreshControl } from "react-native";

const BookMark = () => {
  const { userData } = useGlobalContext();
  const { data: post, refetch } = useAppwrite(() =>
    getSavedPosts(userData.$id)
  );
  const [query, setQuery] = useState("");
  const [play, setPlay] = useState("");
  const pathname = usePathname();
  const [showOptions, setShowOptions] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [recall, setRecall] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useEffect(() => {
    if (pathname === "/bookmark") {
      refetch();
    }
  }, [pathname]);

  useEffect(() => {
    if (recall) {
      handleRefresh();
      setRecall(false);
    }
  }, [recall]);

  const filterData = post?.filter((item) =>
    item?.title?.toLowerCase().includes(query?.toLowerCase())
  );

  const darkMode = true;

  return (
    <SafeAreaView className="bg-primary h-full px-4">
      <FlatList
        data={filterData}
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
          <View className="mt-5 mb-11">
            <Text className="text-white font-psemibold text-[1.4rem]">
              Saved Videos
            </Text>

            <SearchField
              placeholder="Search your saved videos"
              disabled={true}
              newQuery={query}
              setNewQuery={setQuery}
              className="mt-7"
            />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            onPress={() => router.replace("/home")}
            actionText="Back to Explore"
            title={`No Videos Found`}
            subtitle={
              query ? `No videos found for ${query}` : `No videos Were Saved`
            }
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

export default BookMark;

const styles = StyleSheet.create({});
