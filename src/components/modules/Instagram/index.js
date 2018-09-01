import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import { Container } from "components/primitives";
import { ModuleBox } from "components/modules";
import Carousel from "./Carousel";
import Title from "./Title";
import InstagramButton from "./InstagramButton";

// import { Responsive } from "components/utils";
// import { BREAKPOINTS } from "constants/index";

export default class Instagram extends PureComponent {
  render() {
    const { posts } = this.props;
    return (
      <Container type="content">
        <ModuleBox style={styles.moduleBox}>
          <View style={styles.row}>
            <View>
              <Title />
            </View>

            <View>
              <InstagramButton />
            </View>
          </View>

          <Carousel posts={posts} />
        </ModuleBox>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  moduleBox: {
    paddingHorizontal: 75,
    paddingVertical: 45,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
});
