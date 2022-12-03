import { Typography } from '@mui/material';
import AddEmployee from './components/AddEmployee';
import TableData from './components/TableData';

function App() {
  return (
    <div className="App">
      
     {/* <Form/> */}
     <Typography variant="h4" gutterBottom sx={{textAlign:"center",mt:3}}>
       Employee Database
      </Typography>
     <AddEmployee/>
     <TableData/>
     </div>
  );
}

export default App;
