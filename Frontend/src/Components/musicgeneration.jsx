import { Button, Switch, Box, Skeleton } from "@mui/material";
import Heading from "./heading";
import { useState } from "react";
import axios from "axios";
import Empty from "./empty";
import { red } from "@mui/material/colors";
import LibraryMusicOutlined from "@mui/icons-material/LibraryMusicOutlined";

function MusicGeneration() {
  const [checked, setChecked] = useState(false);
  const [message, setMessage] = useState("");
  const [music, setMusic] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://markus-ai-saas-application.vercel.app/music",
        {
          message: message,
        },
        {
          responseType: "blob",
        }
      );
      const imageblob = res.data;
      const url = URL.createObjectURL(imageblob);
      setMusic(url);
     
      setMessage(" ");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Heading
        title="Music Generation"
        description="Turn your ideas into reality"
        icon={<LibraryMusicOutlined sx={{color:red[500]}} fontSize="large" />}
        iconColor="red"
        bgColor="bg-red-500/10"
      />
      <div className="px-4 lg:px-8">
        <form
          className="rounded-ld border w-full p-4 px-3 md:px-8 focus-within:shadoe-sm grid grid-cols-12 gap-2"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Ask me to generate code..."
            className="col-span-10 focus:outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full col-span-12 lg:col-span-2 text-white"
            variant="contained"
            sx={{
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "black/10",
              },
            }}
          >
            Generate
          </Button>
        </form>

        <div className="space-y-4 mt-4">
          
        </div>

        {/* Conversation */}
        <div className="space-y-4 mt-4">
        {loading && (
  <div className="flex flex-col gap-y-4">
    <div className="p-8 w-full flex flex-col items-start gap-y-4 rounded-lg bg-red-100">
      <span className="text-red-500">Generating Music</span>

      <Box sx={{ width: "100%" }}>
        <Skeleton variant="rectangular" height={80} />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation={false} />
      </Box>
    </div>
  </div>
)}

          {music.length === 0 && !loading && (
            <Empty label="No Conversation Started" />
          )}
          {music && !loading && (
            <div className="flex justify-center w-full h-full pb-4">
              <div
                className="rounded-lg overflow-hidden w-full md:w-1/2 flex flex-col p-8 bg-red-200
          justify-center items-center"
              >
                <audio controls
                  src={music}
                  alt="Generated Image"
                  className="w-full pb-4"
                />
                <Button
                  className="w-full col-span-12 lg:col-span-2 text-white"
                  variant="contained"
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "black/10",
                    },
                  }}
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = image;
                    link.download = "generated-music.mp4";
                    link.click();
                  }}
                >
                  Download
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MusicGeneration;
