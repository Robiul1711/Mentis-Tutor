
import React from 'react';
import Title from '../common/Title'
import learn from '@/assets/images/learn.jpg';
import practice from '@/assets/images/practice.jpg';
import support from '@/assets/images/support.jpg';
import achive from '@/assets/images/achive.jpg';
const steps = [
    {
      number: 1,
      title: 'Learn',
      description: 'Watch structured GCSE videos',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600'
    },
    {
      number: 2,
      title: 'Practise',
      description: 'Complete smart quizzes',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    {
      number: 3,
      title: 'Get support',
      description: 'Ask questions anytime.',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      number: 4,
      title: 'Achieve',
      description: 'Track your growth to Grade 9',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    }
  ];
const HowMentisWork = () => {
  return (
        <section className="section-padding-x section-padding-y">
          {/* Heading */}
          <div className="text-center mb-10">
            <Title level="title48" className="dark:text-white">
            HOW MENTIS WORKS
            </Title>
            <Title level="title20" className="text-gray-700 dark:text-gray-300 max-w-[1020px] mx-auto mt-4">
             Learn smarter, track your progress, and get guidance whenever you need it that’s how Mentis makes learning easy.
            </Title>
          </div>
            <div className="flex items-center justify-center mb-12 relative">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              {/* Circle with number */}
              <div className="flex flex-col items-center z-10">
                <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {step.number}
                </div>
              </div>
              
              {/* Connecting arrow */}
              {index < steps.length - 1 && (
                <div className="relative mx-24 w-32 h-12">
                  <svg 
                    className="absolute top-0 left-0 w-full h-full" 
                    viewBox="0 0 130 50"
                    fill="none"
                  >
                    <path
                      d="M 0 25 Q 65 5, 130 25"
                      stroke="#60A5FA"
                      strokeWidth="3"
                      fill="none"
                    />
                    <polygon
                      points="210,25 122,21 122,29"
                      fill="#60A5FA"
                    />
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
           
            return (
              <div 
                key={step.number}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Icon illustration area */}
                <div className={`${step.bgColor} rounded-xl p-8 mb-4 flex items-center justify-center h-48`}>
                 <img src={step.number === 1 ? learn : step.number === 2 ? practice : step.number === 3 ? support : achive} alt="" />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 my-2 text-center">
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-gray-600 text-center leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
          </section>
  )
}

export default HowMentisWork