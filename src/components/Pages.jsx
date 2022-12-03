import React from 'react';
import {Pagination, Stack} from '@mui/material';


export default function Pages({handlePage}) {
  
  return (
    <Stack spacing={2} sx={{mt:3}}>
    <Pagination count={10} onChange={handlePage} variant="outlined" shape="rounded" />
  </Stack>
  );
}


