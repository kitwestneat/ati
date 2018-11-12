// @flow

import React, { PureComponent } from "react";
import PageSections from "PageFactory";
import { AppWrap, Header, Footer, Main } from "./components/general";
import { Leaderboard } from "./components/ads";
import { Section } from "components/primitives";

import { SECTION_SPACERS, SECTION_SPACING_VARIANTS } from "constants/index";

import { startAds } from "./utils/ads";

type Props = {};

class App extends PureComponent<Props> {
  componentDidMount() {
    startAds();
  }

  render() {
    const data =
      process.env.NODE_ENV &&
      process.env.NODE_ENV.toLowerCase().startsWith("dev")
        ? require("./data").data
        : window.fp_data;

    if (!data) {
      throw new Error("cannot load post data");
    }

    return (
      <AppWrap>
        <Header />
        <Main>
          <Section>
            <Leaderboard />
          </Section>

          <PageSections data={data} />

          <Section
            style={{
              marginTop: SECTION_SPACERS[SECTION_SPACING_VARIANTS.LARGE],
            }}
          >
            <Leaderboard />
          </Section>

          <Footer />
        </Main>
      </AppWrap>
    );
  }
}

export default App;
