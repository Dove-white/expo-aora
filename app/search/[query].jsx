import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PostCard from "../../components/PostCard";
import SearchField from "../../components/ui/SearchField";
import { useLocalSearchParams } from "expo-router";
import useAppwrite from "../../lib/useAppwrite";
import { getSearchResults } from "../../lib/appwrite";
import EmptyState from "../../components/ui/EmptyState";

const Search = () => {
  const { query } = useLocalSearchParams();
  const [play, setPlay] = useState("");
  const { data: post, refetch } = useAppwrite(() => getSearchResults(query));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full px-4">
      <FlatList
        data={post}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <PostCard key={item?.$id} setPlay={setPlay} play={play} item={item} />
        )}
        ListHeaderComponent={() => (
          <View className="mt-5 mb-11">
            <View>
              <Text className="text-gray-100 font-pmedium">Search results</Text>
              <Text className="text-white font-psemibold text-2xl">
                {query}
              </Text>
            </View>

            <SearchField initialQuery={query} className="mt-7" />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={`No Videos Found`}
            subtitle={`No videos found for ${query}`}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({});
