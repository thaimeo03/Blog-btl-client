'use client'
import { getBloggersQuantityAnalyticsApi } from '@/apis/admin.api'
import { useQuery } from '@tanstack/react-query'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface IDataPair {
  day: string
  count: number
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Number of accounts created during the last week'
    }
  }
}

const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function VerticalBarChart() {
  const [verticalChartData, setVerticalChartData] = useState<IDataPair[]>([])

  const { data: verticalChartRes, isSuccess } = useQuery({
    queryKey: ['bloggers_vertical_bar_chart'],
    queryFn: getBloggersQuantityAnalyticsApi
  })

  useEffect(() => {
    if (isSuccess) {
      const data = verticalChartRes.data.blogsQuantityInLastWeek
      const dataPairs = Object.entries(data).map(([key, value]) => ({ day: key, count: value }))
      setVerticalChartData(dataPairs)
    }
  }, [verticalChartRes, isSuccess])

  const verticalChartConfig = {
    labels,
    datasets: [
      {
        label: 'Accounts',
        data: verticalChartData.map((value) => value.count),
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  }

  return <Bar options={options} data={verticalChartConfig} />
}
