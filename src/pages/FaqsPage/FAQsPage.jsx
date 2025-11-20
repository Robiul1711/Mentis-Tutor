
import Title from '@/components/common/Title'
import FaqSection from '@/components/FaqComponent/FaqSection'
import React from 'react'

const FAQsPage = () => {
  return (
    <div className='section-padding-x section-padding-y'>
            {/* Top Title */}
      <div className="flex flex-col gap-4 max-w-[800px] mx-auto text-center">
        <div >
          <Title level="title48">Frequently Asked Questions</Title>
        </div>

        <div >
          <Title level="title20">
           Find clear explanations to help you understand how Mentis works and what you can expect.
          </Title>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12">
        <FaqSection />
      </div>
    </div>
  )
}

export default FAQsPage