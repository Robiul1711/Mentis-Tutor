import AbourHero from '@/components/AboutComponents/AbourHero'
import AboutBanner from '@/components/AboutComponents/AboutBanner'
import GetRecognized from '@/components/AboutComponents/GetRecognized'
import MeetYourTutor from '@/components/AboutComponents/MeetYourTutor'
import GetInTouch from '@/components/HomeComponents/GetInTouch'
import States from '@/components/HomeComponents/States'
import React from 'react'

const About = () => {
  return (
    <div className=''>
        <AboutBanner/>
        <AbourHero/>
        <MeetYourTutor/>
        <GetRecognized/>
          <States />
            <GetInTouch />
    </div>
  )
}

export default About