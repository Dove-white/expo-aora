import React from "react";
import { Tabs } from "expo-router";
import { icons } from "@/constants";
import TabBarIcon from "@/components/navigation/TabBarIcon";

const TapsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 84,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="home"
              color={color}
              focused={focused}
              icon={icons.home}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="bookmark"
        options={{
          headerShown: false,
          title: "Bookmark",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="bookmark"
              color={color}
              focused={focused}
              icon={icons.bookmark}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          headerShown: false,
          title: "Create",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="create"
              color={color}
              focused={focused}
              icon={icons.plus}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="profile"
              color={color}
              focused={focused}
              icon={icons.profile}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TapsLayout;
