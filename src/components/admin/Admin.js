import React, { PureComponent } from "react";
import PageSections from "PageFactory";
import { Button, View } from "react-native";

import { ResponsiveProvider } from "components/utils";
import { generateFakeData } from "./admin-utils";
import ModuleListCtl from "./ModuleListCtl";

export default class Admin extends PureComponent {
  constructor(props) {
    super(props);

    window.disableLazyLoad = true;

    // load initial data from props, but ignore after
    this.state = { moduleList: this.props.moduleList, isPreview: false };
  }

  render() {
    const { moduleList, isPreview } = this.state;

    const data = moduleList.map(generateFakeData);
    console.log("isPreview", isPreview);

    return (
      <View>
        <Button
          onPress={() => this.setState({ isPreview: !isPreview })}
          title={isPreview ? "Close" : "Preview"}
        />
        {!isPreview ? (
          <ModuleListCtl moduleList={moduleList} />
        ) : (
          <View>
            <ResponsiveProvider>
              <PageSections data={data} />
            </ResponsiveProvider>
          </View>
        )}
      </View>
    );
  }
}
