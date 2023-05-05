import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useAuth from "../hooks/useAuth";
import { emailPasswordValidationSchema } from "../utils/auth";
import { ISingInFormState } from "../utils/types";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/Laura-Broder">
        Laura Broder
      </Link>{" "}
      {2023}
      {"."}
    </Typography>
  );
}

interface Props {
  isSignUp?: boolean | undefined;
}

export default function SignIn({ isSignUp }: Props) {
  const [submitError, setSubmitError] = useState("");
  const { login, register } = useAuth();
  useEffect(() => {
    let timeout = setTimeout(() => setSubmitError(""), 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [submitError]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: emailPasswordValidationSchema,
    onSubmit: async ({ email, password }: ISingInFormState) => {
      console.log({ email, password });
      try {
        if (isSignUp) {
          await register({ email, password });
        } else {
          await login({ email, password });
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error?.response?.status === 409)
            setSubmitError("User already exists");
          if (
            error?.response?.status === 401 ||
            error?.response?.status === 400 ||
            error?.response?.status === 404
          )
            setSubmitError(error.response.data?.message);
        } else {
          setSubmitError(isSignUp ? "Failed to sign up" : "Failed to sign in");
        }
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignUp ? "Sign up" : "Sign in"}
        </Typography>

        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          // noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isSignUp ? "Sign up" : "Sign in"}
          </Button>
          {submitError ? <Alert severity="error">{submitError}</Alert> : null}
          <Grid container>
            <Grid item>
              <Link
                component={RouterLink}
                to={isSignUp ? "/signin" : "/signup"}
                variant="body2"
              >
                {isSignUp
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
