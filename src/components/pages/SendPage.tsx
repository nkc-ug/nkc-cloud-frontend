import { TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useContext } from "react";
import { FileAboutContext } from "../../App";
import InfoLayout from "../template/InfoLayout";

const SendPage: React.FC = () => {
  const { state: FileAbout } = useContext(FileAboutContext);

  return (
    <InfoLayout>
      <Typography
        textAlign='center'
        variant='h5'
        noWrap={true}
        sx={{ mb: 3 }}
      >
        ファイルの送信が完了しました！
      </Typography>
      <Stack
        direction='column'
        spacing={4}
        justifyContent='center'
        alignContent='center'
        sx={{ m: 2 }}
      >
        <Typography variant='body1'>
          {FileAbout.title === "" ? "タイトル未設定" : FileAbout.title}
        </Typography>
        <Typography variant='body1'>
          コメント　：　{FileAbout.comment === "" ? "コメント未設定" : FileAbout.comment}
        </Typography>
        <Typography variant='body1'>
          ファイル名：　{FileAbout.fileName === "" ? "" : FileAbout.fileName}
        </Typography>
        <Typography variant='body1'>
          パスワード：　
          {FileAbout.key === "0000" ? "パスワードが設定されていません" : FileAbout.key}
        </Typography>
        <Typography variant='body1'>有効期限　：　{FileAbout.limit}</Typography>
        <TextField
          value={FileAbout.url}
          variant='standard'
          sx={{ px: 2 }}
        />
      </Stack>
    </InfoLayout>
  );
};

export default SendPage;
