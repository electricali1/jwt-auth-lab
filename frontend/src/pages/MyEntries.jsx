import { useEffect, useState } from "react";
import { getMyEntries } from "../services/entryService";

function MyEntries() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function fetchEntries() {
      const data = await getMyEntries();
      setEntries(data);
    }
    fetchEntries();
  }, []);

  return (
    <div>
      <h1>My Entries</h1>
      {entries.map((entry) => (
        <div key={entry._id}>
          <h2>{entry.title}</h2>
          <p>{entry.entryBody}</p>
        </div>
      ))}
    </div>
  );
}

export default MyEntries;
