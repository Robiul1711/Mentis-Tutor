import React from 'react'
import Title from '../common/Title'
import Topic from '../DashboardComponents/Topic'

const Overview = () => {
  return (
    <div>
    <div className='space-y-4'>
        <Title level="title24">Master Algebra with Confidence Build Strong Foundations for Exams</Title>
        <Title level="title18">Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.dolor sit amet, consectetur adipiscing elited do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Title>
    </div>
      <div className='w-full gap-10 mt-8'>
      <div className=' w-[40%]'>
        <Topic />
      </div>
      <div className=' w-[60%]'></div>
      </div>
    </div>
  )
}

export default Overview