import { BlogCard } from '@/components/BlogCard/BlogCard';
import Title from '@/components/common/Title'
import React from 'react'
import blog from '../../assets/images/blog.jpg'
 const posts = [
    {
      image: blog,
      title: "How to revise GCSE Maths effectively (UK-specific)",
      description:
        "Revising for GCSE Maths can feel overwhelming especially when you're balancing school, homework, and other subjects...",
      date: "December 16, 2024",
    },
    {
      image: blog,
      title: "How many past papers should a student do?",
      description:
        "Revising for GCSE Maths can feel overwhelming… Maths isn’t about memorising. It’s about practising the right topics.",
      date: "December 16, 2024",
    },
    {
      image: blog,
      title: "The Grade 7 barrier & how to break it",
      description:
        "Revising for GCSE Maths can feel overwhelming especially when you're balancing school, homework…",
      date: "December 16, 2024",
    },
  ];
const Blog = () => {
  return (
    <div className='section-padding-x section-padding-y'>
      {/* Top Title */}
      <div className="flex flex-col gap-4 max-w-[800px] mx-auto text-center">
        <div >
          <Title level="title48">Blog</Title>
        </div>

        <div >
          <Title level="title20">
     Insights, tips, and strategies to help you master GCSE Maths and study smarter.
          </Title>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-12">
      {posts.map((post, i) => (
        <BlogCard key={i} {...post} />
      ))}
    </div>
    </div>
  )
}

export default Blog