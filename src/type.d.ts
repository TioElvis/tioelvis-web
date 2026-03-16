import type { Icon } from "@tabler/icons-react";

export type Response<T> = {
  message: string;
  data: T;
  success: boolean;
};

export type Ability = {
  name: string;
  description: string;
  Icon: Icon;
};
