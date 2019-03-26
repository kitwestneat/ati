import React, { PureComponent } from "react";
import { View } from "react-native";
import DraggableFlatList from "third-party/react-native-draggable-flatlist";

import ModuleListItem from "./ModuleListItem";
import * as styles from "./styles";

const PLACEHOLDER_FN = () => {};

export default class ModuleListCtl extends PureComponent {
  state = {
    currentlyEditing: -1,
  };

  renderItem = ({ item, move, moveEnd }) => (
    <ModuleListItem
      item={item}
      isEditing={item.key === this.state.currentlyEditing}
      onChange={PLACEHOLDER_FN}
      onOpenEditClick={() => this.setState({ currentlyEditing: item.key })}
      onCloseEditClick={() => this.setState({ currentlyEditing: -1 })}
      onMove={move}
      onMoveEnd={moveEnd}
    />
  );

  render() {
    const { moduleList, updateModuleList } = this.props;
    const { currentlyEditing } = this.state;

    const watchedState = {
      currentlyEditing,
    };

    return (
      <View style={styles.centerItems}>
        <DraggableFlatList
          data={moduleList}
          renderItem={this.renderItem}
          extraData={watchedState}
          onMoveEnd={({ data }) => updateModuleList({ moduleList: data })}
        />
      </View>
    );
  }
}
