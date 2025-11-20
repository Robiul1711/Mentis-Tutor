const ReflectionNotes = () => {
  return (
    <div className=" p-6 rounded-2xl shadow-sm border border-gray-100">
      {/* Title */}
      <h2 className="text-xl font-semibold  mb-6">
        Reflection & Notes
      </h2>

      {/* Reflection Inputs */}
      <div className="space-y-6">

        {/* What went well */}
        <textarea
          placeholder="What went well?"
          className="w-full h-28 rounded-xl border border-[#90A4B8] focus:border-[#1F3A5F] focus:ring-0 outline-none p-4 text-[15px]  resize-none"
        ></textarea>

        {/* What to improve next time */}
        <textarea
          placeholder="What to improve next time?"
          className="w-full h-28 rounded-xl border border-[#90A4B8] focus:border-[#1F3A5F] focus:ring-0 outline-none p-4 text-[15px]  resize-none"
        ></textarea>

        {/* Button */}
        <button className="bg-[#1F3A5F] text-white font-medium px-8 py-3 rounded-lg hover:bg-[#162C46] transition">
          Save Reflection
        </button>

      </div>
    </div>
  );
};

export default ReflectionNotes;
