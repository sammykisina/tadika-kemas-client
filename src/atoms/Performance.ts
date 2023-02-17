import { atom } from "recoil";

const isEditingPerformanceState = atom<boolean>({
  key: "isEditingPerformanceState",
  default: false,
});

const showCreateOrEditPerformanceWidgetState = atom<boolean>({
  key: "showCreateOrEditPerformanceWidgetState",
  default: false,
});

const globalPerformanceState = atom<null | any>({
  key: "globalPerformanceState",
  default: null,
});

const performanceAtoms = {
  isEditingPerformanceState,
  showCreateOrEditPerformanceWidgetState,
  globalPerformanceState,
};

export default performanceAtoms;
