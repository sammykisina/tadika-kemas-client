import type { ReactNode } from "react";

export type LoginData = {
  email: string;
  password: string;
};

export type Route = {
  inactiveIcon?: ReactNode;
  activeIcon?: ReactNode;
  name?: string | ReactNode;
  to: string;
};

export type TabsData = {
  label?: string;
  icon?: ReactNode;
  content: ReactNode;
};

export type SelectionOption = {
  name: string;
  value: string;
};

export type StudentData = {
  email: string;
  name: string;
  password: string;
  address: string;
  fartherName: string;
  fartherPhone: string;
  motherName: string;
  motherPhone: string;
  studentRegId: string;
  studentCob: string;
  selectedRace: string;
  selectedClass: string;
  dateOfBirth: string;
  dateOfEnrollment: string;
};

export type Performance = {
  type: string;
  period: string;
  year: string;
  subject: string;
  marks: number;
  comment: string;
};

export type Event = {
  name: string;
  purpose: string;
  date: string;
  time: string;
};
