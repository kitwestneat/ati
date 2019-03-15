import React, { PureComponent } from "react";
import { FlatList, Text, View } from "react-native";

const styles = {
  card: {
    padding: "1rem",
    borderRadius: 2,
    display: "inline-block",
    height: "300",
    margin: "1rem",
    position: "relative",
    width: 600,
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
    flex: 1,
  },
};

function queryObj2Str(query) {
  if (typeof query !== "object") {
    return false;
  }

  return Object.entries(query).reduce(
    (str, [key, value], idx) =>
      str + (idx === 0 ? "" : "&") + `${key}=${value}`,
    "",
  );
}

function renderItem({ item }) {
  const { module_opts, query } = item;
  const { type } = module_opts;

  const queryStr = queryObj2Str(query);

  return (
    <View style={styles.card}>
      <View>
        <Text>Type: {type}</Text>
      </View>
      {queryStr !== false && (
        <View>
          <Text>Query: {queryStr}</Text>
        </View>
      )}
      <View>
        <Text>{JSON.stringify(item)}</Text>
      </View>
    </View>
  );
}

export default class ModuleListCtl extends PureComponent {
  render() {
    const { moduleList } = this.props;

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FlatList data={moduleList} renderItem={renderItem} />
      </View>
    );
  }
}
