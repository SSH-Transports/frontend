import React, { useState } from 'react'
import Chart from 'react-apexcharts'
import dayjs from 'dayjs'
import {
  Box,
  Typography,
  Paper,
  MenuItem,
  Select,
} from '@mui/material'
import { deliveries_mock } from '../data/deliveries'
import useMediaQuery from '@mui/material/useMediaQuery'
import DeliveryCard from '../components/DeliveryCard'

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

  const mobile = useMediaQuery('(max-width:767px)')

  filteredDeliveries.sort((a, b) => {
    const dateA = dayjs(a.date)
    const dateB = dayjs(b.date)

    if (dateA.isBefore(dateB)) return -1
    if (dateA.isAfter(dateB)) return 1

    return Number(a.id) - Number(b.id)
  })

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="flex-start"
        flexWrap="wrap"
        flexDirection={mobile ? 'column-reverse' : 'row'}
      >
        <Paper
          elevation={3}
          sx={{
            width: mobile ? 'calc(100% - 16px)' : '45%',
            p: mobile ? 1 : 3,
          }}
        >
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

        <Paper
          elevation={3}
          sx={{
            width: mobile ? 'calc(100% - 16px)' : '25%',
            p: mobile ? 1 : 3,
            mt: { xs: 3, md: 0 },
          }}
        >
          <Typography variant="h6" gutterBottom>
            Filtros
          </Typography>
            <Select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            displayEmpty
            fullWidth
            >
            <MenuItem value="Todos">Todos</MenuItem>
            <MenuItem value="Entregue">Entregues</MenuItem>
            <MenuItem value="Pendente">Pendentes</MenuItem>
            <MenuItem value="Recusada">Recusadas</MenuItem>
            </Select>

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

      <Box
        marginY={3}
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        gap={4}
      >
        {filteredDeliveries
          .sort((a, b) => Number(a.id) - Number(b.id))
          .map(delivery => (
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
                <DeliveryCard delivery={delivery} />
              </Box>
            </Box>
          ))}
      </Box>
    </div>
  )
}

export default Dashboard
