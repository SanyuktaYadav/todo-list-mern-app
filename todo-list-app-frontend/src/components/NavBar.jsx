import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
// import ListAltIcon from '@material-ui/icons/ListAlt';
import { LuListTodo } from "react-icons/lu";

const NavBar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("UserId");

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <LuListTodo style={{ marginRight: 10 }} />
          <Typography variant="h6" component="div">
            ToDo
          </Typography>
          <Stack mx={2} direction="row" spacing={2}>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Button>
            {!isAuthenticated ? (
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/SignIn");
                }}
              >
                Sign In
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => {
                  localStorage.clear();
                  navigate("/SignIn");
                }}
              >
                Logout
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
