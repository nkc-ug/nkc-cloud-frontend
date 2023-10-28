import { Button, Container, Modal, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserInfoContext } from "../../App";
import { ModalStyle } from "../../style/ModalStyle";
import axios from "../../util/axiosUtil";
import PrimaryButton from "../atom/PrimaryButton";
import InfoLayout from "../template/InfoLayout";

const LoginPage: React.FC = () => {
  const navigation = useNavigate();
  const { state: UserInfo, setState: setUserInfo } = useContext(UserInfoContext);
  const [KeyInput, setKeyInput] = useState<string>("");
  const [ErrorModalOpen, setErrorModalOpen] = useState(false);

  const SubmitLogin = async () => {
    const res = await axios.get(`/api/v1/${UserInfo.name}/${KeyInput}`);
    setUserInfo({ ...UserInfo, auth: res.data });
    if (UserInfo.auth === true) {
      navigation("/UserPage");
    } else {
      setErrorModalOpen(true);
      setUserInfo({ ...UserInfo, name: "" });
      setKeyInput("");
    }
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
          ログイン
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
          onClick={SubmitLogin}
          sx={{ p: 1 }}
        >
          <Typography
            variant='body2'
            noWrap={true}
          >
            ログインする
          </Typography>
        </Button>
        <Button
          variant='text'
          onClick={() => {
            navigation("/NewAcountPage");
          }}
        >
          <Typography
            variant='body2'
            sx={{ color: "primary.dark" }}
          >
            アカウントを作成する
          </Typography>
        </Button>
      </Stack>

      <Modal
        open={ErrorModalOpen}
        onClose={() => {
          setErrorModalOpen(!ErrorModalOpen);
        }}
      >
        <Container
          maxWidth='xs'
          sx={{ ...ModalStyle }}
        >
          <Stack sx={{ mx: 8 }}>
            <Typography
              textAlign='center'
              noWrap={true}
              sx={{ mb: 4 }}
            >
              ログインに失敗しました
              <br />
              もう一度お試し下さい。
            </Typography>
            <PrimaryButton
              label='戻る'
              state={ErrorModalOpen}
              stateAction={setErrorModalOpen}
            />
          </Stack>
        </Container>
      </Modal>
    </InfoLayout>
  );
};

export default LoginPage;
