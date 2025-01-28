import {
  Button,
  Box,
  Skeleton,
  Card,
  CardMedia,
  Typography,
} from "@mui/material";
import Heading from "../heading";
import { useState } from "react";
import axios from "axios";
import { pink } from "@mui/material/colors";
import Empty from "../empty";
import ReactMarkdown from "react-markdown"; // Import React Markdown
import { Link } from "@mui/material";
import ManageSearchOutlined from "@mui/icons-material/ManageSearchOutlined";
function Aisearch() {
  const [message, setMessage] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setError("Please enter a message to search.");
      return;
    }

    setLoading(true);
    setError(""); // Reset error

    try {
      const res = await axios.post("https://markus-ai-saas-application.vercel.app/api/v1/aisearch", {
        message: message,
      });

      const results = res.data.results; // Adjust based on your API response
      setSearchResults(results); // Adjust according to your API response structure
      setSummary(results.summary || ""); // Safely access summary
      setMessage(""); // Reset the message
    } catch (err) {
      console.log(err);
      setError("An error occurred while fetching search results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Heading
        title="AI Web Search"
        description="Turn your ideas into reality"
        icon={
          <ManageSearchOutlined sx={{ color: pink[500] }} fontSize="large" />
        }
        iconColor="pink"
        bgColor="bg-pink-500/10"
      />

      <div className="px-4 lg:px-8">
        <form
          className="rounded-ld border w-full p-4 px-3 md:px-8 focus-within:shadow-sm grid grid-cols-12 gap-2"
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
        
        {error && <Typography color="error">{error}</Typography>}
        <p className="text-gray-400 text-center mt-4">If your request doesn’t work immediately, a quick retry usually resolves it! 🛠️</p>

        <div className="space-y-4 mt-4 ">
         
        </div>

        {/* Conversation Section */}
  
          {loading && (
                  <div className="space-y-4 mt-4 pb-8  p-4 rounded-lg">
            <div className="flex flex-col-reverse gap-y-4">
              <div className="p-8 w-full flex flex-col items-start gap-y-4 rounded-lg bg-pink-100">
                <span className="text-pink-500">
                  Generating Search Results...
                </span>
                <Box sx={{ width: "100%" }}>
                  <Skeleton variant="rectangular" height={80} />
                  <Skeleton variant="text" animation="wave" />
                  <Skeleton variant="text" animation={false} />
                </Box>
              </div>
            </div>
            </div>
          )}
        
          {searchResults.length === 0 && !loading && (
            <Empty label="No Conversation Started" />
          )}
          {searchResults && !loading && summary && (
            <div className="bg-pink-50 rounded-xl p-8">
              {summary && (
                <div className="mb-6">
                  <Typography variant="h6" gutterBottom>
                    Seacrch results
                  </Typography>
                  <ReactMarkdown
                    components={{
                      a: ({ node, ...props }) => (
                        <Link
                          href={props.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          {...props}
                        >
                          {props.children}
                        </Link>
                      ),
                    }}
                  >
                    {summary}
                  </ReactMarkdown>
                </div>
              )}

              {/* Display Images */}
              {searchResults.images && (
                <div className="mt-8">
                  <Typography variant="h6" gutterBottom>
                    Related Images
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 2,
                      justifyContent: "center",
                    }}
                  >
                    {searchResults.images.slice(0, 3).map((image, index) => (
                      <Card
                        key={index}
                        sx={{
                          width: "200px",
                          height: "200px",
                          position: "relative",
                        }}
                      >
                        <CardMedia
                          component="img"
                          sx={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                          }}
                          image={image}
                          alt={`Related Image ${index + 1}`}
                        />
                      </Card>
                    ))}
                  </Box>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    
  );
}

export default Aisearch;
