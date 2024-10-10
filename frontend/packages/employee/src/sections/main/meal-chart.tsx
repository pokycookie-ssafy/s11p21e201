import Chart from 'react-apexcharts'

import { useTheme } from '@mui/material'

interface IProps {
  usage: number
  total: number
}

export default function MealChart({ total, usage }: IProps) {
  const theme = useTheme()

  return (
    <Chart
      width={150}
      type="radialBar"
      series={[Math.round((usage / total) * 100)]}
      options={{
        fill: {
          colors: [theme.palette.primary.main],
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: '30%',
            },
            track: {
              background: [theme.palette.background.paper],
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                offsetY: 4,
                color: theme.palette.text.primary,
                fontSize: '12px',
                show: true,
              },
            },
          },
        },
        stroke: {
          lineCap: 'round',
        },
      }}
    />
  )
}
