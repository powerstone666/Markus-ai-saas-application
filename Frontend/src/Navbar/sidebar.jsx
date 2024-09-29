import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import FilterVintageOutlinedIcon from "@mui/icons-material/FilterVintageOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import { red, pink, orange } from "@mui/material/colors";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import CodeOffOutlinedIcon from "@mui/icons-material/CodeOffOutlined";
import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <>
      <div className="h-full relative">
        <div className="hidden h-full md:flex md:flex-col md:w-72 md:fixed md:inset-y-0 z-[80] bg-gray-900">
          <div className="px-3 py-2 flex mt-4">
            <div className="relative h-8 w-8 mr-4 ">
              <img src="https://cdn-icons-png.flaticon.com/128/9626/9626716.png" />
            </div>
            <h1 className="text-2xl text-white font-bold">Tech & Work</h1>
          </div>

          <Link to="/dashboard">
            {" "}
            <div
              className="flex space-y-1 text-sm group p-4 w-full justify-start font-medium hover:text-white hover:bg-white/10 rounded-lg transition mt-10 
                  cursor-pointer"
            >
              <div className="mr-3">
                <DashboardOutlinedIcon color="primary" fontSize="large" />
              </div>
              <div className="flex flex-1 items-center text-blue-600 text-xl ">
                Dashboard
              </div>
            </div>
          </Link>
          <Link to="/conversation">
            <div className="flex space-y-1  cursor-pointer text-sm group p-4 w-full justify-start font-medium hover:text-white hover:bg-white/10 rounded-lg transition ">
              <div className="mr-3">
                <SmsOutlinedIcon
                  color="secondary"
                  fontSize="large"
                  className="w-10 h-10"
                />
              </div>
              <div className="flex flex-1 items-center text-purple-800 text-xl ">
                Conversation
              </div>
            </div>
          </Link>
          <Link to="/imagegeneration">
            <div className="flex  cursor-pointer space-y-1 text-sm group p-4 w-full justify-start font-medium hover:text-white hover:bg-white/10 rounded-lg transition ">
              <div className="mr-3">
                <FilterVintageOutlinedIcon color="success" fontSize="large" />
              </div>
              <div className="flex flex-1 items-center text-green-700 text-xl ">
                Image Generation
              </div>
            </div>
          </Link>
          <Link to="/musicgeneration">
            <div className="flex space-y-1  cursor-pointer text-sm group p-4 w-full justify-start font-medium hover:text-white hover:bg-white/10 rounded-lg transition ">
              <div className="mr-3">
                <LibraryMusicOutlinedIcon
                  sx={{ color: red[700] }}
                  fontSize="large"
                />
              </div>
              <div className="flex flex-1 items-center text-red-700 text-xl ">
                Music Generation
              </div>
            </div>
          </Link>
          <Link to="/aisearch">
            <div className="flex  cursor-pointer space-y-1 text-sm group p-4 w-full justify-start font-medium hover:text-white hover:bg-white/10 rounded-lg transition ">
              <div className="mr-3">
                <ManageSearchOutlinedIcon
                  sx={{ color: pink[500] }}
                  fontSize="large"
                />
              </div>
              <div className="flex flex-1 items-center text-pink-800 text-xl ">
                AI Web Search
              </div>
            </div>
          </Link>
          <Link to="/codegeneration">
            <div className="flex  cursor-pointer space-y-1 text-sm group p-4 w-full justify-start font-medium hover:text-white hover:bg-white/10 rounded-lg transition ">
              <div className="mr-3">
                <CodeOffOutlinedIcon
                  sx={{ color: orange[500] }}
                  fontSize="large"
                />
              </div>
              <div className="flex flex-1 items-center text-orange-700 text-xl ">
                Code Generation
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
export default Sidebar;
