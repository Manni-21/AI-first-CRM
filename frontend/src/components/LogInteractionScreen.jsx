import { useState } from "react";
import ChatInterface from "./ChatInterface";

export default function LogInteractionScreen() {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">

      {/* LEFT FORM */}
      <div className="form-container">
        <h2>Log HCP Interaction</h2>

        <div className="form-group">
          <input name="hcp_name" placeholder="HCP Name" onChange={handleChange} />
        </div>

        <div className="form-group">
          <select name="interaction_type" onChange={handleChange}>
            <option>Meeting</option>
            <option>Call</option>
            <option>Visit</option>
          </select>
        </div>

        <div className="row">
          <input type="date" name="date" onChange={handleChange} />
          <input type="time" name="time" onChange={handleChange} />
        </div>

        <div className="form-group">
          <input name="attendees" placeholder="Attendees" onChange={handleChange} />
        </div>

        <div className="form-group">
          <textarea name="topics" placeholder="Topics Discussed" onChange={handleChange} />
        </div>

        <div className="form-group">
          <input name="materials" placeholder="Materials Shared" onChange={handleChange} />
        </div>

        <div className="form-group">
          <input name="samples" placeholder="Samples Distributed" onChange={handleChange} />
        </div>

        <div className="radio-group">
          <label><input type="radio" name="sentiment" value="Positive" onChange={handleChange} /> Positive</label>
          <label><input type="radio" name="sentiment" value="Neutral" onChange={handleChange} /> Neutral</label>
          <label><input type="radio" name="sentiment" value="Negative" onChange={handleChange} /> Negative</label>
        </div>

        <div className="form-group">
          <textarea name="outcomes" placeholder="Outcomes" onChange={handleChange} />
        </div>

        <div className="form-group">
          <textarea name="follow_up" placeholder="Follow-up Actions" onChange={handleChange} />
        </div>

        <button>Submit Interaction</button>
      </div>

      {/* RIGHT AI */}
      <div className="ai-container">
        <h3>AI Assistant</h3>
        <ChatInterface />
      </div>

    </div>
  );
}

