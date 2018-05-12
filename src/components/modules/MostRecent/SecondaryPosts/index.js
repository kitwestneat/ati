// @flow

import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";

import type { PostList as PostListType, StyleObj } from "components/modules";

import PostListItem from "./PostListItem";

type Props = PostListType & { style?: StyleObj };
class PostList extends PureComponent<Props> {
  render() {
    const { posts, style } = this.props;
    return (
      <View style={[styles.listBox, style]}>
        {posts.map(post => <PostListItem key={post.id} post={post} />)}
      </View>
    );
  }
}

export default PostList;

const styles = StyleSheet.create({
  listBox: {
    paddingVertical: 40,
  },
});
