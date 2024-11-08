import {
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { icons } from "../constants";
import { ResizeMode, Video } from "expo-av";
import * as Animatable from "react-native-animatable";

const TrendingItem = ({ item, activeItem, index, isLoading }) => {
  const [play, setPlay] = useState(false);

  const zoomIn = {
    0: {
      scale: 0.9,
    },
    1: {
      scale: 1.2,
    },
  };

  const zoomOut = {
    0: {
      scale: 1.2,
    },
    1: {
      scale: 0.9,
    },
  };

  useEffect(() => {
    // Ensure animation runs only if activeItem changes
    if (activeItem !== item?.$id) {
      setPlay(false);
    }
  }, [activeItem]);

  return (
    <Animatable.View
      animation={activeItem === item?.$id ? zoomIn : zoomOut}
      duration={500}
      delay={500}
      className={`mr-5 mt-2`}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          resizeMode={ResizeMode.CONTAIN}
          style={{
            width: 148,
            height: 236,
            backgroundColor: "#000000",
            borderRadius: 14,
            marginTop: 32,
            marginBottom: 32,
          }}
          // useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative"
          onPress={() => setPlay(!play)}
          activeOpacity={0.7}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-[148px] h-[236px] rounded-[14px] my-[32px] overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            resizeMode="contain"
            className="absolute size-[40px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ item, isLoading }) => {
  const [activeItem, setActiveItem] = useState(item[1]);

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={item}
      contentContainerStyle={{
        paddingHorizontal: 140,
      }}
      keyExtractor={(item) => item?.$id}
      renderItem={({ item, index }) => (
        <TrendingItem
          key={item?.$id}
          activeItem={activeItem}
          index={index}
          item={item}
          isLoading={isLoading}
        />
      )}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{ viewAreaCoveragePercentThreshold: 90 }}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentOffset={{ x: 180 }}
    />
  );
};

export default Trending;
