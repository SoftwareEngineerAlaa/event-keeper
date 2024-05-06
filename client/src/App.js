import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header.js";
import NextEvent from "./components/NextEvent.js";
import EventsList from "./components/EventsList.js";
import AddEventForm from "./components/AddEventForm.js";
import { TailSpin } from "react-loader-spinner";

function App() {
  const [events, setEvents] = useState([]);
  const [nextEvent, setNextEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      setLoading(true);

      // 🙂 I made this on purpose to test the loader (spinner)
      // ❕NOTE: it is not part of the App and can be commented or removed
      await new Promise((resolve) => setTimeout(resolve, 1000)); // (1 second)

      const response = await fetch(`${process.env.REACT_APP_API_URL}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.statusText}`);
      }

      const data = await response.json();

      const sortedEvents = [...data].sort(
        (a, b) =>
          Math.abs(new Date(a.date) - new Date()) -
          Math.abs(new Date(b.date) - new Date())
      );

      const next = sortedEvents.find(
        (event) => new Date(event.date) > new Date()
      );

      setEvents(sortedEvents);
      setNextEvent(next || null);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);

    if (!nextEvent || new Date(newEvent.date) < new Date(nextEvent.date)) {
      setNextEvent(newEvent);
    }
  };

  const deleteEvent = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete event: ${response.statusText}`);
      }

      const afterDeletionEventsList = events.filter(
        (event) => event._id !== id
      );
      setEvents(afterDeletionEventsList);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div>
      <div className="App">
        <Header />
      </div>
      <div className="body">
        <div className="leftBody">
          <NextEvent nextEvent={nextEvent} />
          {loading ? (
            <TailSpin color="green" radius={"3px"} />
          ) : (
            <EventsList
              events={events.filter(
                (event) =>
                  new Date(event.date) > new Date() && event !== nextEvent
              )}
              deleteEvent={deleteEvent}
            />
          )}
        </div>
        <div className="rightBody">
          <AddEventForm onAddEvent={addEvent} />
        </div>
      </div>
    </div>
  );
}

export default App;
