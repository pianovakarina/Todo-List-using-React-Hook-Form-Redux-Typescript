import {
  Box,
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
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import CloudIcon from "@mui/icons-material/Cloud";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/auth/authSlice";
import { RootState } from "../redux/store";
import { useHistory } from "react-router-dom";

const FormAuthorization = () => {
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.auth);
  console.log(state);

  const changeVisible = () => {
    setIsVisible((prev) => !prev);
  };

  const formErrorText: Record<string, string> = {
    required: "Поле обязательно для заполнения",
    symbolLogin:
      "Логин может состоять из латинских букв и цифр, не менее 3 символов",
    authError: state.isAuthorizationError,
  };

  const formLoginValidator: Record<string, (v: any) => boolean> = {
    symbolLogin: (v) => /^[a-zA-Z0-9]{3,}$/.test(v),
  };

  const submit: SubmitHandler<{ login: string; password: string }> = (data) => {
    console.log(data);
    dispatch(login(data));
  };

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const history = useHistory();

  useEffect(() => {
    if (state.isAuthorization) {
      history.push("/");
    }
  }, [state.isAuthorization]);

  useEffect(() => {
    if (state.isAuthorizationError !== "") {
      setError("login", { type: "authError" });
    }
  }, [state.isAuthorizationError]);

  return (
    <Container>
      <Stack height="100vh" alignItems="center" justifyContent="center">
        <form noValidate onSubmit={handleSubmit(submit)}>
          <Stack spacing={2} width={500}>
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="center"
              spacing={2}
            >
              <CloudIcon fontSize="large" htmlColor="GrayText" />
              <Typography variant="h5" color="GrayText">
                LOGIN
              </Typography>
            </Stack>
            <Controller
              name="login"
              rules={{ required: true, validate: formLoginValidator }}
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.login}>
                  <Stack marginLeft={3}>
                    <InputLabel shrink sx={{ position: "static" }} required>
                      Write your login
                    </InputLabel>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <FaceIcon />
                    <OutlinedInput {...field} autoComplete="off" fullWidth />
                  </Stack>

                  {errors.login && (
                    <Stack marginLeft={3}>
                      <FormHelperText>
                        {formErrorText[errors.login.type]}
                      </FormHelperText>
                    </Stack>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="password"
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.password}>
                  <Stack marginLeft={3}>
                    <InputLabel shrink sx={{ position: "static" }} required>
                      Write password
                    </InputLabel>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <LockOpenIcon />
                    <OutlinedInput
                      {...field}
                      fullWidth
                      autoComplete="off"
                      type={isVisible ? "text" : "password"}
                      endAdornment={
                        <IconButton onClick={changeVisible}>
                          {isVisible ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      }
                    />
                  </Stack>
                  {errors.password && (
                    <Stack marginLeft={3}>
                      <FormHelperText>
                        {formErrorText[errors.password.type]}
                      </FormHelperText>
                    </Stack>
                  )}
                </FormControl>
              )}
            />
            <Stack alignItems="center" pt={3.5}>
              <Button
                type="submit"
                variant="contained"
                sx={{ width: 200 }}
                color="inherit"
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
};

export default FormAuthorization;
