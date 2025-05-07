import { Button, FormHelperText, Grid, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useValidation } from "../hooks/useValidation";

const initialFormFields = {
  Task: "",
  Description: "",
  Done: false,
};

const taskSchema = yup.object().shape({
  Task: yup
    .string()
    .required("Task is required")
    .min(3, "Task must be at least 3 characters long")
    .max(100, "Task can be up to 100 characters"),
  Description: yup.string().max(500, "Description can be up to 500 characters"),
});

export const AddToDo = ({ editData, setEditData }) => {
  const [formFields, setFormFields] = useState({ ...initialFormFields });
  const { checkValidation, errors } = useValidation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData.Task) {
      const { Task, Description, ToDoId } = editData;
      setFormFields({
        Task: Task,
        Description: Description,
        ToDoId: ToDoId,
      });
    } else {
      setFormFields({ ...initialFormFields });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAdd = async (actionName) => {
    const isValid = await checkValidation(taskSchema, formFields);

    if (isValid) {
      const { Task, Description } = formFields;
      const UserId = localStorage.getItem("UserId");

      const payload = {
        Task: Task,
        Description: Description,
        UserId: UserId,
      };

      const addToDo = async () => {
        setLoading(true);
        const response = await fetch("http://localhost:1000/api/v1/AddTask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (data.Status === "Success") {
          toast.success(data.Message);
          setFormFields({ ...initialFormFields });
        } else if (data.Status === "Failed") {
          toast.error(data.Message);
        }
        setLoading(false);
      };
      addToDo();
    }
  };

  const handleEdit = async (id) => {
    console.log("id = ", id);
    const isValid = await checkValidation(taskSchema, formFields);

    if (isValid) {
      const { Task, Description } = formFields;

      const payload = {
        Task: Task,
        Description: Description,
        ToDoId: id,
      };

      const editTodo = async () => {
        setLoading(true);
        const response = await fetch(
          "http://localhost:1000/api/v1/UpdateTask",
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
          setFormFields({ ...initialFormFields });
        } else if (data.Status === "Failed") {
          toast.error(data.Message);
        }
        setLoading(false);
      };
      editTodo();
    }
  };

  const handleBlur = async (e) => {
    const { name, value } = e.target;
    checkValidation(taskSchema, formFields, name, value);
  };

  const handleCancel = (actionName) => {
    if (actionName === "Edit") {
      setEditData({ ...initialFormFields });
    } else {
      setFormFields({ ...initialFormFields });
    }
  };

  console.log("errors = ", errors);
  console.log("editData = ", editData);

  return (
    <Grid
      container
      direction={"column"}
      size={{ xs: 12, sm: 12, md: 6, lg: 6 }}
      spacing={2}
    >
      <h2>{editData.todo ? "Edit" : "Add"} your Task</h2>
      <Grid>
        <FormControl fullWidth>
          <TextField
            id="todo"
            name="Task"
            label="Enter ToDo"
            required
            value={formFields.Task}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="filled"
          />
          <FormHelperText sx={{ color: "red" }}>{errors.Task}</FormHelperText>
        </FormControl>
      </Grid>
      <Grid>
        <FormControl fullWidth>
          <TextField
            id="Description"
            name="Description"
            label="Description"
            value={formFields.Description}
            onChange={handleChange}
            onBlur={handleBlur}
            multiline
            rows={4}
            variant="filled"
          />
          <FormHelperText sx={{ color: "red" }}>
            {errors.Description}
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid>
        <Button
          variant="contained"
          onClick={() =>
            editData.Task ? handleEdit(editData.ToDoId) : handleAdd()
          }
        >
          {editData.Task ? "Edit" : "Add"}
        </Button>
        <Button
          variant="contained"
          onClick={() => handleCancel(editData.Task ? "Edit" : "Add")}
          sx={{ marginLeft: 2 }}
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
};
