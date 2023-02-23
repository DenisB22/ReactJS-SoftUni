import { TabPanelOne } from "./TabPanelOne";
import { TabPanelThree } from "./TabPanelThree";
import { TabPanelTwo } from "./TabPanelTwo";

export default function TabPanes() {
  return (
    <div className="tab-content">
      <TabPanelOne />
      <TabPanelTwo />
      <TabPanelThree />
    </div>
  );
}
