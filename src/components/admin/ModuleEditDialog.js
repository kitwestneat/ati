import React, { PureComponent } from "react";
import { Button, Text, View } from "react-native";
import Modal from "modal-react-native-web";

import ModuleTypePicker from "./ModuleTypePicker";

import * as styles from "./styles";

export default class ModuleEditDialog extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      newItem: { ...this.props.item },
    };
  }
  save = () => {
    const { onChange } = this.props;

    onChange({});
  };

  updateItem = updates =>
    this.setState(({ newItem }) => ({
      newItem: {
        ...newItem,
        ...updates,
      },
    }));

  renderInput = ({ label, input }) => {
    return (
      <View style={{ flexDirection: "column", margin: ".5rem" }}>
        <Text style={styles.label}>{label}</Text>
        {input}
      </View>
    );
  };

  render() {
    const { isVisible, item, onCancel } = this.props;

    return (
      <Modal transparent={true} visible={isVisible}>
        <View style={styles.centerItems}>
          <View
            style={{
              ...styles.card,
              width: 700,
              backgroundColor: "white",
              marginTop: "15vh",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "#666",
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                ...styles.centerItems,
              }}
            >
              {this.renderInput({
                label: "Type",
                input: (
                  <ModuleTypePicker
                    selectedValue={item.module_opts.type}
                    onValueChange={type => this.updateItem({ type })}
                  />
                ),
              })}
              <View>
                <Text>Hello World!</Text>
              </View>
              <View>
                <Text>Hello World!</Text>
              </View>
              <View>
                <Text>Hello World!</Text>
              </View>
              <View>
                <Text>Hello World!</Text>
              </View>
              <View>
                <Text>Hello World!</Text>
              </View>
              <View>
                <Text>Hello World!</Text>
              </View>
              <View style={{ flexGrow: 3 }}>
                <View style={{ flexDirection: "row", ...styles.centerItems }}>
                  <View style={{ margin: "1rem" }}>
                    <Button title="Save" onPress={this.save} />
                  </View>
                  <View style={{ margin: "1rem" }}>
                    <Button title="Cancel" color="#CCC" onPress={onCancel} />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flexGrow: 3 }} />
        </View>
      </Modal>
    );
  }
}
