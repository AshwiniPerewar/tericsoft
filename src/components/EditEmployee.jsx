import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import EditForm from './EditForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function EditEmployee({id}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const[data,setData]=useState({});

  useEffect((id)=>
  {
    axios.get(`http://localhost:3004/employee/${id}`)
    .then((r)=>setData(r.data))
  },[])

  return (
    <div>
      <EditIcon onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditForm handleClose={handleClose} props={data}/>
        </Box>
        
      </Modal>
    </div>
  );
}