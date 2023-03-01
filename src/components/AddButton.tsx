import { Box, Fab, Stack, Typography } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";

interface ButtonProps {
  openModal: () => void;
}

const AddButton: React.FC<ButtonProps> = ({ openModal }) => {
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <Fab
          size="medium"
          color="secondary"
          aria-label="add"
          onClick={openModal}
        >
          <AddIcon />
        </Fab>
        <Typography marginLeft="10px">Add your task</Typography>
      </Stack>
    </Box>
  );
};

export default AddButton;
