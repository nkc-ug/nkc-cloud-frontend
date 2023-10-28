import { TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FileAboutContext } from "../../App";
import axios from "../../util/axiosUtil";
import PrimaryButton from "../atom/PrimaryButton";
import InfoLayout from "../template/InfoLayout";

const DownloadPage: React.FC = () => {
  const [DownloadModalOpen, setDownloadModalOpen] = useState<boolean>(false);
  const { state: FileAbout, setState: setFileAbout } = useContext(FileAboutContext);
  let url = useLocation();

  useEffect(() => {
    getFileInfo();
  }, []);

  const getFileInfo = async () => {
    const res = await axios.get(`/api/v1/posts/${url}`);
    setFileAbout({
      ...FileAbout,
      title: res.data.title,
      comment: res.data.comment,
      fileName: res.data.fileName,
      url: res.data.url,
    });
  };

  return (
    <InfoLayout>
      <Stack
        justifyContent='center'
        direction='column'
        alignItems='center'
      >
        <Typography
          textAlign='center'
          variant='h5'
          noWrap={true}
          sx={{ mb: 8 }}
        >
          下記のファイルをダウンロードしますか？
        </Typography>
        <Stack
          spacing={4}
          sx={{ mb: 5 }}
        >
          <Typography
            variant='body1'
            textAlign='center'
          >
            {FileAbout.title === undefined ? "タイトル未設定" : FileAbout.title}
          </Typography>
          <Typography variant='body1'>
            コメント　：　{FileAbout.comment === undefined ? "コメント未設定" : FileAbout.comment}
          </Typography>
          <Typography variant='body1'>
            ファイル名：　
            {FileAbout.fileName === undefined ? "ファイル名エラー" : FileAbout.fileName}
          </Typography>
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
          />
          <Typography
            noWrap={true}
            textAlign='center'
            variant='caption'
          >
            パスワードがある場合には
            <br />
            パスワードを入力して下さい
          </Typography>
        </Stack>
        <a
          href={`/api/v1/posts/${url}/${FileAbout.key === "" ? "0000" : FileAbout.key}/download`}
          download=''
          style={{ textDecoration: "none" }}
        >
          <PrimaryButton
            state={DownloadModalOpen}
            stateAction={setDownloadModalOpen}
            label='ダウンロードする'
          />
        </a>
      </Stack>
    </InfoLayout>
  );
};

export default DownloadPage;
