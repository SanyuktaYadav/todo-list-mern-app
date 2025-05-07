import { Box, Checkbox, Grid, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";

const ToDoListTable = ({ setEditData }) => {
  const [todoData, setTodoData] = useState([]);
  const [selectedCheckbox, setSelectedCheckbox] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const payload = { UserId: localStorage.getItem("UserId") };
        await fetch("http://localhost:1000/api/v1/GetTaskList", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("data = ", data);
            if (data?.ToDoList) {
              setTodoData(data?.ToDoList);
            }
          });
      } catch (err) {
        console.log("err = ", err);
      }
    })();
  }, [refresh]);

  const handleEdit = (id) => {
    const selectedTodo = todoData.find((item) => item._id === id);
    if (selectedTodo) {
      setEditData({
        Task: selectedTodo.Task,
        Description: selectedTodo.Description,
        ToDoId: selectedTodo._id,
      });
    }
  };

  const handleDelete = (id) => {
    const deleteToDo = async () => {
      const payload = {
        ToDoId: id,
        UserId: localStorage.getItem("UserId"),
      };
      setLoading(true);
      const response = await fetch("http://localhost:1000/api/v1/DeleteTask", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.Status === "Success") {
        toast.success(data.Message);
        setRefresh((prevState) => !prevState);
      } else if (data.Status === "Failed") {
        toast.error(data.Message);
      }
      setLoading(false);
    };
    deleteToDo();
  };

  const handleCheckbox = (e, id) => {
    const { checked } = e.target;
    const selectedTodo = todoData.find((item) => item._id === id);
    if (checked) {
      setSelectedCheckbox((prevState) => [...prevState, selectedTodo._id]);
      const markCompleteToDo = async () => {
        const payload = {
          ToDoId: id,
        };
        setLoading(true);
        const response = await fetch(
          "http://localhost:1000/api/v1/MarkCompleteTask",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        const data = await response.json();
        if (data.Status === "Success") {
          toast.success(data.Message);
          setRefresh((prevState) => !prevState);
        } else if (data.Status === "Failed") {
          toast.error(data.Message);
        }
        setLoading(false);
      };
      markCompleteToDo();
    } else {
      setSelectedCheckbox((prevState) =>
        prevState.filter((item) => item !== id)
      );
    }
  };

  console.log("selectedCheckbox = ", selectedCheckbox);

  return (
    <Grid
      container
      direction={"column"}
      size={{ xs: 12, sm: 12, md: 6, lg: 6 }}
      overflow={"scroll"}
      maxHeight={"80vh"}
    >
      <Box
        sx={{
          maxHeight: "80vh",
          overflowX: "hidden",
          overflowY: "scroll",
          p: 2,
          m: 2,
          border: "1px solid #ccc",
        }}
      >
        <h2>List</h2>
        {todoData.length > 0 &&
          todoData.map((item, index) => (
            <Box
              key={index}
              margin={1}
              padding={1}
              sx={{
                backgroundColor: "#D0F0FF",
                borderRadius: "0.5rem",
                width: "100%",
              }}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Box sx={item.Done ? { textDecoration: "line-through" } : {}}>
                <Typography component="div" variant="h5">
                  <Checkbox
                    onChange={(e) => handleCheckbox(e, item._id)}
                    checked={item.Done || selectedCheckbox.includes(item._id)}
                    disabled={item.Done}
                  />
                  {item.Task}
                </Typography>
                <Typography variant="body2" sx={{ ml: 6 }}>
                  {item.Description}
                </Typography>
              </Box>

              <Box>
                <IconButton
                  onClick={() => handleEdit(item._id)}
                  disabled={item.Done}
                >
                  <MdModeEditOutline />
                </IconButton>
                <IconButton onClick={() => handleDelete(item._id)}>
                  <MdOutlineDeleteOutline />
                </IconButton>
              </Box>
            </Box>
          ))}
      </Box>
    </Grid>
  );
};

export default ToDoListTable;
