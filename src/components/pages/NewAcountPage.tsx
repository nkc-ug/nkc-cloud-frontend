import { Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserInfoContext } from "../../App";
import axios from "../../util/axiosUtil";
import InfoLayout from "../template/InfoLayout";

const NewAcountPage: React.FC = () => {
  const navigation = useNavigate();
  const { state: UserInfo, setState: setUserInfo } = useContext(UserInfoContext);
  const [KeyInput, setKeyInput] = useState<string>("");

  const SubmitNewAcount = async () => {
    const res = await axios.get(`/api/v1/${UserInfo.name}/${KeyInput}`);
    setUserInfo({ ...UserInfo, auth: true, userID: res.data.userID });
    navigation("/UserPage");
  };

  return (
    <InfoLayout>
      <Stack
        direction='column'
        spacing={2}
        justifyContent='center'
        alignContent='center'
        sx={{ px: 8 }}
      >
        <Typography
          variant='h5'
          sx={{ textAlign: "center", mb: 3 }}
        >
          新しいアカウントを作成する
        </Typography>
        <TextField
          value={UserInfo.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUserInfo({ ...UserInfo, name: e.target.value });
          }}
          id='username'
          label='ユーザ名'
          variant='outlined'
          autoComplete='off'
        />
        <TextField
          sx={{ pb: 2 }}
          value={KeyInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setKeyInput(e.target.value);
          }}
          type='password'
          id='pasward'
          label='パスワード'
          variant='outlined'
          autoComplete='off'
        />
        <Button
          variant='contained'
          onClick={SubmitNewAcount}
          sx={{ p: 1 }}
        >
          <Typography
            variant='body2'
            noWrap={true}
          >
            アカウントを作成
          </Typography>
        </Button>
      </Stack>
    </InfoLayout>
  );
};

export default NewAcountPage;
