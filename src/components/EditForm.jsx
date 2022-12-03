import React, { useState } from "react";
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
  RadioGroup,
  Radio,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const EditForm = ({ handleClose, data, getData }) => {
  const [dob, setDob] = useState(data.dob ? dayjs("2022-04-07") : data.dob);
  const [formdata, setFormdata] = useState({});
  const [hobbies, setHobbies] = useState([]);

  console.log(data);

  const onchange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormdata({ ...formdata, [name]: value });
  };

  const submit = () => {
    axios.patch(`http://localhost:3004/employee/${data.id}`, {
      ...formdata,
      hobbies: hobbies,
      dob: dob,
    });
    alert("Employee details updateed successfully");
    handleClose();
    getData();
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
            value={data.name}
            name="name"
            onChange={onchange}
          />
        </FormControl>

        <FormControl sx={{ width: "35ch", size: "small", mt: 1 }}>
          <OutlinedInput
            placeholder="Please enter email"
            value={data.email}
            name="email"
            onChange={onchange}
          />
        </FormControl>

        <FormControl sx={{ width: "35ch", size: "small", mt: 1 }}>
          <OutlinedInput
            placeholder="Please enter Phone"
            name="phone"
            value={data.phone}
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

        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="gender"
            onChange={onchange}
            defaultValue={data.gender === "Female" ? "Female" : "Male"}
          >
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              sx={{ mt: 1, color: "black", ml: 0, fontSize: 18 }}
            >
              Gender :
            </FormLabel>

            <FormControlLabel
              value="Female"
              control={<Radio />}
              label="Female"
              sx={{ ml: 4 }}
            />
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset" variant="standard">
          <Grid container direction="row" justifyContent="flex-start">
            <FormLabel
              component="legend"
              sx={{ color: "black", fontSize: 18 }}
              name="hobbies"
              value={data.gender}
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
                    defaultChecked={data.hobbies === "drawing" && "drawing"}
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

export default EditForm;
