// @flow

import React, { PureComponent } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

import { Container, Image } from "components/primitives";
import { Responsive } from "components/utils";

import Callout from "./Callout";
import EmailInput from "./EmailInput";

import { subscribe } from "./subscribe";

import { COLOR_MAP, BREAKPOINTS } from "constants/index";

const ASYNC_STATES = {
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  DEFAULT: "DEFAULT",
};

type Props = {};
type State = {
  submissionStatus: $Values<typeof ASYNC_STATES>,
  email: string,
};

const COPY = {
  SUCCESS: "Thank you for subscribing to our newsletter!",
  ERROR:
    "There was an error subscribing to the newsletter. Please try again later.",
};

class Newsletter extends PureComponent<Props, State> {
  state = {
    email: "",
    submissionStatus: ASYNC_STATES.DEFAULT,
  };

  setEmail = (email: string) => this.setState({ email });

  signUp = async () => {
    const { email } = this.state;
    if (!email) {
      return;
    }

    this.setState({ submissionStatus: ASYNC_STATES.LOADING });

    const { status } = await subscribe(email);

    this.setState({
      submissionStatus:
        status === 200 ? ASYNC_STATES.SUCCESS : ASYNC_STATES.ERROR,
    });
  };

  renderLoading = () => <ActivityIndicator size="large" color="white" />;

  renderSuccess = () => (
    <Text style={[styles.successMsg]}>
      <FaCheckCircle />
      {COPY.SUCCESS}
    </Text>
  );

  renderError = () => (
    <Text style={[styles.errorMsg]}>
      <FaExclamationTriangle />
      {COPY.ERROR}
    </Text>
  );

  renderForm = () => {
    const { email } = this.state;

    return (
      <React.Fragment>
        <Callout />
        <View style={styles.signupWrap}>
          <EmailInput
            signUp={this.signUp}
            email={email}
            setEmail={this.setEmail}
          />
        </View>
      </React.Fragment>
    );
  };

  renderBySubmissionStatus = submissionStatus => {
    const MAP = {
      [ASYNC_STATES.DEFAULT]: this.renderForm(),
      [ASYNC_STATES.LOADING]: this.renderLoading(),
      [ASYNC_STATES.SUCCESS]: this.renderSuccess(),
      [ASYNC_STATES.ERROR]: this.renderError(),
    };
    return MAP[submissionStatus];
  };

  render() {
    const { submissionStatus } = this.state;

    const curView = this.renderBySubmissionStatus(submissionStatus);

    return (
      <Responsive>
        {({ width }) => {
          return (
            <View style={styles.wrap}>
              <Container
                type="content"
                style={[
                  width > BREAKPOINTS.MD
                    ? styles.container
                    : { paddingVertical: 30, width: 448, maxWidth: "100%" },
                ]}
              >
                <View
                  style={[
                    styles.column,
                    width > BREAKPOINTS.MD
                      ? {
                          justifyContent: "flex-end",
                          alignItems: "flex-end",
                          paddingTop: "5%",
                        }
                      : { alignItems: "center" },
                  ]}
                >
                  <View style={styles.imageWrap}>
                    <Image
                      width={332}
                      height={260}
                      resizeMode="contain"
                      source={{ uri: require("assets/images/newsletter.png") }}
                    />
                  </View>
                </View>
                <View style={styles.column}>{curView}</View>
              </Container>
            </View>
          );
        }}
      </Responsive>
    );
  }
}

export default Newsletter;

const styles = StyleSheet.create({
  signupWrap: {
    marginTop: 20,
    position: "relative",
  },
  wrap: {
    backgroundColor: COLOR_MAP.BLUE,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  imageWrap: {
    maxWidth: 332,
    width: "100%",
  },
  column: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  errorMsg: {
    color: "white",
    fontSize: 30,
    lineHeight: 40,
    fontWeight: "600",
  },
  successMsg: {
    color: "white",
    fontSize: 24,
    lineHeight: 31,
    fontWeight: "300",
  },
});
