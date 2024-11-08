import React from "react";
import { Tabs } from "expo-router";
import { icons } from "../../constants";
import TabBarIcon from "../../components/navigation/TabBarIcon";
import { StatusBar } from "expo-status-bar";

const TapsLayout = () => {
  const navList = [
    {
      name: "home",
      title: "Home",
      icon: icons.home,
    },
    {
      name: "bookmark",
      title: "Bookmark",
      icon: icons.bookmark,
    },
    {
      name: "create",
      title: "Create",
      icon: icons.plus,
    },
    {
      name: "profile",
      title: "Profile",
      icon: icons.profile,
    },
  ];

  return (
    <>
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
        {navList.map((item, index) => (
          <Tabs.Screen
            key={index}
            name={item.name}
            options={{
              headerShown: false,
              title: item.title,
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={item.title}
                  color={color}
                  icon={item.icon}
                  focused={focused}
                />
              ),
            }}
          />
        ))}
      </Tabs>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default TapsLayout;
