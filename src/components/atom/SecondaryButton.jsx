import { Button, Typography } from "@mui/material";

const SecondaryButton = (props) => {
  const { state, stateAction, icon, label } = props;
  return (
    <>
      <Button
        startIcon={icon}
        variant='contained'
        onClick={() => {
          stateAction(!state);
        }}
        sx={{ bgcolor: "secondary.main", color: "primary.main", p: 1, px: 2 }}
      >
        <Typography
          variant='subtitle1'
          noWrap={true}
        >
          {label}
        </Typography>
      </Button>
    </>
  );
};

export default SecondaryButton;
