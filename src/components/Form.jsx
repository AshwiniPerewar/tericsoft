import React, { useState } from "react";
import { v4 } from "uuid";
import {
  Box,
  Button,
  TextField,
  FormLabel,
  FormControl,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  OutlinedInput,
} from "@mui/material";
import Gender from "./Gender";
import axios from "axios";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Form = ({ handleClose }) => {
  const [dob, setDob] = useState(dayjs("2022-04-07"));
  const [formdata, setFormdata] = useState({});
  const [hobbies, setHobbies] = useState([]);

  const onchange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormdata({ ...formdata, [name]: value });
  };

  const submit = () => {
    axios.post("http://localhost:3004/employee", {
      ...formdata,
      id: v4(),
      hobbies: hobbies,
      dob: dob,
    });
    alert("Employee details added successfully");
    handleClose();
  };

  return (
    <div>
      <Box
        sx={{
          width: 300,
          height: "inherit",
          m: "auto",
          opacity: [0.9, 0.8, 0.7],
        }}
      >
        <FormControl sx={{ width: "35ch", size: "small", height: 1 }}>
          <OutlinedInput
            placeholder="Please enter Name"
            name="name"
            onChange={onchange}
          />
        </FormControl>

        <FormControl sx={{ width: "35ch", size: "small", mt: 1 }}>
          <OutlinedInput
            placeholder="Please enter email"
            name="email"
            onChange={onchange}
          />
        </FormControl>

        <FormControl sx={{ width: "35ch", size: "small", mt: 1 }}>
          <OutlinedInput
            placeholder="Please enter Phone"
            name="phone"
            onChange={onchange}
          />
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            openTo="year"
            views={["year", "month", "day"]}
            label="DOB(Year, month and date)"
            value={dob}
            onChange={(newValue) => {
              setDob(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                helperText={null}
                sx={{ size: "small", mt: 2, width: "35ch" }}
              />
            )}
          />
        </LocalizationProvider>

        <Gender onchange={onchange} />

        <FormControl component="fieldset" variant="standard">
          <Grid container direction="row" justifyContent="flex-start">
            <FormLabel
              component="legend"
              sx={{ color: "black", fontSize: 18 }}
              name="hobbies"
            >
              Hobbies :
            </FormLabel>
            <FormGroup sx={{ ml: 5 }}>
              <FormControlLabel
                sx={{ mt: -1 }}
                control={
                  <Checkbox
                    value="drawing"
                    name="hobbies"
                    onChange={(e) => setHobbies([...hobbies, e.target.value])}
                  />
                }
                label="Drawing"
              />
              <FormControlLabel
                sx={{ mt: -1 }}
                control={
                  <Checkbox
                    value={"singing"}
                    name="hobbies"
                    onChange={(e) => setHobbies([...hobbies, e.target.value])}
                  />
                }
                label="Singing"
              />
              <FormControlLabel
                sx={{ mt: -1 }}
                control={
                  <Checkbox
                    value={"cooking"}
                    name="hobbies"
                    onChange={(e) => setHobbies([...hobbies, e.target.value])}
                  />
                }
                label="Cooking"
              />
            </FormGroup>
          </Grid>
        </FormControl>
        <Button
          variant="contained"
          sx={{ pl: "40%", pr: "40%", m: "auto" }}
          onClick={submit}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default Form;
