import {
  Box,
  Button,
  CircularProgress,
  Container,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import homeRightPic from "../../img/homeRightPic.png";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import SecondaryButton from "../atom/SecondaryButton";
import PrimaryButton from "../atom/PrimaryButton";
import axios from "../../util/axiosUtil";
import { FileAboutContext } from "../../App";
import { ModalStyle } from "../../style/ModalStyle";
import BaseLayout from "../template/BaseLayout";

const HomePage: React.FC = () => {
  const navigation = useNavigate();

  const [AddFileModalOpen, setAddFileModalOpen] = useState<boolean>(false);
  const [SendModalOpen, setSendModalOpen] = useState<boolean>(false);
  const [ErrorModalOpen, setErrorModalOpen] = useState<boolean>(false);

  const [AddFileList, setAddFileList] = useState<File>({} as File);

  const { state: FileAbout, setState: setFileAbout } = useContext(FileAboutContext);

  const addFileComplete = async () => {
    setAddFileModalOpen(!AddFileModalOpen);
    setSendModalOpen(!SendModalOpen);
    deleteFile();
    try {
      const res = await axios.post(`api/v1/posts`, {
        title: FileAbout.title,
        comment: FileAbout.comment,
        key: FileAbout.key,
        fileData: AddFileList,
      });
      setSendModalOpen(!setSendModalOpen);
      setFileAbout({
        ...FileAbout,
        fileName: res.data.fileName,
        limit: res.data.limit,
        url: res.data.url,
      });
      if (FileAbout.key === "") {
        setFileAbout({ ...FileAbout, key: "0000" });
      }
      navigation("/SendPage");
    } catch (e) {
      setSendModalOpen(false);
      setErrorModalOpen(!ErrorModalOpen);
    }
  };

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileTemp = e.target.files!;
    const fileTemp2 = fileTemp[0];
    setAddFileList(fileTemp2);
    setFileAbout({ ...FileAbout, title: fileTemp2.name });
  };

  const deleteFile = () => {
    setAddFileList({} as File);
    setFileAbout({ ...FileAbout, title: "" });
  };

  const titleText = (
    <>
      今すぐに、
      <br />
      ファイルを共有
      <br />
      ただそれだけ。
    </>
  );

  const subTitleText = (
    <>
      ファイルの容量制限や、煩雑な権限管理に縛られず
      <br />
      生成したURLをクリックして即ファイルをダウンロード。
    </>
  );

  return (
    <>
      <BaseLayout>
        {/* forPC */}
        <Stack alignItems='center'>
          <Stack
            direction='row'
            alignItems='center'
            sx={{ mt: 13, display: { xs: "none", md: "flex" } }}
          >
            <Box>
              <Typography
                variant='h2'
                noWrap={true}
                sx={{ color: "secondary.main", lineHeight: "1.5" }}
              >
                {titleText}
              </Typography>
              <Typography
                variant='subtitle2'
                noWrap={true}
                sx={{ color: "secondary.dark", lineHeight: "2", mt: 2 }}
              >
                {subTitleText}
              </Typography>
              <Box sx={{ mt: 3 }}>
                <SecondaryButton
                  state={AddFileModalOpen}
                  stateAction={setAddFileModalOpen}
                  icon={<DriveFileMoveIcon />}
                  label='ファイルを登録'
                />
              </Box>
            </Box>
            <Box sx={{ ml: 8, p: 3, boxShadow: 2, borderRadius: 5, bgcolor: "secondary.main" }}>
              <img
                src={homeRightPic}
                alt='イメージ画像'
              />
            </Box>
          </Stack>
        </Stack>
        {/* forPhone */}
        <Stack
          direction='column'
          sx={{ display: { sx: "flex", md: "none" } }}
        >
          <Box sx={{ mx: 4, my: 2 }}>
            <Box sx={{ mt: 3, mb: 2 }}>
              <Typography
                variant='h4'
                sx={{ color: "secondary.main", lineHeight: "1.5" }}
              >
                {titleText}
              </Typography>
            </Box>
            <Typography
              variant='subtitle2'
              sx={{ color: "secondary.dark", lineHeight: "2" }}
            >
              {subTitleText}
            </Typography>
            <Stack
              justifyContent='center'
              sx={{ mx: 8, mt: 3 }}
            >
              <SecondaryButton
                state={AddFileModalOpen}
                stateAction={setAddFileModalOpen}
                icon={<DriveFileMoveIcon />}
                label='ファイルを登録'
              />
            </Stack>
            <Box sx={{ mt: 5, p: 3, boxShadow: 2, borderRadius: 5, bgcolor: "secondary.main" }}>
              <img
                src={homeRightPic}
                alt='イメージ画像'
                width='100%'
              />
            </Box>
          </Box>
        </Stack>
        {/*ここの br　は後で消す */}
        <div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </BaseLayout>

      {/* AddFileModal */}
      <Modal
        open={AddFileModalOpen}
        onClose={() => {
          setAddFileModalOpen(!AddFileModalOpen);
        }}
      >
        <Container
          maxWidth='xs'
          sx={{ ...ModalStyle }}
        >
          <Stack sx={{ mx: 8 }}>
            <Box sx={{ mb: 4 }}>
              <Typography
                textAlign='center'
                noWrap={true}
                sx={{ mb: 0.5 }}
              >
                選択済みのファイル
              </Typography>
              <Box
                border='solid 0.5px'
                height='80px'
                borderRadius={2}
              >
                <Stack
                  direction='column'
                  sx={{ mt: 3 }}
                >
                  <Typography textAlign='center'>{AddFileList.name}</Typography>
                </Stack>
              </Box>
            </Box>
            <Stack
              justifyContent='center'
              direction='row'
              sx={{ mb: 3 }}
            >
              <label htmlFor='uploadButton'>
                <Stack justifyContent='center'>
                  <Button
                    variant='outlined'
                    component='span'
                  >
                    <Typography
                      variant='body1'
                      noWrap={true}
                    >
                      {AddFileList.name == null ? "追加する" : "変更する"}
                    </Typography>
                  </Button>
                </Stack>
                <input
                  id='uploadButton'
                  type='file'
                  style={{ display: "none" }}
                  onChange={selectFile}
                />
              </label>
            </Stack>
            <Stack direction='column'>
              <TextField
                value={FileAbout.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFileAbout({ ...FileAbout, title: e.target.value });
                }}
                id='title'
                label='タイトル'
                variant='outlined'
                autoComplete='off'
                sx={{ mb: 2 }}
              />
              <TextField
                value={FileAbout.comment}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFileAbout({ ...FileAbout, comment: e.target.value });
                }}
                id='comment'
                label='コメント'
                variant='outlined'
                autoComplete='off'
                sx={{ mb: 2 }}
              />
              <TextField
                value={FileAbout.key}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFileAbout({ ...FileAbout, key: e.target.value });
                }}
                type='password'
                id='pasward'
                label='パスワード'
                variant='outlined'
                autoComplete='off'
                sx={{ mb: 1 }}
              />
              <Typography
                noWrap={true}
                textAlign='center'
                variant='caption'
                sx={{ mb: 2 }}
              >
                パスワード・コメントが必要ない場合は
                <br />
                未入力のまま送信できます。
              </Typography>
              <PrimaryButton
                label='決定'
                stateAction={addFileComplete}
              />
            </Stack>
          </Stack>
        </Container>
      </Modal>

      {/* SendModal */}
      <Modal
        open={SendModalOpen}
        onClose={() => {
          setSendModalOpen(!SendModalOpen);
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
              sx={{ mb: 0.5 }}
            >
              ファイルをアップロードしています
            </Typography>
            <Stack
              justifyContent='center'
              direction='row'
            >
              <CircularProgress sx={{ m: 3 }} />
            </Stack>
          </Stack>
        </Container>
      </Modal>

      {/* SendModal */}
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
              アップロードに失敗しました
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
    </>
  );
};

export default HomePage;
