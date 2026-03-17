import { useState } from "react";
import axios from "axios";

export default function ChatInterface() {
  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);

  const sendToAI = async () => {
    const res = await axios.post(
      "http://127.0.0.1:8000/log_chat_interaction",
      { message }
    );
    setData(res.data);
  };

  return (
    <div>
      <textarea
        placeholder="Describe interaction..."
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendToAI}>Log</button>

      {data && (
        <div className="ai-box">
          <p><b>HCP:</b> {data.hcp_name}</p>
          <p><b>Hospital:</b> {data.hospital}</p>
          <p><b>Notes:</b> {data.notes}</p>
        </div>
      )}
    </div>
  );
}


