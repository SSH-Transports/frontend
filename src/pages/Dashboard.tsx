import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { Box, Typography, Paper, MenuItem, Select } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import getFilter from '../services/getReportRange';
import { Order } from '../types/Order';
import DeliveryCard from '../components/DeliveryCard';

type ChartData = {
  series: number[];
  options: {
    labels: string[];
    legend: { position: 'bottom' };
    chart: { type: 'pie'; toolbar: { show: boolean } };
  };
};

const Dashboard = () => {
  dayjs.extend(weekOfYear);
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [dateFilter, setDateFilter] = useState('Todas');
  const [orders, setOrders] = useState<Order[]>([]);
  const [chartData, setChartData] = useState<ChartData>({
    series: [],
    options: {
      labels: [],
      legend: { position: 'bottom' },
      chart: { type: 'pie', toolbar: { show: false } },
    },
  });

  const mobile = useMediaQuery('(max-width:767px)');

  const fetchOrders = async () => {
    try {
      const filter = {
        filter:
          dateFilter === 'Today'
            ? 'Today'
            : dateFilter === 'ThisWeek'
            ? 'Week'
            : dateFilter === 'ThisMonth'
            ? 'Month'
            : dateFilter === 'ThisYear'
            ? 'Year'
            : undefined,
        status:
          statusFilter === 'Todos'
            ? undefined
            : statusFilter.toUpperCase().replace(' ', '_'),
      };

      const data = await getFilter(filter);
      const normalizedOrders: Order[] = [];

      Object.entries(data).forEach(([, order]: [string, Order]) => {
        normalizedOrders.push(order);
      });

      setOrders(normalizedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, dateFilter]);

  useEffect(() => {
    if (orders.length === 0) {
      return;
    }

    try {
      const deliveriesGrouped = orders.reduce(
        (acc, order) => {
          const createdAt = dayjs(order.createdAt);
          let label = '';

          if (dateFilter === 'ThisYear') {
            label = createdAt.format('MM/YYYY');
          }

          else if (dateFilter === 'ThisMonth') {
            label = `Semana ${createdAt.week()}`; 
          }

          else if (dateFilter === 'ThisWeek') {
            label = createdAt.format('dddd'); 
          }

          else if (dateFilter === 'Today') {
            label = createdAt.format('HH:mm');
          }

          else if (dateFilter === 'Todas') {
            label = createdAt.format('MM/YYYY'); // Meses do ano
          }

          if (!acc[label]) acc[label] = 0;
          acc[label] += order.cost ?? 0;
          return acc;
        },
        {} as Record<string, number>
      );

      if (Object.keys(deliveriesGrouped).length === 0) {
        setChartData({
          series: [],
          options: {
            labels: ['Nenhuma entrega encontrada'],
            legend: { position: 'bottom' },
            chart: { type: 'pie', toolbar: { show: false } },
          },
        });
      } else {
        setChartData({
          series: Object.values(deliveriesGrouped),
          options: {
            labels: Object.keys(deliveriesGrouped),
            legend: { position: 'bottom' },
            chart: { type: 'pie', toolbar: { show: false } },
          },
        });
      }
    } catch (error) {
      console.error('Error updating chart data:', error);
    }
  }, [orders, dateFilter]);

  const filteredDeliveries: Order[] = orders.filter((order) => {
    const statusMatch =
      statusFilter === 'Todos' || order.status === statusFilter;
    const dateMatch =
      dateFilter === 'Todas' ||
      (dateFilter === 'Today' && dayjs(order.createdAt).isSame(dayjs(), 'day')) ||
      (dateFilter === 'ThisWeek' &&
        dayjs(order.createdAt).isSame(dayjs(), 'week')) ||
      (dateFilter === 'ThisMonth' &&
        dayjs(order.createdAt).isSame(dayjs(), 'month')) ||
      (dateFilter === 'ThisYear' &&
        dayjs(order.createdAt).isSame(dayjs(), 'year'));
    return statusMatch && dateMatch;
  });

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="flex-start"
        flexDirection={mobile ? 'column' : 'row'}
        flexWrap="wrap"
      >
        <Paper
          elevation={3}
          sx={{
            width: mobile ? '100%' : '45%', 
            p: mobile ? 1 : 3,
            mb: mobile ? 2 : 0,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Nossas Entregas
          </Typography>
          {chartData.series.length > 0 ? (
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="pie"
              height={350}
            />
          ) : (
            <Typography color="textSecondary">
              Nenhuma entrega encontrada.
            </Typography>
          )}
        </Paper>

        <Paper
          elevation={3}
          sx={{
            width: mobile ? '100%' : '25%',
            p: mobile ? 1 : 3,
            mt: { xs: 3, md: 0 },
          }}
        >
          <Typography variant="h6" gutterBottom>
            Filtros
          </Typography>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            displayEmpty
            fullWidth
          >
            <MenuItem value="Todos">Todos</MenuItem>
            <MenuItem value="WAITING_RESPONSE">Aguardando Resposta</MenuItem>
            <MenuItem value="SEPARATING">Separando</MenuItem>
            <MenuItem value="ON_THE_WAY">A Caminho</MenuItem>
            <MenuItem value="DELIVERED">Entregue</MenuItem>
            <MenuItem value="REFUSED">Recusada</MenuItem>
          </Select>

          <Select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            displayEmpty
            fullWidth
            sx={{ mt: 3 }}
          >
            <MenuItem value="Todas">Todas as Datas</MenuItem>
            <MenuItem value="Today">Hoje</MenuItem>
            <MenuItem value="ThisWeek">Esta Semana</MenuItem>
            <MenuItem value="ThisMonth">Este Mês</MenuItem>
            <MenuItem value="ThisYear">Este Ano</MenuItem>
          </Select>
        </Paper>
      </Box>
      <Box
        marginY={3}
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        gap={4}
      >
        {filteredDeliveries
          .sort((a: Order, b: Order) => Number(a.id) - Number(b.id))
          .map((delivery: Order) => (
            <Box
              key={delivery.id}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: '8px',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  width: '70%',
                  height: '200px',
                  borderRadius: '8px',
                  border: '10px solid #06486b',
                  boxShadow: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <DeliveryCard
                  delivery={{
                    id: delivery.id ?? 'N/A',
                    distance: delivery.distance ? delivery.distance.toString() : 'N/A',
                    cost: delivery.cost ?? 0,
                    status: delivery.status,
                  }}
                />
              </Box>
            </Box>
          ))}
      </Box>
    </div>
  );
};

export default Dashboard;
