import type { ReactNode } from "react";

export type LoginData = {
  email: string;
  password: string;
};

export type Route = {
  inactive_icon?: ReactNode;
  active_icon?: ReactNode;
  name?: string | ReactNode;
  to: string;
};
