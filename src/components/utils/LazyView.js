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

  state = {
    lazyViewable: false,
  };

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

  defaultLazyLoader = () => this.setState({ lazyViewable: true });

  shouldTrigger = async () => {
    if (!this.theView.current) {
      console.log("rescheduling trigger", this.props.children);
      setTimeout(this.shouldTrigger);
      return;
    }

    const {
      lazyLoader = this.defaultLazyLoader,
      lazyOffset = DEFAULT_OFFSET,
    } = this.props;
    const { pageY } = await this.measure();
    const { height } = Dimensions.get("window");

    if (pageY - lazyOffset < height) {
      lazyLoader();
      removeOnScroll(this.handle);
    }
  };

  render() {
    const { lazyLoader } = this.props;
    const { lazyViewable } = this.state;

    // default lazy loader hides children until lazy loaded
    const isDefaultLazyLoader = !lazyLoader;

    const viewable = !isDefaultLazyLoader || lazyViewable;
    if (!viewable) {
      console.log("rescheduling trigger in render", this.props.children);
      // can't call setState in render, so setTimeout
      setTimeout(this.shouldTrigger());
    }

    return (
      <View ref={this.theView} {...this.props}>
        {viewable ? this.props.children : null}
      </View>
    );
  }
}
