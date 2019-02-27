import { AD_TYPES } from "./ad-constants";
import MakeAdComponent from "./MakeAdComponent";
import MakeResponsiveAdComponent from "./MakeResponsiveAdComponent";

const {
  MOBILE_MREC,
  EMBEDDED_MREC,
  EMBEDDED_LEADERBOARD,
  SUPER_LEADERBOARD,
} = AD_TYPES;

export const Mrec = MakeAdComponent(EMBEDDED_MREC);
export const Leaderboard = MakeAdComponent(EMBEDDED_LEADERBOARD);

export const SuperLeaderboard = MakeAdComponent(SUPER_LEADERBOARD);
export const MobileMrec = MakeAdComponent(MOBILE_MREC);
export const ResponsiveSuperLeaderboard = MakeResponsiveAdComponent({
  MobileAd: MobileMrec,
  DesktopAd: SuperLeaderboard,
});
