"use client";

import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [category_id, setCategory_id] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [category_list, setCategory_list] = useState([]);
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [user_id, setUser_id] = useState('');
  const [slot, setSlot] = useState(''); // New state variable for slot

  const fetch_category = async () => {
    const url = "http://localhost/event-api/api/event.php";
    const formdata = new FormData();
    formdata.append("operation", "fetch_category");
    const response = await axios.post(url, formdata);
    setCategory_list(response.data);
  };

  const submit = async () => {
    const url = "http://localhost/event-api/api/event.php";
    const json = {
      org_id: user_id,
      title: eventName,
      description: eventDescription,
      category_id: category_id,
      time: time,
      date: eventDate,
      location: location,
      manimum_slot: slot // Include the slot in the submitted data
    };

    const formdata = new FormData();
    formdata.append("json", JSON.stringify(json));
    formdata.append("operation", "submit");
    const response = await axios.post(url, formdata);
     console.log(response.data)
    if (response.data == 1) {
      alert("Event successfully created");
      setIsModalOpen(false);
    } else {
      alert("Event not saved");
    }
  };

  const fetch_events = async () => {
    const url = "http://localhost/event-api/api/event.php";
    const json = { org_id: sessionStorage.getItem("user_id") };

    const formdata = new FormData();
    formdata.append("json", JSON.stringify(json));
    formdata.append("operation", "fetch_event");

    const response = await axios.post(url, formdata);
    setEvents(response.data);
  };

  useEffect(() => {
    setUser_id(sessionStorage.getItem("user_id"));
    fetch_category();
    fetch_events();
  }, [category_id]);

  return (
    <div className="container">
      {/* Button to trigger modal */}
      <button onClick={() => setIsModalOpen(true)} className="create-event-btn">
        Create Event
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <h2>Create New Event</h2>

            <label htmlFor="eventName">Title:</label>
            <input
              type="text"
              id="title"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />

            <label htmlFor="eventDescription">Description:</label>
            <textarea
              id="eventDescription"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              required
            />

            <label htmlFor="category">Category:</label>
            <select
              value={category_id}
              onChange={(e) => setCategory_id(e.target.value)}
            >
              {category_list.map((category, index) => (
                <option key={index} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>

            <label htmlFor="eventTime">Time:</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />

            <label htmlFor="eventDate">Event Date:</label>
            <input
              type="date"
              id="eventDate"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
            />

            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />

            <label htmlFor="slot">Slot:</label>
            <input
              type="number"
              id="slot"
              value={slot}
              onChange={(e) => setSlot(e.target.value)} // Capture slot input
              required
            />

            <button type="submit" onClick={submit}>
              Create Event
            </button>
          </div>
        </div>
      )}

      {/* Display events */}
      <div className="event-display">
        {events.length > 0 ? (
          <div className="card-container">
            {events.map((event, index) => (
              <div key={index} className="event-card">
                <h3>Title: {event.title}</h3>
                <p>Description: {event.description}</p>
                <p>Type: {event.category_name}</p>
                <p>Time: {event.time}</p>
                <p>Date: {event.date}</p>
                <p>Location: {event.location}</p>
                {event.manimum_slot > 0 && (
                    <p>Maximum Slot: {event.manimum_slot}</p>
                  )}

                <p>Status: {event.approval_status}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No events yet. Create one!</p>
        )}
      </div>

      <style jsx>{`
        .create-event-btn {
          margin-bottom: 20px;
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 100px;
        }

        .modal {
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          z-index: 1;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
        }

        .modal-content {
          background-color: white;
          padding: 20px;
          border-radius: 10px;
          width: 50%;
        }

        .close {
          float: right;
          font-size: 24px;
          cursor: pointer;
        }

        input,
        textarea {
          width: 100%;
          margin-bottom: 10px;
          padding: 8px;
          border-radius: 4px;
          border: 1px solid #ccc;
        }

        .event-display {
          margin-top: 20px;
        }

        .card-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .event-card {
          border: 1px solid #ccc;
          padding: 20px;
          border-radius: 10px;
          background-color: #f9f9f9;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .event-card:hover {
          transform: translateY(-10px);
        }

        h3 {
          margin-bottom: 10px;
          font-size: 20px;
          color: #0070f3;
        }

        p {
          margin: 5px 0;
        }
      `}</style>
    </div>
  );
}
