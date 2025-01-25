import React from "react";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import FilterVintageOutlinedIcon from "@mui/icons-material/FilterVintageOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import {  pink } from "@mui/material/colors";
import CodeOffOutlinedIcon from "@mui/icons-material/CodeOffOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import ManageSearchOutlined from "@mui/icons-material/ManageSearchOutlined";
const tools = [
  {
    label: "Conversation",
    icon: <SmsOutlinedIcon color="secondary" fontSize="large" />,
    color: "purple",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Image Generation",
    icon: <FilterVintageOutlinedIcon color="success" fontSize="large" />,
    color: "green",
    bgColor: "bg-green-500/10",
  },
  {
    label: "Music Generation",
    icon: <LibraryMusicOutlinedIcon color="error" fontSize="large" />,
    color: "red",
    bgColor: "bg-red-500/10",
  },
  {
    label: "AI Web Search",
    icon: (
      <ManageSearchOutlined sx={{ color: pink[500] }} fontSize="large" />
    ),
    color: "blue",
    bgColor: "bg-blue-500/10",
  },
  {
    label: "Code Generation",
    icon: <CodeOffOutlinedIcon color="warning" fontSize="large" />,
    color: "yellow",
    bgColor: "bg-yellow-500/10",
  },
];

function Dashboard() {
    const navigate = useNavigate();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center pt-4">
          Explore the power of AI
        </h2>
        <p className="text-gray-400 font-bold text-sm md:text-lg text-center ">
          Chat with the smartest AI - Experience the power of AI
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool, index) => (
        
          <div
            key={index}
            className={`flex space-y-1 text-sm group p-4 w-full justify-between items-center font-medium  rounded-lg border-black/5  border-2
                     hover:shadow-md transition cursor-pointer`}  onClick={()=>{
                        switch(tool.label){
                            case "Conversation":
                                navigate("/conversation");
                                break;
                            case "Image Generation":
                                navigate("/imagegeneration");
                                break;
                            case "Music Generation":
                                navigate("/musicgeneration");
                                break;
                            case "Video Generation":
                                navigate("/videogeneration");
                                break;
                            case "Code Generation":
                                navigate("/codegeneration");
                                break;
                                case "AI Web Search":
                                navigate("/aisearch");
                                break;
                        }
                     }}
          >
            
            <div
              className={`mr-3 p-2 w-fit rounded-md transition ${tool.bgColor} `}
            >
              {tool.icon}
            </div>
            <div className="flex flex-1 items-center text-${tool.color}-800 text-xl ">
              {tool.label}
            </div>
            <div className={`p-2 w-fit rounded-md transition ${tool.bgColor} `}>
              <ArrowForwardIcon />
            </div>
          </div>
            
        ))}
      </div>
    </div>
  );
}
export default Dashboard;
