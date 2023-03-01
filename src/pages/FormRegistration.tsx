import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IUser, saveNewUser } from "../redux/users/userSlice";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

interface INewUser extends IUser {
  confirmPassword: string;
}

const FormRegistration = () => {
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(false);

  const showPassword = () => {
    setIsVisible((prev) => !prev);
  };

  const formErrorText: Record<string, string> = {
    required: "Поле обязательно для заполнения",
    symbolLogin:
      "Логин может состоять из латинских букв и цифр, не менее 3 символов",
    confirmPassword: "Пароли должны совпадать",
  };

  const formLoginValidator: Record<string, (v: any) => boolean> = {
    symbolLogin: (v) => /^[a-zA-Z0-9]{3,}$/.test(v),
  };

  const history = useHistory();

  const submit: SubmitHandler<INewUser> = (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { type: "confirmPassword" });
      return;
    }

    const { confirmPassword, ...dataForRedux } = data;
    dispatch(saveNewUser(dataForRedux));
    history.push("/");
  };
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
      name: "",
      surname: "",
      confirmPassword: "",
    },
  });
  return (
    <Container>
      <form noValidate onSubmit={handleSubmit(submit)}>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="center"
          spacing={2}
          marginBottom="30px"
        >
          <Typography variant="h5" color="violet">
            REGISTRATION
          </Typography>
        </Stack>
        <Stack spacing={2}>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl error={!!errors.name}>
                <InputLabel shrink sx={{ position: "static" }} required>
                  Write your name
                </InputLabel>
                <OutlinedInput {...field} autoComplete="off" fullWidth />
                {errors.name && (
                  <FormHelperText>
                    {formErrorText[errors.name.type]}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Controller
            name="surname"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl error={!!errors.surname}>
                <InputLabel shrink sx={{ position: "static" }} required>
                  Write your surname
                </InputLabel>
                <OutlinedInput {...field} fullWidth />
                {errors.surname && (
                  <FormHelperText>
                    {formErrorText[errors.surname.type]}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Controller
            name="login"
            control={control}
            rules={{ required: true, validate: formLoginValidator }}
            render={({ field }) => (
              <FormControl error={!!errors.login}>
                <InputLabel shrink sx={{ position: "static" }} required>
                  Write your login
                </InputLabel>
                <OutlinedInput {...field} fullWidth autoComplete="off" />
                {errors.login && (
                  <FormHelperText>
                    {formErrorText[errors.login.type]}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl error={!!errors.password}>
                <InputLabel shrink sx={{ position: "static" }} required>
                  Write your password
                </InputLabel>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <OutlinedInput
                    {...field}
                    fullWidth
                    autoComplete="off"
                    type={isVisible ? "text" : "password"}
                    endAdornment={
                      <IconButton onClick={showPassword}>
                        {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    }
                  />
                </Stack>
                {errors.password && (
                  <FormHelperText>
                    {formErrorText[errors.password.type]}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl error={!!errors.confirmPassword}>
                <InputLabel shrink sx={{ position: "static" }} required>
                  Confirm your password
                </InputLabel>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <OutlinedInput
                    {...field}
                    fullWidth
                    autoComplete="off"
                    type={isVisible ? "text" : "password"}
                    endAdornment={
                      <IconButton onClick={showPassword}>
                        {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    }
                  />
                </Stack>
                {errors.confirmPassword && (
                  <FormHelperText>
                    {formErrorText[errors.confirmPassword.type]}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Stack alignItems="center" pt={3.5}>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: 200 }}
              color="secondary"
            >
              Registrate
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
};

export default FormRegistration;
