import { Button, Box, Skeleton } from "@mui/material";
import Heading from "../heading";
import { useState } from "react";
import axios from "axios";
import Empty from "../empty";
import CodeOffOutlined from "@mui/icons-material/CodeOffOutlined";
import { orange } from "@mui/material/colors";
import ReactMarkdown from "react-markdown";
import { Typography } from "@mui/material";
import { useContext } from "react";
import { Context } from "../../main";
function CodeGeneration() {
  const {url}=useContext(Context);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const userMessage = {
      role: "user",
      content: message,
    };

    const newMessages = [...conversation, userMessage];
    setConversation(newMessages);

    try {
    
      const res = await axios.post(`${url}/api/v1/codegeneration`, {
        message: newMessages,
      });
        
      const apiMessage = {
        role: "ai",
        content: res.data.message,
      };

      setConversation((current) => [...current, apiMessage]);
      setMessage("");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "An error occurred while fetching results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Heading
        title="Code Generation"
        description="Generate Code with AI"
        icon={<CodeOffOutlined sx={{ color: orange[500] }} fontSize="large" />}
        iconColor="purple"
        bgColor="bg-yellow-500/10"
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
        {error && <Typography color="error">{error}</Typography>}
        <p className="text-gray-400 text-center mt-4">If your request doesn’t work immediately, a quick retry usually resolves it! 🛠️</p>
        <div className="space-y-4 mt-4">
         
        </div>

        {/* Conversation */}
        <div className="space-y-4 mt-4">
          {loading && (
            <div className="flex flex-col-reverse gap-y-4">
              <div className="p-8 w-full flex items-start gap-x-8 rounded-lg bg-orange-100">
                <span className="text-orange-500">AI: </span>

                <Box sx={{ width: "100%" }}>
                  <Skeleton variant="rectangular" height={80} />
                  <Skeleton variant="text" animation="wave" />
                  <Skeleton variant="text" animation={false} />
                </Box>
              </div>
            </div>
          )}
          {conversation.length === 0 && !loading && (
            <Empty label="No Conversation Started" />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {conversation.map((mes, index) => (
              <div
                key={index}
                className={`p-8 w-full flex items-start gap-x-8 rounded-lg ${
                  mes.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-orange-50"
                }`}
              >
                <span
                  className={
                    mes.role === "user" ? "text-blue-500" : "text-orange-500"
                  }
                >
                  {mes.role === "user" ? "You: " : "AI: "}
                </span>
                <ReactMarkdown
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className="overflow-auto w-full mt-2 bg-black/10 p-2 rounded-lg">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code className="bg-black/10 rounded-lg p-1" {...props} />
                    ),
                  }}
                  className="text-sm overflow-hidden leading-7"
                >
                  {mes.content}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeGeneration;
