import React, { useState } from "react";

function AddEventForm({ onAddEvent }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");

  const handleSubmit = async (e) => {
    if (!title || !date || !venue) {
      alert("Please fill in all fields.");
      return;
    }

    const newEvent = {
      title,
      date,
      venue,
    };

    setTitle("");
    setDate("");
    setVenue("");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error(`Failed to add event: ${response.statusText}`);
      }

      const addedEvent = await response.json();

      onAddEvent(addedEvent);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <div className="addEventForm">
      <form id="form" onSubmit={handleSubmit}>
        <h2 className="form-title">Create a new event</h2>
        <label htmlFor="form-event-title">TITLE</label>
        <input
          name="title"
          id="form-event-title"
          type="text"
          placeholder="Insert a title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="date">DATE</label>
        <input
          name="date"
          type="datetime-local"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label name="venue" htmlFor="venue">
          VENUE
        </label>
        <input
          type="text"
          placeholder="Insert a venue..."
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default AddEventForm;
