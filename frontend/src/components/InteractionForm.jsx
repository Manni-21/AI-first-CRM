import { useState } from "react";
import axios from "axios";

export default function InteractionForm() {

  const [hcp, setHcp] = useState("");
  const [hospital, setHospital] = useState("");
  const [notes, setNotes] = useState("");

  const submitInteraction = async () => {
    const data = {
      hcp_name: hcp,
      hospital: hospital,
      notes: notes
    };

    console.log(data);
  };

  return (
    <div>
      <input
        placeholder="HCP Name"
        value={hcp}
        onChange={(e) => setHcp(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Hospital"
        value={hospital}
        onChange={(e) => setHospital(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Interaction Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <br /><br />

      <button onClick={submitInteraction}>
        Submit Interaction
      </button>
    </div>
  );
}
