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

  updateItem = newItem => {
    const { moduleList, updateModuleList } = this.props;

    const idx = moduleList.findIndex(({ key }) => newItem.key == key);
    const newList = moduleList.slice(0);

    newList[idx] = newItem;

    updateModuleList({ moduleList: newList });

    this.closeEdit();
  };

  closeEdit = () => this.setState({ currentlyEditing: -1 });

  renderItem = ({ item, move, moveEnd }) => (
    <ModuleListItem
      item={item}
      isEditing={item.key === this.state.currentlyEditing}
      onChange={this.updateItem}
      onOpenEditClick={() => this.setState({ currentlyEditing: item.key })}
      onCloseEditClick={this.closeEdit}
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
