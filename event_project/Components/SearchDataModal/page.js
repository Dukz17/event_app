import React from 'react';

const Page = ({ closemodal, eventdata, setCurrentModal }) => {
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto'}}>
      <h2 style={{ marginBottom: '10px' }}>{eventdata.title}</h2>
      <p><strong>Description: </strong>{eventdata.description}</p>
      <p><strong>Category: </strong>{eventdata.category_name}</p>
      <p><strong>Date: </strong>{eventdata.date}</p>
      <p><strong>Time: </strong>{eventdata.time}</p>
      <p><strong>Location: </strong>{eventdata.location}</p>
      <p><strong>Event Code: </strong>{eventdata.event_code}</p>
      <p><strong>Maximum Slot: </strong>{eventdata.manimum_slot}</p>
      
      <button 
        onClick={()=>setCurrentModal({event_bookedform:true})} 
        style={{ marginTop: '20px', padding: '10px 20px', border: 'none', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>
        Book Now
      </button>
    </div>
  );
};

export default Page;
