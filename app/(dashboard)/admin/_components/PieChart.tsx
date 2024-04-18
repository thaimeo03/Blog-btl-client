'use client'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { getBlogsQuantityAnalyticsApi } from '@/apis/admin.api'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function PieChart() {
  const [pieChartData, setPieChartData] = useState([0, 0, 0])

  const { data: pieChartRes, isSuccess } = useQuery({
    queryKey: ['blogs_pie_chart'],
    queryFn: getBlogsQuantityAnalyticsApi
  })

  useEffect(() => {
    if (isSuccess) {
      setPieChartData([pieChartRes.data.rejectedBlogs, pieChartRes.data.acceptedBlogs, pieChartRes.data.pendingBlogs])
    }
  }, [pieChartRes, isSuccess])

  const pieChartConfig = {
    labels: ['Rejected', 'Accepted', 'Pending'],
    datasets: [
      {
        label: 'Quantity',
        data: pieChartData,
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        hoverOffset: 4
      }
    ]
  }

  return (
    <Pie
      data={pieChartConfig}
      options={{
        maintainAspectRatio: false,
        responsive: true
      }}
      height={300}
    />
  )
}
