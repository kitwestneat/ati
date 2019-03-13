import { getCreateAdFuncForType } from "./getCreateAdFuncForType";
import { getAdId } from "./getAdId";

/**
 * getIdFromGlobalAdRegistration
 *
 * Registers instance of PBH ad function for given ad type and returns the
 * associated ID. Used in the MakeAdComponent HOC.
 *
 * @param {String} adType - the type of add from the AD_TYPE enum in constants
 * @returns {String} id
 */
export const registerAd = adType => {
  const adFunc = getCreateAdFuncForType(adType);

  if (!adFunc) {
    return;
  }

  const adId = getAdId();

  registerAdFunctionWithId(adFunc, adId);

  return adId;
};

/**
 * startAds
 *
 * Appends pbh_start_ads to the end of the PbhAdUnit_load queue array.
 * Used in the App component's componentDidMount method
 */
export const startAds = () => {
  registerAdLoadCallback(window.pbh_start_ads);
};

/**
 * displayAd
 *
 * Appends display function for the ad instance to the end of the PbhAdUnit_cmd
 * queue array.
 * Used in the MakeAdComponent HOC's componentDidMount method
 */
export const displayAd = adId => {
  registerAdCommand(() => {
    try {
      window.pbh_ad_units[adId].display();
    } catch (e) {
      console.error("error displaying ad", adId);
    }
  });
};

/**
 * registerAdFunctionWithId
 *
 * Appends create function to the PbhAdUnit_load queue array
 * @param {Function} adFunc
 * @param {String} adId
 */
const registerAdFunctionWithId = (adFunc, adId) => {
  registerAdLoadCallback(() => adFunc(adId));
};

function registerAdLoadCallback(cb) {
  window.PbhAdUnit_load = window.PbhAdUnit_load || [];

  window.PbhAdUnit_load.push(cb);
}

function registerAdCommand(cb) {
  window.PbhAdUnit_cmd = window.PbhAdUnit_cmd || [];

  window.PbhAdUnit_cmd.push(cb);
}
