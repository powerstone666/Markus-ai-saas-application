import { Button, Switch, Box, Skeleton } from "@mui/material";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import { useState } from "react";
import axios from "axios";
import Empty from "./empty";
import Loader from "./loader";
import ReactMarkdown from "react-markdown";
import Heading from "./heading";

function Conversation() {
  const [checked, setChecked] = useState(false);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const userMessage = {
      role: "user",
      content: message,
    };

    // Update conversation with user message
    const newMessages = [...conversation, userMessage];
    setConversation(newMessages);

    try {
      const res = await axios.post("https://markus-ai-saas-application.vercel.app/models", {
        message: newMessages,
      });

      const apiMessage = {
        role: "ai",
        content: res.data.message,
      };

      setConversation((current) => [...current, apiMessage]);
      setMessage("");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false); // Stop loading in case of error
    }
  };

  return (
    <div>
      <Heading
        title="Conversation"
        description="Chat with the smartest AI - Experience the power of AI"
        icon={<SmsOutlinedIcon color="secondary" fontSize="large" />}
        iconColor="purple"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <form
          className="rounded-lg border w-full p-4 px-3 md:px-8 focus-within:shadow-sm grid grid-cols-12 gap-2"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Type a message"
            className="col-span-10 focus:outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            type="submit"
            className="w-full col-span-12 lg:col-span-2 text-white"
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: "black", // Custom background color
              color: "white", // Custom text color
              "&:hover": {
                backgroundColor: "black/10", // Hover color
              },
            }}
          >
            Generate
          </Button>
        </form>

        <div className="space-y-4 mt-4">
          <h1>Additional Parameters</h1>
          <div className="flex space-x-4">
            <Switch onClick={() => setChecked(!checked)} />
            <div className="border-2 border-purple-800 p-2 rounded-md">
              <p className="text-purple-700">PRO</p>
            </div>
          </div>
          {checked ? <h1>Gemini</h1> : <h1>Not Gemini</h1>}
        </div>

        {/* Conversation */}
        <div className="space-y-4 mt-4">
          {loading && (
            <div className="flex flex-col-reverse gap-y-4">
              <div className="p-8 w-full flex items-start gap-x-8 rounded-lg bg-purple-200">
                <span className="text-purple-500">AI: </span>

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

          {/* Show Skeleton when loading AI response */}

          <div className="flex flex-col-reverse gap-y-4">
            {conversation.map((mes, index) => (
              <div
                key={index}
                className={`p-8 w-full flex items-start gap-x-8 rounded-lg ${
                  mes.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-purple-50"
                }`}
              >
                <span
                  className={
                    mes.role === "user" ? "text-blue-500" : "text-purple-500"
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

export default Conversation;
