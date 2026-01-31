import { Link } from "react-router-dom";

export const BlogCard = ({ image, title, description, date, slug }) => {
  return (
    <div className="bg-white dark:bg-gray-800 dark:border-Tertiary rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.1)] p-4 border border-gray-100 hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-shadow duration-300">

      {/* IMAGE */}
      <div className="w-full h-48 rounded-xl overflow-hidden mb-4">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <h3 className="text-[18px] font-semibold text-slate-800 dark:text-white mb-2 leading-snug line-clamp-1">
        {title}
      </h3>

      <p className="text-slate-600 dark:text-slate-400 text-[14px] leading-relaxed mb-6 line-clamp-2" dangerouslySetInnerHTML={{__html:description}}>
       
      </p>

      {/* FOOTER */}
      <div className="flex items-center justify-between">
        
        {/* READ MORE BUTTON */}
        <Link to={`/blog-details/${slug}`} className="flex items-center gap-2 bg-[#D4E6FF] hover:bg-[#bad9ff] text-[#1E64C8] px-4 py-2 rounded-full font-medium text-[14px] transition">
          Read More
          <span className="text-[16px]">➤</span>
        </Link>

        {/* DATE */}
        <span className="text-[13px] text-slate-500">
          {date}
        </span>

      </div>
    </div>
  );
};
