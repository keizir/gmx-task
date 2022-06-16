import React from 'react';
import {
  Alert as MuiAlert,
  Stack,
} from '@mui/material';

export interface AlertProps {
  type: any
}

const Alert: React.FC<AlertProps> = ({ type, children }) => {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <MuiAlert variant="filled" severity={type}>
        {children}
      </MuiAlert>
    </Stack>
  );
}

export default Alert;