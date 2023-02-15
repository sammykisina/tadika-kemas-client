import { atom } from "recoil";

const showSidebarState = atom<boolean>({
  key: "showSidebarState",
  default: false,
});

const appAtoms = {
  showSidebarState,
};

export default appAtoms;
