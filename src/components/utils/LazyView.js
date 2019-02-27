import React from "react";
import { Dimensions, View } from "react-native";

const DEFAULT_OFFSET = 800;

const onScrollCbs = {};
function addOnScroll(f) {
  const handle = Date.now();
  onScrollCbs[handle] = f;

  return handle;
}

function removeOnScroll(handle) {
  delete onScrollCbs[handle];
}

function onScroll() {
  Object.values(onScrollCbs).forEach(cb => cb());
}

export default class LazyView extends React.PureComponent {
  static onScroll = onScroll;

  constructor(props) {
    super(props);

    this.theView = React.createRef();
    this.handle = addOnScroll(this.shouldTrigger);
  }

  componentDidMount() {
    this.shouldTrigger();
  }

  measure = () =>
    new Promise(resolve =>
      this.theView.current.measure((x, y, width, height, pageX, pageY) =>
        resolve({ x, y, width, height, pageX, pageY }),
      ),
    );

  shouldTrigger = async () => {
    if (!this.theView.current) {
      return;
    }

    const { lazyLoader, lazyOffset = DEFAULT_OFFSET } = this.props;
    const { pageY } = await this.measure();
    const { height } = Dimensions.get("window");

    if (pageY - lazyOffset < height) {
      console.log("calling lazyLoader");
      lazyLoader();
      removeOnScroll(this.handle);
    }
  };

  render() {
    return (
      <View ref={this.theView} {...this.props}>
        {this.props.children}
      </View>
    );
  }
}
