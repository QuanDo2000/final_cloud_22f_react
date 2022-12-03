import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';

export default function Import({
  setCustom,
}: {
  setCustom: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [hshdName, setHshdName] = useState('');
  const [hshdUpload, setHshdUpload] = useState(0);
  const [prodName, setProdName] = useState('');
  const [prodUpload, setProdUpload] = useState(0);
  const [tranName, setTranName] = useState('');
  const [tranUpload, setTranUpload] = useState(0);

  useEffect(() => {
    if (hshdUpload === 1 && prodUpload === 1 && tranUpload === 1) {
      fetch(
        'https://cloudfinalproject-backend.azurewebsites.net/upload/finished'
      ).then((res) => {
        if (res.status === 200) {
          setCustom(true);
        } else {
          res.json().then((res) => {
            console.log(res.error);
          });
        }
      });
    }
  });

  const handleHshdUpload = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];
    const { name } = file;
    setHshdName(name);

    let formData = new FormData();
    formData.append('file', file);

    let options = {
      method: 'POST',
      body: formData,
    };

    fetch(
      `https://cloudfinalproject-backend.azurewebsites.net/upload/hshd`,
      options
    ).then((res) => {
      if (res.status === 200) {
        setHshdUpload(1);
      } else {
        setHshdUpload(2);
      }
    });
  };

  const handleProdUpload = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];
    const { name } = file;
    setProdName(name);

    let formData = new FormData();
    formData.append('file', file);

    let options = {
      method: 'POST',
      body: formData,
    };

    fetch(
      `https://cloudfinalproject-backend.azurewebsites.net/upload/product`,
      options
    ).then((res) => {
      if (res.status === 200) {
        setProdUpload(1);
      } else {
        setProdUpload(2);
      }
    });
  };

  const handleTranUpload = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];
    const { name } = file;
    setTranName(name);

    let formData = new FormData();
    formData.append('file', file);

    let options = {
      method: 'POST',
      body: formData,
    };

    fetch(
      `https://cloudfinalproject-backend.azurewebsites.net/upload/transaction`,
      options
    ).then((res) => {
      if (res.status === 200) {
        setTranUpload(1);
      } else {
        setTranUpload(2);
      }
    });
  };

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '80vh',
        }}
      >
        <Typography component="h1" variant="h4">
          Import
        </Typography>
        <Typography component="body" variant="body1">
          Please upload the files one at a time. A success message will be shown
          if file is uploaded.
        </Typography>
        <Typography component="body" variant="body1">
          It is assumed that the files have the same format as the input files
          from the project description (obtained from
          8451_The_Complete_Journey_2_Sample.zip).
        </Typography>
        <Typography component="body" variant="body1">
          This means that all column order are the same as sample file.
        </Typography>
        <Box
          sx={{
            paddingTop: '5rem',
            display: 'flex',
            alignItem: 'center',
            width: '100%',
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Button variant="contained" component="label">
              Upload Household CSV
              <input
                type="file"
                accept=".csv"
                hidden
                onChange={handleHshdUpload}
              />
            </Button>
            <Typography
              component="body"
              variant="body1"
              paddingTop="1rem"
              paddingBottom="1rem"
            >
              {hshdName}
            </Typography>
            {hshdUpload === 1 ? (
              <Typography component="body" variant="body2">
                Upload Success
              </Typography>
            ) : hshdUpload === 2 ? (
              <Typography component="body" variant="body2">
                Upload Failed
              </Typography>
            ) : (
              hshdName !== '' && <CircularProgress />
            )}
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Button variant="contained" component="label">
              Upload Product CSV
              <input
                type="file"
                accept=".csv"
                hidden
                onChange={handleProdUpload}
              />
            </Button>
            <Typography
              component="body"
              variant="body1"
              paddingTop="1rem"
              paddingBottom="1rem"
            >
              {prodName}
            </Typography>
            {prodUpload === 1 ? (
              <Typography component="body" variant="body2">
                Upload Success
              </Typography>
            ) : prodUpload === 2 ? (
              <Typography component="body" variant="body2">
                Upload Failed
              </Typography>
            ) : (
              prodName !== '' && <CircularProgress />
            )}
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Button variant="contained" component="label">
              Upload Transaction CSV
              <input
                type="file"
                accept=".csv"
                hidden
                onChange={handleTranUpload}
              />
            </Button>
            <Typography
              component="body"
              variant="body1"
              paddingTop="1rem"
              paddingBottom="1rem"
            >
              {tranName}
            </Typography>
            {tranUpload === 1 ? (
              <Typography component="body" variant="body2">
                Upload Success
              </Typography>
            ) : tranUpload === 2 ? (
              <Typography component="body" variant="body2">
                Upload Failed
              </Typography>
            ) : (
              tranName !== '' && <CircularProgress />
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

Import.propTypes = {
  setCustom: PropTypes.func.isRequired,
};
