import Banner from '@/components/HomeComponents/Banner'
import Explore from '@/components/HomeComponents/Explore'
import GetInTouch from '@/components/HomeComponents/GetInTouch'
import GradeCards from '@/components/HomeComponents/GradeCards'
import HowMentisWork from '@/components/HomeComponents/HowMentisWork'
import PricingComparison from '@/components/HomeComponents/PricingComparison'
import States from '@/components/HomeComponents/States'
import WhyChoose from '@/components/HomeComponents/WhyChoose'
import WhyInsideMentis from '@/components/HomeComponents/FeaturesSlider'
import WhyMentisExgist from '@/components/HomeComponents/WhyMentisExgist'
import WhyMentisWork from '@/components/HomeComponents/WhyMentisWork'
import React from 'react'
import FeaturesSlider from '@/components/HomeComponents/FeaturesSlider'
import Guarantee from '@/components/HomeComponents/Guarantee'
import OurGrade from '@/components/HomeComponents/OurGrade'
import Testimonials from '@/components/HomeComponents/Testimonials'

const Home = () => {
  return (
    <div className='section-padding-y space-y-28'>
      <Banner />
      <WhyMentisExgist />
      <States />
      <WhyMentisWork />
      <HowMentisWork />
      <GradeCards />
      <Explore />
      <PricingComparison />
      <FeaturesSlider />
      <Testimonials />
      <Guarantee />
      <OurGrade />
      {/* <WhyChoose /> */}
      {/* <GetInTouch /> */}
    </div>
  )
}

export default Home