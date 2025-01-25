import { Button } from "@mui/material";
import TypewriterComponent from "typewriter-effect";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useEffect } from "react";
import { Link } from "react-router-dom";
const testimonials=[
    {
        name:"Atheeq Ur Rehman",
        Avatar:"A",
        title:"Asian Paints Franchise Owner",
        message:"Markus AI is the best AI tool I have ever used. It has helped me generate code 10x faster."
    },
    {
        name:"Junaid Mehraj",
        Avatar:"A",
        title:"HKBKCE, Bangalore",
        message:"I have been using Markus AI for the past 6 months and it has helped me a lot in my projects."
    },
    {
        name:"Ankit Kumar",
        Avatar:"A",
        title:"Software Engineer",
        message:"As a software engineer, I have to write a lot of code. Markus AI has helped me a lot in generating code."
    },
    {
        name:"Usman Khan",
        Avatar:"A",
        title:"Ethical Hacker",  
        message:"As a Music and Art enthusiast, Markus AI has helped me a lot in generating music and art."
    }
]
function Landing() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://static-bundles.visme.co/forms/vismeforms-embed.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);
  return (
    <>
      <div className="h-full  bg-[#111827] overflow-auto md:pl-[-72]">
        <div className="mx-auto max-w-screen-xl h-full w-full">
          <div className="h-full">
            <nav className="p-4 bg-transparent flex items-center justify-between">
              <div>
                <h1 className="text-white">Markus AI</h1>
              </div>
           <Link to="/login">  <div>
                <Button
                  variant="text"
                  className="w-full col-span-12 lg:col-span-2"
                  sx={{ backgroundColor: "white", color: "black" }}
                >
                  Get Started
                </Button>
              </div>
              </Link>
            </nav>
            <div className="text-white font-bold py-36 text-center space-y-5">
              <div
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5
                    font-extrabold"
              >
                <h1>The Best AI Tool for</h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  <TypewriterComponent
                    options={{
                      strings: [
                        "Code Generation.",
                        "Photo Generation.",
                        "Music Generation.",
                        "ChatBot.",
                        "AI Web Search.",
                      ],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </div>
              </div>
              <div className="text-sm md:text-xl font-light text-zinc-400">
                Create content using AI 10x faster.
              </div>
              <Link to="/login">  <div>
                <Button
                  variant="contained"
                  className="md:text-lg p-4 md:p-6 rounded-full font-semibold bg-gradient-to-r from-blue-500 to-pink-500 text-white"
                >
                  Start Generating For Free
                </Button>
              </div></Link>
              <div className="text-zinc-400 text-xs md:text-sm font-normal">
                No credit card required.
              </div>
            </div>
            <div className="px-10 pb-20">
                <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                    Testimonials
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                   {
                    testimonials.map((testimonial,index)=>(
                        <div key={index} className="bg-[#1F2937] p-4 rounded-lg">
                            <div className="text-white text-lg font-semibold">
                                {testimonial.name}
                            </div>
                            <div className="text-gray-400 text-sm font-light pb-8">
                                {testimonial.title}
                            </div>
                            <div className="text-white text-sm font-light">
                                {testimonial.message}
                            </div>
                        </div>
                    ))
                   }
                </div>
            </div>
            <div className="px-10 pb-2">
                <h2 className="text-center text-4xl text-white font-extrabold mb-4">
                    Contact Us
                </h2>
                <div 
        className="visme_d"
        data-title="Simple Contact Form"
        data-url="dm1y7pq1-simple-contact-form"
        data-domain="forms"
        data-full-page="false"
        data-min-height="500px"
        data-form-id="98289"
    ></div>
    <div className="flex justify-center space-x-4">
         <LinkedInIcon sx={{color:"white",fontSize:"40px"}} className="cursor-pointer"/>
         <GitHubIcon sx={{color:"white",fontSize:"40px"}} className="cursor-pointer"/>
    </div>
    
            </div>

            <div className="flex flex-col align-bottom relative bottom-0 w-full justify-center mb-8 border-gray-500 border-t-2 mt-4   text-center">
        <h1 className="text-white mt-4" > Markus-AI © All Rights Reserved</h1>
        <p className="text-gray-400 text-xs mt-2">
      Made with ❤️ by Imran Pasha
    </p>
    </div>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default Landing;
