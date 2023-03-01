import {
  Avatar,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Box } from "@mui/system";
import FlagIcon from "@mui/icons-material/Flag";

import React, { useContext, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { TableItemContext } from "./context/TableItemState";
import { ITasks } from "./TableTasks";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "white",
  border: "2px solid white",
  boxShadow: 24,
  borderRadius: "20px",
  p: 5,
};

interface IChangeModalWindow {
  openModal: boolean;
  closeModal: () => void;
}

const ModalWindow: React.FC<IChangeModalWindow> = ({
  openModal,
  closeModal,
}) => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(new Date()));

  const { addTasks } = useContext(TableItemContext);

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };
  const formErrorText: Record<string, string> = {
    required: "This field must be filled",
  };

  const {
    watch,
    setValue: setHookValue,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ITasks>({
    defaultValues: {
      nameTask: "",
      typeTask: "",
      comments: "",
      priority: "",
      date: value?.toJSON(),
    },
  });

  const handleAddTasks: SubmitHandler<ITasks> = (data) => {
    addTasks(data);
    closeModal();
    reset();
  };

  const newCloseModal = () => {
    closeModal();
    reset();
  };

  useEffect(() => {
    setHookValue("date", value?.toJSON() || "");
  }, [value]);

  useEffect(() => {
    setHookValue("id", `${watch("nameTask")}-${Date.now()}`);
  }, [watch("nameTask")]);
  return (
    <Modal open={openModal}>
      <Box sx={style}>
        <Stack>
          <form onSubmit={handleSubmit(handleAddTasks)}>
            <Stack spacing={3}>
              <Controller
                name="nameTask"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControl error={!!errors.nameTask}>
                    <Stack width="100%">
                      <InputLabel shrink sx={{ position: "static" }} required>
                        Add your personal tasks
                      </InputLabel>
                      <OutlinedInput
                        {...field}
                        fullWidth
                        placeholder="_description_"
                      />
                      {errors.nameTask && (
                        <FormHelperText>
                          {formErrorText[errors.nameTask.type]}
                        </FormHelperText>
                      )}
                    </Stack>
                  </FormControl>
                )}
              />
              <Stack direction="row" justifyContent="space-between">
                <Controller
                  name="typeTask"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl
                      sx={{ width: "30%" }}
                      error={!!errors.typeTask}
                    >
                      <InputLabel shrink sx={{ position: "static" }} required>
                        Type tasks
                      </InputLabel>
                      <Select
                        displayEmpty
                        {...field}
                        renderValue={(value) =>
                          !value ? "type of task" : value
                        }
                      >
                        <MenuItem value="personal">Personal</MenuItem>
                        <MenuItem value="routines">Routines</MenuItem>
                        <MenuItem value="inspiration">Inspiration</MenuItem>
                      </Select>
                      {errors.typeTask && (
                        <FormHelperText>
                          {formErrorText[errors.typeTask.type]}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  name="priority"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl
                      sx={{ width: "30%" }}
                      error={!!errors.priority}
                    >
                      <InputLabel shrink sx={{ position: "static" }} required>
                        Type priority
                      </InputLabel>
                      <Select
                        displayEmpty
                        {...field}
                        renderValue={(value) =>
                          !value ? "type of priority" : value
                        }
                      >
                        <MenuItem value="high">
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            width="100%"
                          >
                            <Typography>High</Typography>
                            <FlagIcon color="error" />
                          </Stack>
                        </MenuItem>

                        <MenuItem value="medium">
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            width="100%"
                          >
                            <Typography>Medium</Typography>
                            <FlagIcon color="secondary" />
                          </Stack>
                        </MenuItem>
                        <MenuItem value="low">
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            width="100%"
                          >
                            <Typography>Low</Typography>
                            <FlagIcon color="warning" />
                          </Stack>
                        </MenuItem>
                      </Select>
                      {errors.priority && (
                        <FormHelperText>
                          {formErrorText[errors.priority.type]}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />

                <FormControl sx={{ width: "30%" }}>
                  <InputLabel shrink sx={{ position: "static" }}>
                    Date desktop
                  </InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      value={value}
                      onChange={handleChange}
                      inputFormat="MM/DD/YYYY"
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Stack>

              <Controller
                name="comments"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControl error={!!errors.comments}>
                    <InputLabel shrink sx={{ position: "static" }} required>
                      Add your comments
                    </InputLabel>
                    <OutlinedInput
                      startAdornment={
                        <Avatar
                          sx={{ bgcolor: deepPurple[200], marginRight: "5px" }}
                        >
                          K
                        </Avatar>
                      }
                      {...field}
                      fullWidth
                      placeholder=" Comment"
                    />
                    {errors.comments && (
                      <FormHelperText>
                        {formErrorText[errors.comments.type]}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
              <Stack spacing={2} direction="row-reverse" marginTop={3}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={newCloseModal}
                >
                  Cancel
                </Button>
                <Button variant="outlined" type="submit">
                  Add task
                </Button>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalWindow;
