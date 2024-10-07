import Chart from 'react-apexcharts'

export default function MealUsage() {
  return (
    <Chart
      width="100%"
      type="radialBar"
      series={[67]}
      options={{
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 15,
              size: '70%',
            },

            dataLabels: {
              name: {
                offsetY: -15,
                show: true,
                color: '#888',
                fontSize: '13px',
              },
              value: {
                offsetY: 5,
                color: '#111',
                fontSize: '30px',
                show: true,
              },
            },
          },
        },
        stroke: {
          lineCap: 'round',
        },
        labels: ['Progress'],
      }}
    />
  )
}
