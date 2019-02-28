// @flow

import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import { elevation } from "constants/index.js";
import { Pattern } from "components/modules";
import { LazyView } from "components/utils";

import type { RNW$Styles } from "react-native";
import type { Node } from "react";

/**
 * To Do
 * padding should be 22 on mobile
 */

const OFFSET = {
  LEFT: "left",
  RIGHT: "right",
};

type Props = {
  style?: RNW$Styles,
  children: Node,
  patternColor: CategoryColors,
  offsetDirection?: $Values<OFFSET>,
  unlazy?: boolean,
};

class ModuleBox extends PureComponent<Props> {
  static defaultProps = {
    offsetDirection: OFFSET.LEFT,
  };

  render() {
    const {
      children,
      patternColor,
      offsetDirection,
      style,
      unlazy = false,
    } = this.props;

    const ViewComponent = unlazy ? View : LazyView;

    return patternColor ? (
      <Pattern offsetDirection={offsetDirection} color={patternColor}>
        <Box style={style} ViewComponent={ViewComponent}>
          {children}
        </Box>
      </Pattern>
    ) : (
      <Box style={style} ViewComponent={ViewComponent}>
        {children}
      </Box>
    );
  }
}

export default ModuleBox;

const styles = StyleSheet.create({
  box: {
    ...elevation(1),
    padding: 30,
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "white",
  },
});

const Box = ({ children, style, ViewComponent }) => (
  <ViewComponent style={[styles.box, style]}>{children}</ViewComponent>
);
