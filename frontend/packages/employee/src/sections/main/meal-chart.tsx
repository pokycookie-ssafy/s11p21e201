import Chart from 'react-apexcharts'
import { useTranslate } from '@/locales'

import { useTheme } from '@mui/material'

interface IProps {
  usage: number
  total: number
}

export default function MealChart({ total, usage }: IProps) {
  const { t } = useTranslate()

  const theme = useTheme()

  return (
    <Chart
      width="100%"
      type="radialBar"
      series={[(usage / total) * 100]}
      options={{
        chart: {
          sparkline: {
            enabled: true,
          },
        },
        fill: {
          colors: [theme.palette.primary.main],
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: '40%',
            },
            track: {
              background: [theme.palette.background.paper],
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                show: false,
              },
            },
            // dataLabels: {
            //   name: {
            //     offsetY: -15,
            //     show: true,
            //     color: theme.palette.text.secondary,
            //     fontSize: '13px',
            //   },
            //   value: {
            //     offsetY: 5,
            //     color: theme.palette.text.primary,
            //     fontSize: '30px',
            //     show: true,
            //   },
            // },
          },
        },
        stroke: {
          lineCap: 'round',
        },
        // labels: [t('usage.title')],
      }}
    />
  )
}
