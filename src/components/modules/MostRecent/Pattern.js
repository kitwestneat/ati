// @flow

import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import { CATEGORY_COLOR_MAP } from "../../../constants";

const HEADER_HEIGHT = 60;

const OFFSET = {
  LEFT: "left",
  RIGHT: "right",
};

type Props = {
  color: $Values<typeof COLOR_MAP>,
  offsetDirection?: OFFSET.LEFT | OFFSET.RIGHT,
  children: any,
};

class Pattern extends Component<Props> {
  static defaultProps = {
    offsetDirection: OFFSET.LEFT,
  };

  getOffsetStyles = () => {
    const { offsetDirection } = this.props;
    const offsetDistance = this.getOffsetDistance();

    return {
      bottom: -offsetDistance,
      [offsetDirection]: -offsetDistance,
    };
  };

  getOffsetDistance = () => {
    const OFFSET = 30;
    return OFFSET;
  };

  getGradient = () => {
    const { color } = this.props;
    const bg = "white";
    const space = 10;
    const dot = 2.5;
    const dotPercent = `${dot / space * 100}%`;
    const emptyPercent = `${100 - dot / space * 100}%`;

    return {
      backgroundColor: color,
      backgroundPosition: "center center",
      backgroundImage: `linear-gradient(90deg, ${bg} ${emptyPercent}, transparent 1%), linear-gradient(${bg} ${emptyPercent}, transparent 1%)`,
      backgroundSize: `${space}px ${space}px`,
    };
  };
  render() {
    const { style } = this.props;
    return (
      <View style={[styles.wrap]}>
        <View
          style={[
            styles.pattern,
            this.getGradient(),
            this.getOffsetStyles(),
            style,
          ]}
        />
        {this.props.children}
      </View>
    );
  }
}

export default Pattern;

const styles = StyleSheet.create({
  wrap: {
    position: "relative",
  },
  pattern: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
