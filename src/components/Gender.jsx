import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function Gender({onchange}) {
  return (
    <FormControl >
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="gender"
        onChange={onchange}
        
      >
        <FormLabel id="demo-row-radio-buttons-group-label" sx={{mt:1,color:"black",ml:0,fontSize:18}}>Gender :</FormLabel>
      
        <FormControlLabel value="female" control={<Radio />} label="Female" sx={{ml:4}}/>
        <FormControlLabel value="male" control={<Radio />} label="Male" />
       
      </RadioGroup>
    </FormControl>
  );
}
