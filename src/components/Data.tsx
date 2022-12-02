import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';

const columns: GridColDef[] = [
  { field: 'Hshd_num', headerName: 'Hshd_num' },
  { field: 'Basket_num', headerName: 'Basket_num' },
  {
    field: 'Date',
    headerName: 'Date',
    valueFormatter: (params) => {
      if (params.value) return params.value.split('T')[0];
    },
  },
  { field: 'Product_num', headerName: 'Product_num' },
  { field: 'Department', headerName: 'Department', width: 150 },
  { field: 'Commodity', headerName: 'Commodity', width: 200 },
  { field: 'Spend', headerName: 'Spend', width: 70 },
  { field: 'Units', headerName: 'Units', width: 50 },
  { field: 'Store_region', headerName: 'Store_region' },
  { field: 'Week_num', headerName: 'Week_num' },
  { field: 'Year', headerName: 'Year', width: 70 },
  { field: 'Loyalty_flag', headerName: 'Loyalty_flag' },
  { field: 'Age_range', headerName: 'Age_range' },
  { field: 'Marital_status', headerName: 'Marital_status' },
  { field: 'Income_range', headerName: 'Income_range' },
  { field: 'Homeowner_desc', headerName: 'Homeowner_desc' },
  { field: 'Hshd_composition', headerName: 'Hshd_composition' },
  { field: 'Hshd_size', headerName: 'Hshd_size' },
  { field: 'Children', headerName: 'Children' },
];

export default function Data() {
  const [hshdNum, setHshd] = useState(10);
  const [rows, setRows] = useState([{}]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://cloudfinalproject-backend.azurewebsites.net/pull/${hshdNum}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setRows(res.data);
        setLoading(false);
      });
  }, [hshdNum]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHshd(event.currentTarget.hshd_num.value);
  };

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '90vh',
          width: '100%',
        }}
      >
        <Typography component="h1" variant="h4">
          Data Pull
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ paddingTop: '1rem' }}
        >
          <TextField
            required
            defaultValue={hshdNum}
            label="Hshd_num"
            id="hshd_num"
            size="small"
            sx={{ width: '8rem', paddingRight: '1rem' }}
          />
          <Button variant="contained" type="submit">
            Query
          </Button>
        </Box>
        <div style={{ width: '100%', paddingTop: '1rem', height: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={20}
            loading={isLoading}
            rowsPerPageOptions={[20]}
            getRowId={(row) => row.Hshd_num * row.Basket_num * row.Product_num}
          />
        </div>
      </Box>
    </Container>
  );
}
