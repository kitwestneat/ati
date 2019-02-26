import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "components/primitives";

const SocialLinks = ({ links }) => {
  return (
    <View style={[styles.tagLinks]}>
      {links.map(({ text, href, iconComponent: Icon }) => (
        <View key={text} style={styles.linkItem}>
          <Text accessibilityRole="link" href={href}>
            <Icon fill="white" />
          </Text>
        </View>
      ))}
    </View>
  );
};

export default SocialLinks;

const styles = StyleSheet.create({
  tagLinks: {
    flexDirection: "row",
  },
  linkItem: {
    paddingHorizontal: 15,
  },
});
