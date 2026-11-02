import { useEffect, useState } from "react";
import { getPublicEntries } from "../services/entryService";

function Entries() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function fetchEntries() {
      const data = await getPublicEntries();
      setEntries(data);
    }
    fetchEntries();
  }, []);

  return (
    <div>
      <h1>Public Entries</h1>
      {entries.map((entry) => (
        <div key={entry._id}>
          <h2>{entry.title}</h2>
          <p>{entry.entryBody}</p>
        </div>
      ))}
    </div>
  );
}

export default Entries;
