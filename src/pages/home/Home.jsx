import Banner from '@/components/HomeComponents/Banner'
import Explore from '@/components/HomeComponents/Explore'
import GetInTouch from '@/components/HomeComponents/GetInTouch'
import States from '@/components/HomeComponents/States'
import WhyChoose from '@/components/HomeComponents/WhyChoose'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Banner />
      <States />
      <Explore />
      <WhyChoose />
      <GetInTouch />
    </div>
  )
}

export default Home