import { useState } from "react";
import { useNavigate } from "react-router";
import { createEntry } from "../services/entryService";

function CreateEntry() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    entryBody: "",
    isPublic: false,
  });

  function handleChange(event) {
    const { name, type, value, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await createEntry(formData);
    navigate("/my-entries");
  }

  return (
    <main>
      <h1>Create Entry</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="entryBody">Body:</label>
          <textarea
            id="entryBody"
            name="entryBody"
            value={formData.entryBody}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="isPublic">Public:</label>
          <input
            type="checkbox"
            id="isPublic"
            name="isPublic"
            checked={formData.isPublic}
            onChange={handleChange}
          />
        </div>
        <button>Create</button>
      </form>
    </main>
  );
}

export default CreateEntry;
