import { AppBar, Button, Container, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useContext, useState } from "react";
import logo from "../../img/logo.png";
import { FileAboutContext } from "../../App";

const NavBar: React.FC = () => {
  const navigation = useNavigate();
  const [ModalOpen, setModalOpen] = useState<boolean>(false);
  const { setState: setFileAbout } = useContext(FileAboutContext);

  const chengeUser = () => {
    deleteFileInfo();
    navigation("/LoginPage");
  };

  const chengeHome = () => {
    deleteFileInfo();
    navigation("/");
  };

  const AppBarItemList = [
    {
      text: "NKC-Cloudとは",
      action: () => {
        deleteFileInfo();
        navigation("/");
      },
    },
    {
      text: "使い方",
      action: () => {
        deleteFileInfo();
        navigation("/");
      },
    },
  ];

  const deleteFileInfo = () => {
    setFileAbout({
      title: "",
      comment: "",
      fileName: "",
      key: "",
      limit: "",
      url: "",
    });
  };

  return (
    <AppBar
      position='static'
      sx={{ bgcolor: "secondary.main" }}
    >
      {/* forPC */}
      <Container maxWidth='xl'>
        <Toolbar sx={{ display: { xs: "none", md: "flex" } }}>
          <Button
            onClick={chengeHome}
            sx={{ my: 1 }}
          >
            <img
              src={logo}
              alt='logo'
              width={120}
            />
          </Button>
          <Box sx={{ ml: "auto" }}>
            <Stack
              direction='row'
              alignItems='center'
            >
              {AppBarItemList.map((AppBarItem) => {
                return (
                  <Button
                    key={AppBarItem.text}
                    onClick={AppBarItem.action}
                    sx={{ mr: 2 }}
                  >
                    <Typography variant='h6'>{AppBarItem.text}</Typography>
                  </Button>
                );
              })}
              <IconButton onClick={chengeUser}>
                <AccountCircleIcon
                  fontSize='large'
                  sx={{ color: "primary.main" }}
                />
              </IconButton>
            </Stack>
          </Box>
        </Toolbar>
      </Container>
      {/* forPhone */}
      <Container disableGutters>
        <Toolbar sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            onClick={() => {
              setModalOpen(!ModalOpen);
            }}
            size='large'
          >
            <MenuIcon fontSize='large' />
          </IconButton>
          <Button
            onClick={chengeHome}
            sx={{ my: 1, mx: "auto" }}
          >
            <img
              src={logo}
              alt='logo'
              width={100}
            />
          </Button>
          {/* 以下ボタン位置調整用 */}
          <IconButton
            size='large'
            disabled
          >
            <MenuIcon
              fontSize='large'
              sx={{ color: "secondary.main" }}
            />
          </IconButton>
        </Toolbar>
      </Container>
      <Drawer
        anchor='top'
        open={ModalOpen}
        onClose={() => {
          setModalOpen(!ModalOpen);
        }}
        sx={{ color: "secodary.main" }}
      >
        <Stack
          direction='column'
          alignContent='center'
          sx={{ bgcolor: "secondary.main", py: 2 }}
        >
          {AppBarItemList.map((AppBarItem) => {
            return (
              <Button
                key={AppBarItem.text}
                onClick={AppBarItem.action}
                sx={{ mb: 1 }}
              >
                <Typography variant='h6'>{AppBarItem.text}</Typography>
              </Button>
            );
          })}
          <Button onClick={chengeUser}>
            <AccountCircleIcon
              fontSize='large'
              sx={{ color: "primary.main", mr: 1 }}
            />
            <Typography variant='h6'>ユーザ設定</Typography>
          </Button>
        </Stack>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
