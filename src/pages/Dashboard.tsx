import React, { useState } from 'react'
import Chart from 'react-apexcharts'
import dayjs from 'dayjs'
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  MenuItem,
  Select,
} from '@mui/material'
import { deliveries_mock } from '../data/deliveries'

const getDateRange = (filter: string) => {
  const now = new Date()
  const start = new Date()
  const end = new Date()

  switch (filter) {
    case 'Today':
      start.setHours(0, 0, 0, 0)
      end.setHours(23, 59, 59, 999)
      break
    case 'ThisWeek':
      start.setDate(now.getDate() - now.getDay())
      start.setHours(0, 0, 0, 0)
      end.setDate(start.getDate() + 6)
      end.setHours(23, 59, 59, 999)
      break
    case 'ThisMonth':
      start.setDate(1)
      start.setHours(0, 0, 0, 0)
      end.setMonth(now.getMonth() + 1, 0)
      end.setHours(23, 59, 59, 999)
      break
    case 'ThisYear':
      start.setMonth(0, 1)
      start.setHours(0, 0, 0, 0)
      end.setMonth(11, 31)
      end.setHours(23, 59, 59, 999)
      break
    default:
      return null
  }
  return { start, end }
}

const Dashboard = () => {
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [dateFilter, setDateFilter] = useState('Todas')

  let filteredDeliveries = deliveries_mock.filter(d =>
    statusFilter === 'Todos' ? true : d.status === statusFilter,
  )

  const range = getDateRange(dateFilter)
  if (range) {
    const start = dayjs(range.start)
    const end = dayjs(range.end)

    filteredDeliveries = filteredDeliveries.filter(d => {
      const deliveryDate = dayjs(d.date)
      const isOnTheRange =
        deliveryDate.isAfter(start) && deliveryDate.isBefore(end)
      const isToday =
        deliveryDate.isSame(start, 'date') && deliveryDate.isSame(end, 'date')

      return isOnTheRange || isToday
    })
  }

  const groupedDeliveries = filteredDeliveries.reduce((acc, delivery) => {
    const deliveryDate = dayjs(delivery.date)
    const key = dateFilter === 'Today' ? deliveryDate.format('YYYY-MM-DD') : deliveryDate.format('YYYY-MM')

    if (!acc[key]) {
      acc[key] = []
    }

    acc[key].push(delivery)
    return acc
  }, {} as { [key: string]: typeof filteredDeliveries })


  console.log(groupedDeliveries)

  const chartData = {
    series: filteredDeliveries.map(delivery => delivery.cost),
    options: {
      labels: filteredDeliveries.map(delivery => {
        const labels = {
          Today: delivery.id,
          Todas: dayjs(delivery.date).format('YYYY'),
          ThisWeek: dayjs(delivery.date).format('DD/MM'),
          ThisMonth: dayjs(delivery.date).format('DD/MM'),
          ThisYear: dayjs(delivery.date).format('MM'),
        }[dateFilter]

        if (!labels) return delivery.id

        return labels
      }),
      legend: { position: 'bottom' as const },
      chart: { type: 'pie' as const, toolbar: { show: false } },
    },
  }

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      alignItems="flex-start"
      flexWrap="wrap"
      sx={{ height: '100vh', bgcolor: '#f9f9f9', p: 4 }}
    >
      <Paper elevation={3} sx={{ width: '45%', p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Nossas Entregas
        </Typography>
        {filteredDeliveries.length > 0 ? (
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

      <Paper elevation={3} sx={{ width: '25%', p: 3, mt: { xs: 3, md: 0 } }}>
        <Typography variant="h6" gutterBottom>
          Filtros
        </Typography>
        <RadioGroup
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <FormControlLabel value="Todos" control={<Radio />} label="Todos" />
          <FormControlLabel
            value="Entregue"
            control={<Radio />}
            label="Entregues"
          />
          <FormControlLabel
            value="Pendente"
            control={<Radio />}
            label="Pendentes"
          />
          <FormControlLabel
            value="Recusada"
            control={<Radio />}
            label="Recusadas"
          />
        </RadioGroup>

        <Select
          value={dateFilter}
          onChange={e => setDateFilter(e.target.value)}
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
  )
}

export default Dashboard
