import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React, { ReactNode } from "react";

export type TsxChildType = {
  children: ReactNode;
};

export type ButtonType = {
  state: boolean;
  stateAction: React.SetStateAction<boolean>;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  label: String;
};

export type FileAboutType = {
  title: string;
  comment: string;
  fileName: string;
  key: string;
  limit: string;
  url: string;
};

export type FileAboutContextType = {
  state: FileAboutType;
  setState: React.Dispatch<React.SetStateAction<FileAboutType>>;
};

export type UserInfoType = {
  auth: boolean;
  userID: string;
  name: string;
};

export type UserInfoContextType = {
  state: UserInfoType;
  setState: React.Dispatch<React.SetStateAction<UserInfoType>>;
};
