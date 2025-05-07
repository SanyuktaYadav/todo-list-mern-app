import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useValidation } from "../hooks/useValidation";
import { useNavigate } from "react-router";

const initialFormFields = {
  Email: "",
  Password: "",
  UserName: "",
};

const signUpSchema = yup.object({
  Email: yup
    .string()
    .email("Invalid Email format")
    .required("Email is required"),

  UserName: yup.string(),

  Password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must include an uppercase letter")
    .matches(/[a-z]/, "Must include a lowercase letter")
    .matches(/[0-9]/, "Must include a number")
    .matches(/[@$!%*?&]/, "Must include a special character"),
});

const SignUp = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [formFields, setFormFields] = useState({ ...initialFormFields });
  const { checkValidation, errors } = useValidation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleBlur = async (e) => {
    const { name, value } = e.target;
    checkValidation(signUpSchema, formFields, name, value);
  };

  const handleSubmit = async () => {
    const isValid = await checkValidation(signUpSchema, formFields);

    if (isValid) {
      const { Email, Password, UserName } = formFields;

      const payload = {
        Email: Email,
        Password: Password,
        UserName: UserName,
      };
      const registerUser = async () => {
        setLoading(true);
        const response = await fetch(
          "http://localhost:1000/api/v1/RegisterUser",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        const data = await response.json();
        if (data.Status === "Success") {
          toast.success(data.Message);
          setFormFields({ ...initialFormFields });
        } else if (data.Status === "Failed") {
          toast.error(data.Message);
        }
        setLoading(false);
      };
      registerUser();
    }
  };

  return (
    <Box>
      <Grid
        container
        size={{ xs: 12, sm: 12, md: 12, lg: 12 }}
        spacing={2}
        sx={{ my: 15 }}
      >
        {!isMobile && (
          <Grid
            container
            direction={"column"}
            size={{ xs: 12, sm: 12, md: 6, lg: 6 }}
            padding={4}
          >
            <Box
              sx={{
                width: "100%",
                backgroundColor: "#1976d2",
                color: "#fff",
                padding: 8,
                height: "100%",
              }}
            >
              <Typography variant="h4" component={"div"}>
                To Save your ToDos Sign Up!
              </Typography>
              <Typography variant="h5" component={"div"}>
                Let us help you to Prioritize your stuff correctly
              </Typography>
              <Button
                variant="contained"
                sx={{ marginY: 2, color: "#1976d2", backgroundColor: "#fff" }}
                onClick={() => navigate("/SignIn")}
              >
                Sign In
              </Button>
            </Box>
          </Grid>
        )}

        <Grid
          container
          direction={"column"}
          size={{ xs: 12, sm: 12, md: 6, lg: 6 }}
          padding={4}
        >
          <h1>Sign Up</h1>
          <Grid size={12}>
            <FormControl fullWidth>
              <TextField
                id="Email"
                name="Email"
                label="Email"
                required
                value={formFields.Email}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="filled"
              />
              <FormHelperText sx={{ color: "red" }}>
                {errors.Email}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid size={12}>
            <FormControl fullWidth>
              <TextField
                id="UserName"
                name="UserName"
                label="User Name"
                value={formFields.UserName}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="filled"
              />
              <FormHelperText sx={{ color: "red" }}>
                {errors.UserName}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid size={12}>
            <FormControl fullWidth>
              <TextField
                id="Password"
                name="Password"
                label="Password"
                required
                value={formFields.Password}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="filled"
                type="password"
              />
              <FormHelperText sx={{ color: "red" }}>
                {errors.Password}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid size={12}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
            >
              Sign Up
              {loading && (
                <CircularProgress size={20} sx={{ ml: 1, color: "white" }} />
              )}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUp;
