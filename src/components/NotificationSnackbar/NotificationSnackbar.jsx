// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Snackbar from '@mui/material/Snackbar';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import { useState } from 'react';

// export default function SimpleSnackbar() {
//   const [open, setOpen] = useState(false);

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }

//     setOpen(false);
//   };



//   return (
//     <div>
//       <Button onClick={handleClick}>Open simple snackbar</Button>
//       <Snackbar
//         open={open}
//         autoHideDuration={6000}
//         onClose={handleClose}
//         message="Note archived"
//         action={action}
//       />
//     </div>
//   );
// }
