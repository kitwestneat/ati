import React, { PureComponent } from "react";
import { FlatList, Text, View } from "react-native";

function renderItem({ item }) {
  console.log("rendering item!", item);
  return <Text>{JSON.stringify(item)}</Text>;
}

export default class ModuleListCtl extends PureComponent {
  render() {
    const { moduleList } = this.props;
    console.log("moduleList", moduleList);

    return (
      <View>
        <FlatList data={moduleList} renderItem={renderItem} />
      </View>
    );
  }
}
