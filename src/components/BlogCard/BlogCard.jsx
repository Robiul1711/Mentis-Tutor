import { Link } from "react-router-dom";

export const BlogCard = ({ image, title, description, date }) => {
  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.1)] p-4 border border-gray-100 hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-shadow duration-300">

      {/* IMAGE */}
      <div className="w-full h-48 rounded-xl overflow-hidden mb-4">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <h3 className="text-[18px] font-semibold text-slate-800 mb-2 leading-snug">
        {title}
      </h3>

      <p className="text-slate-600 text-[14px] leading-relaxed mb-6">
        {description}
      </p>

      {/* FOOTER */}
      <div className="flex items-center justify-between">
        
        {/* READ MORE BUTTON */}
        <Link to="/blog-details/1" className="flex items-center gap-2 bg-[#D4E6FF] hover:bg-[#bad9ff] text-[#1E64C8] px-4 py-2 rounded-full font-medium text-[14px] transition">
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
