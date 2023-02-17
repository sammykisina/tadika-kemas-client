import { atom } from "recoil";

const isEditingEventState = atom<boolean>({
  key: "isEditingEventState",
  default: false,
});

const showCreateOrEditEventWidgetState = atom<boolean>({
  key: "showCreateOrEditEventWidgetState",
  default: false,
});

const globalEventState = atom<null | any>({
  key: "globalEventState",
  default: null,
});

const eventAtoms = {
  isEditingEventState,
  showCreateOrEditEventWidgetState,
  globalEventState,
};

export default eventAtoms;
