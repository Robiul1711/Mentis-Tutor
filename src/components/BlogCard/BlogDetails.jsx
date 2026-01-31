import React from "react";
import { useApiQuery } from "@/hooks/apiQuery";
import { useParams } from "react-router-dom";

export default function BlogDetails() {
  const { id } = useParams();
  const { data, isLoading } = useApiQuery({
    queryKey: ["blogs-details", id],
    url: `/blogs/details/${id}`,
  });

  // --- LOADING STATE ---
  if (isLoading) {
    return (
      <div className="section-padding-y section-padding-x animate-pulse">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb Skeleton */}
          <div className="h-4 bg-gray-200 dark:bg-gray-700 w-32 mb-6 rounded"></div>
          
          {/* Title Skeleton */}
          <div className="h-10 bg-gray-200 dark:bg-gray-700 w-3/4 mb-8 rounded"></div>

          {/* Main Image Skeleton */}
          <div className="w-full h-[380px] bg-gray-200 dark:bg-gray-700 rounded-2xl mb-8"></div>

          {/* Content Card Skeleton */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-slate-200 dark:border-gray-700">
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </div>
          </div>

          {/* Gallery Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-full h-[380px] bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN UI ---
  return (
    <div className="section-padding-y section-padding-x">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <p className="text-sm text-slate-500 mb-3">
          Blog <span className="mx-1">›</span> Blog Details
        </p>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
          {data?.data?.title}
        </h1>

        {/* Blog Main Image */}
        <div className="w-full h-[380px] rounded-2xl overflow-hidden mb-8 shadow-md">
          <img
            src={data?.data?.image}
            className="w-full h-full object-cover"
            alt={data?.data?.title}
          />
        </div>

        {/* Content Card */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-gray-700">
          {/* Description - Organized with Prose for better HTML rendering */}
          <div
            className="prose prose-slate dark:prose-invert max-w-none 
                       text-slate-700 dark:text-gray-300 
                       leading-relaxed text-lg"
            dangerouslySetInnerHTML={{ __html: data?.data?.description }}
          />
        </div>

        {/* Gallery Section */}
        {data?.data?.gallery?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {data?.data?.gallery?.map((imgSrc, index) => (
              <div
                key={index}
                className="w-full h-[380px] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={imgSrc}
                  className="w-full h-full object-cover"
                  alt={`Gallery item ${index + 1}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}