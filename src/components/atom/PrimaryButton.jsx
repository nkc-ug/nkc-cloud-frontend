import { Button, Typography } from "@mui/material";

const PrimaryButton = (props) => {
  const { state, stateAction, icon, label } = props;
  return (
    <Button
      startIcon={icon}
      variant='contained'
      onClick={() => {
        stateAction(!state);
      }}
      sx={{ p: 1, px: 2 }}
    >
      <Typography
        variant='h6'
        noWrap={true}
      >
        {label}
      </Typography>
    </Button>
  );
};

export default PrimaryButton;
