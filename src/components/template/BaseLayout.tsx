import { Box } from "@mui/material";
import NavBar from "../organism/NavBar";
import { FC } from "react";
import { TsxChildType } from "../../util/tsType";

const BaseLayout: FC<TsxChildType> = ({ children }) => {
  return (
    <Box sx={{ bgcolor: "primary.light" }}>
      <NavBar />
      {children}
      <Box sx={{ height: "500px" }}></Box>
    </Box>
  );
};

export default BaseLayout;
