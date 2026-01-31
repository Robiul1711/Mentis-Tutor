import { BlogCard } from '@/components/BlogCard/BlogCard';
import Title from '@/components/common/Title'
import React from 'react'
import { useApiQuery } from '@/hooks/apiQuery';

// Separate Skeleton Component for better organization
const BlogCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 animate-pulse">
    {/* Image Skeleton */}
    <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
    {/* Title Skeleton */}
    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
    {/* Description Skeleton */}
    <div className="space-y-2 mb-6">
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
    </div>
    {/* Footer Skeleton */}
    <div className="flex justify-between items-center">
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-full w-28"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
    </div>
  </div>
);

const Blog = () => {
  const { data, isLoading } = useApiQuery({
    queryKey: ["blogs"],
    url: "/blogs",
  });

  return (
    <div className='section-padding-x section-padding-y'>
      {/* Top Title */}
      <div className="flex flex-col gap-4 max-w-[800px] mx-auto text-center">
        <Title level="title48">Blog</Title>
        <Title level="title20">
          Insights, tips, and strategies to help you master GCSE Maths and study smarter.
        </Title>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-12">
        {isLoading ? (
          // Render 6 skeleton cards while loading
          Array.from({ length: 6 }).map((_, i) => <BlogCardSkeleton key={i} />)
        ) : (
          data?.data?.map((post, i) => (
            <BlogCard key={i} {...post} slug={post.slug || post._id} />
          ))
        )}
      </div>
    </div>
  )
}

export default Blog;