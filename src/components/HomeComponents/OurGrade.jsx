import React from 'react'
import { MdArrowOutward } from 'react-icons/md'
import CommonButton from '../common/CommonButton'
import Title from '../common/Title'

const OurGrade = () => {
  return (
  <section className="w-full  py-12 px-4">
       <div className="text-center max-w-3xl mx-auto">
 
         {/* Title */}
         <Title level="title48" className="font-bold">
       Our Grade 9 starts here. 
         </Title>
         <Title level="title20" className="font-bold ">
        Your journey to success begins today
         </Title>
              <CommonButton link={'/dashboard'} variant="secondary" className="mt-6 group max-w-sm mx-auto">
            {" "}
            Start Your 2 Day Free Trial{" "}
            <span className="rounded-full p-1 bg-black group-hover:bg-Secondary">
              {" "}
              <MdArrowOutward className="text-Primary text-2xl group-hover:text-white" />{" "}
            </span>{" "}
          </CommonButton>
       
       </div>
     </section>
  )
}

export default OurGrade