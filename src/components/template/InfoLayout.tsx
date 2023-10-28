import { Box, Stack } from "@mui/material";
import { TsxChildType } from "../../util/tsType";
import { FC } from "react";
import NavBar from "../organism/NavBar";

const InfoLayout: FC<TsxChildType> = ({ children }) => {
  return (
    <>
      <NavBar />
      <Stack
        justifyContent='center'
        direction='row'
        sx={{ mt: 8 }}
      >
        <Box sx={{ mx: 3, p: 8, borderRadius: 2, bgcolor: "secondary.main", boxShadow: 1 }}>
          {children}
        </Box>
      </Stack>
    </>
  );
};

export default InfoLayout;
