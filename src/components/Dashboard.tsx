import {
  Container,
  Box,
  CssBaseline,
  Typography,
  Skeleton,
} from '@mui/material';
import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type Dashboard2 = {
  Children: string;
  count: number;
};

type Dashboard3 = {
  Income_range: string;
  count: number;
};

export default function Dashboard() {
  const [data1, setData1] = useState([{}]);
  const [data2, setData2] = useState([{}]);
  const [data3, setData3] = useState([{}]);

  const [isLoading1, setLoading1] = useState(false);
  const [isLoading2, setLoading2] = useState(false);
  const [isLoading3, setLoading3] = useState(false);

  useEffect(() => {
    setLoading1(true);
    fetch(`https://cloudfinalproject-backend.azurewebsites.net/dashboard/1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setData1(res.data);
        setLoading1(false);
      });
    setLoading2(true);
    fetch(`https://cloudfinalproject-backend.azurewebsites.net/dashboard/2`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const data = res.data.map((x: Dashboard2) => {
          if (x.Children === 'null') {
            return {
              Children: '0',
              count: x.count,
            };
          } else {
            return x;
          }
        });
        data.sort((a: Dashboard2, b: Dashboard2) => {
          return a.Children > b.Children;
        });
        setData2(data);
        setLoading2(false);
      });
    setLoading3(true);
    fetch(`https://cloudfinalproject-backend.azurewebsites.net/dashboard/3`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const data = res.data;
        data.sort((a: Dashboard3, b: Dashboard3) => {
          if (
            a.Income_range.charAt(0) === 'U' ||
            b.Income_range.charAt(0) === '1'
          ) {
            return -1;
          } else if (
            b.Income_range.charAt(0) === 'U' ||
            a.Income_range.charAt(0) === '1'
          ) {
            return 1;
          } else {
            return a.Income_range > b.Income_range;
          }
        });
        setData3(res.data);
        setLoading3(false);
      });
  }, []);

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '80vh',
        }}
      >
        <Typography component="h1" variant="h4">
          Dashboard
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyItems: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              height: '100%',
            }}
          >
            <Typography component="h2" variant="h6">
              Household Size
            </Typography>
            <ResponsiveContainer>
              {isLoading1 ? (
                <Skeleton variant="rectangular" width="400" height="100%" />
              ) : (
                <BarChart
                  width={400}
                  data={data1}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Hshd_size" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="count"
                    name="Number of Transactions"
                    fill="#8884d8"
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              height: '100%',
            }}
          >
            <Typography component="h2" variant="h6">
              Number of Children
            </Typography>
            <ResponsiveContainer>
              {isLoading2 ? (
                <Skeleton variant="rectangular" width="400" height="100%" />
              ) : (
                <BarChart
                  width={400}
                  data={data2}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Children" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="count"
                    name="Number of Transactions"
                    fill="#82ca9d"
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              height: '100%',
            }}
          >
            <Typography component="h2" variant="h6">
              Income Range
            </Typography>
            <ResponsiveContainer>
              {isLoading3 ? (
                <Skeleton variant="rectangular" width="400" height="100%" />
              ) : (
                <BarChart
                  width={400}
                  data={data3}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Income_range" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="count"
                    name="Number of Transactions"
                    fill="#ffc658"
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
