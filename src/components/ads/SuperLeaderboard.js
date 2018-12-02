// @flow

import { StyleSheet } from "react-native";
import { makeAdComponent } from "./Ad";
import { createMrec } from "../../utils/ads";

const styles = StyleSheet.create({
  ad: {
    minWidth: 300,
    height: 250,
  },
});

export default makeAdComponent(createMrec, styles);