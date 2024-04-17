import PieChart from './PieChart'
import VerticalBarChart from './VerticalBarChart'

export default function Charts() {
  return (
    <div className='mt-5'>
      <h1 className='text-3xl text-black font-semibold dark:text-white'>Overall</h1>

      <div className='mt-3 grid grid-cols-2'>
        <div className='col-span-1'>
          <PieChart />
        </div>

        <div className='col-span-1'>
          <VerticalBarChart />
        </div>
      </div>
    </div>
  )
}
