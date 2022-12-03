import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Grid,
  Modal,
} from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Pages from "./Pages";
import EditForm from "./EditForm";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TableData() {
  const [data, setData] = useState([]);
  const [employee, setEmployee] = useState({});
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  const handleOpen = (id) => {
    setOpen(true);
    axios.get(`http://localhost:3004/employee/${id}`).then((r) => {
      console.log(r);
      setEmployee(r.data);
    });
  };
  
  const handleClose = () => setOpen(false);

  const handlePage = (e) => {
    setPage(e.target.innerText);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3004/employee?_page=${page}&_limit=5`)
      .then((r) => {
        console.log(r);
        setData(r.data);
      });
  }, [page]);

  const deleteData = async (id) => {
    await axios.delete(`http://localhost:3004/employee/${id}`);
    getData();
    alert("Employee details deleted successfully");
  };

  const getData = () => {
    axios
      .get(`http://localhost:3004/employee?_page=${page}&_limit=5`)
      .then((r) => {
        console.log(r);
        setData(r.data);
      });
  };

  return (
    <Box sx={{ ml: 3, mr: 3 }}>
      <TableContainer sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ bgcolor: "wheat" }}>
              <TableCell sx={{ fontSize: 16 }}>Employee Name</TableCell>
              <TableCell sx={{ fontSize: 16 }}>Email Address</TableCell>
              <TableCell sx={{ fontSize: 16 }}>Mobile Number</TableCell>
              <TableCell sx={{ fontSize: 16 }}>DOB</TableCell>
              <TableCell sx={{ fontSize: 16 }}>Gender</TableCell>
              <TableCell sx={{ fontSize: 16 }}>Hobbies</TableCell>
              <TableCell sx={{ fontSize: 16 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((el) => (
              <TableRow
                key={el.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {el.name}
                </TableCell>
                <TableCell>{el.email}</TableCell>
                <TableCell>{el.phone}</TableCell>
                <TableCell>{el.dob}</TableCell>
                <TableCell>{el.gender}</TableCell>
                <TableCell>{el.hobbies}</TableCell>
                <TableCell>
                  <Grid container direction="row" gap={1}>
                    <EditIcon onClick={() => handleOpen(el.id)} />
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <EditForm
                          handleClose={handleClose}
                          data={employee}
                          getData={getData}
                        />
                      </Box>
                    </Modal>
                    <DeleteIcon onClick={() => deleteData(el.id)} />
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pages handlePage={handlePage} />
    </Box>
  );
}
