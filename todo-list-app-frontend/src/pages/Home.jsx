import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import { AddToDo } from "../components/AddToDo";
import ToDoListTable from "../components/ToDoListTable";

const Home = () => {
  const [editData, setEditData] = useState({});
  const isAuthenticated = !!localStorage.getItem("UserId");

  return (
    <Box sx={{ margin: 4 }}>
      <h1> Your tasks</h1>
      <Grid
        container
        size={{ xs: 12, sm: 12, md: 12, lg: 12 }}
        spacing={2}
        sx={{ my: 2 }}
      >
        <AddToDo editData={editData} setEditData={setEditData} />
        {isAuthenticated && <ToDoListTable setEditData={setEditData} />}
      </Grid>
    </Box>
  );
};

export default Home;
