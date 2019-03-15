import React, { PureComponent } from "react";
import { Button, Text, View } from "react-native";

import { queryObj2Str } from "./admin-utils";
import ModuleEditDialog from "./ModuleEditDialog";

import * as styles from "./styles";

function renderSectionOptions(moduleOpts) {
  const { sectionLink, sectionColor, sectionTitle } = moduleOpts;
  return (
    <>
      <View>
        <Text>Section Link: {sectionLink}</Text>
      </View>
      <View>
        <Text>Section Color: {sectionColor}</Text>
      </View>
      <View>
        <Text>Section Title: {sectionTitle}</Text>
      </View>
    </>
  );
}

function renderModuleSpecificOpts(moduleOpts) {
  switch (moduleOpts.type) {
    default:
      console.error("Unknown module type:", moduleOpts.type);
    case "recent":
    case "instagram":
    case "newsletter":
      return null;
    case "trending":
      return renderSectionOptions(moduleOpts);
    case "tagTileBox":
      const sectionOpts = renderSectionOptions(moduleOpts);
      const { order } = moduleOpts;

      return (
        <>
          {sectionOpts}
          <View>
            <Text>2x Box on Bottom?: {order === 2 ? "yes" : "no"}</Text>
          </View>
        </>
      );
  }
}

export default class ModuleListItem extends PureComponent {
  render() {
    const {
      item,
      isEditing,
      onChange,
      onOpenEditClick,
      onCloseEditClick,
    } = this.props;
    const { module_opts, query } = item;
    const { type } = module_opts;
    const moduleOptsBox = renderModuleSpecificOpts(module_opts);

    const queryStr = queryObj2Str(query);

    return (
      <View style={styles.card}>
        <View>
          <Text>Type: {type}</Text>
        </View>
        {moduleOptsBox}
        {queryStr !== false && (
          <View>
            <Text>Query: {queryStr}</Text>
          </View>
        )}
        <View>
          <Text>{JSON.stringify(item)}</Text>
        </View>
        <View style={{ margin: "1rem" }}>
          <Button title="EDIT" onPress={onOpenEditClick} />
        </View>
        {isEditing && (
          <ModuleEditDialog
            isVisible={true}
            onChange={onChange}
            onCancel={onCloseEditClick}
            item={item}
          />
        )}
      </View>
    );
  }
}
