import React from "react";
import Title from "../common/Title";
import Topic from "../DashboardComponents/Topic";

const Overview = ({ data, onVideoSelect }) => {
  return (
    <div>
      <div className="space-y-4">
        <Title level="title24">{data?.title}</Title>
        <div className="text-gray-600 dark:text-gray-400">
          <span dangerouslySetInnerHTML={{ __html: data?.description }}></span>
        </div>
      </div>
      <div className="w-full flex flex-col gap-10 mt-8">
        <div className=" ">
          <Topic data={data?.sections} onVideoSelect={onVideoSelect} />
        </div>
        {/* <div className=' md:w-[60%]'></div> */}
      </div>
    </div>
  );
};

export default Overview;
