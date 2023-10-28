import { CircularProgress, Modal, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import { ModalStyle } from "../../style/ModalStyle";

const WaitModal = (props) => {
  const { state, stateAction, label } = props;
  return (
    <Modal
      open={state}
      onClose={() => {
        stateAction(!state);
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
            {label}
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
  );
};

export default WaitModal;
