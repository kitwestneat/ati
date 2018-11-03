// @flow

import { StyleSheet } from "react-native";
import { makeAdComponent } from "./Ad";
import { createMrec } from "../../utils/ads";

const styles = StyleSheet.create({
  ad: {
    width: 320,
    height: 250,
  },
});

export default makeAdComponent(createMrec, styles);
