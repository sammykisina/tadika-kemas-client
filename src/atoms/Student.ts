import { atom } from "recoil";

const isEditingStudentState = atom<boolean>({
  key: "isEditingStudentState",
  default: false,
});

const showCreateOrEditStudentWidgetState = atom<boolean>({
  key: "showCreateOrEditStudentWidgetState",
  default: false,
});

const showStudentFullInfoWidgetState = atom<boolean>({
  key: "showStudentFullInfoWidgetState",
  default: false,
});

const globalStudentState = atom<any | null>({
  key: "globalStudentState",
  default: null,
});

const studentAtoms = {
  isEditingStudentState,
  showCreateOrEditStudentWidgetState,
  globalStudentState,
  showStudentFullInfoWidgetState,
};

export default studentAtoms;
