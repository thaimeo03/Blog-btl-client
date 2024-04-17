'use client'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { getAllBlogsForAdminApi } from '@/apis/admin.api'
import { BLOG_STATUS } from '@/common/constants/role.constant'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function PieChart() {
  const [pieChartData, setPieChartData] = useState([0, 0, 0])

  const { data: pieChartRes, isSuccess } = useQuery({
    queryKey: ['blogs_admin_chart'],
    queryFn: () => getAllBlogsForAdminApi({})
  })

  useEffect(() => {
    if (isSuccess) {
      let rejectedQuantity = 0
      let acceptedQuantity = 0
      let pendingQuantity = 0
      pieChartRes.data.forEach((blog) => {
        if (blog.status === BLOG_STATUS.REJECTED) {
          rejectedQuantity += 1
        } else if (blog.status === BLOG_STATUS.ACCEPTED) {
          acceptedQuantity += 1
        } else if (blog.status === BLOG_STATUS.PENDING) {
          pendingQuantity += 1
        }
      })

      setPieChartData([rejectedQuantity, acceptedQuantity, pendingQuantity])
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
