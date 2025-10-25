import React from 'react'
// import { CourseIcon, QAIcon, StarIcon, StudentIcon } from '../SVG/Icons'
import Title from '../common/Title'

const States = () => {
    const data = [
        {
            title:"500+",
            subtitle:"5 Star Reviews",
            // icon:<StarIcon />
        },
        {
            title:"50,000+",
            subtitle:"Question Answers",
            // icon:<QAIcon />
        },
        {
            title:"120+",
            subtitle:"Course Video",
            // icon:<CourseIcon />
        },
        {
            title:"22,225222",
            subtitle:"Students",
            // icon:<StudentIcon />
        },
                {
            title:"500+",
            subtitle:"5 Star Reviews",
            // icon:<StarIcon />
        },
        {
            title:"50,000+",
            subtitle:"Question Answers",
            // icon:<QAIcon />
        },
    ]
  return (
    <div className='section-padding-x bg-[#1C1C1C] dark:bg-[#0B1120] gap-12  py-16 grid grid-cols-3'>
        {
            data.map((item) => (
                <div className='flex  gap-4'>
                    {item.icon}
                    <div className='flex flex-col '>
                        <Title level="title32" className="text-white">{item.title}</Title>
                        <Title level="title20" className="text-[#BABABA]">{item.subtitle}</Title>

                    </div>
                </div>
            ))
        }


    </div>
  )
}

export default States