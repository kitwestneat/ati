import React, { PureComponent } from "react";
import { FlatList, View } from "react-native";

import ModuleListItem from "./ModuleListItem";
import * as styles from "./styles";

const PLACEHOLDER_FN = () => {};

export default class ModuleListCtl extends PureComponent {
  state = {
    currentlyEditing: -1,
  };

  renderItem = ({ item }) => (
    <ModuleListItem
      item={item}
      isEditing={item.key === this.state.currentlyEditing}
      onChange={PLACEHOLDER_FN}
      onOpenEditClick={() => this.setState({ currentlyEditing: item.key })}
      onCloseEditClick={() => this.setState({ currentlyEditing: -1 })}
    />
  );

  render() {
    const { moduleList } = this.props;
    const { currentlyEditing } = this.state;

    const watchedState = {
      currentlyEditing,
    };

    return (
      <View style={styles.centerItems}>
        <FlatList
          data={moduleList}
          renderItem={this.renderItem}
          extraData={watchedState}
        />
      </View>
    );
  }
}
