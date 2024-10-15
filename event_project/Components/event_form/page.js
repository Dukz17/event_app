"use client";
import React, { useState } from 'react';
import axios from 'axios';

const Page = ({ closeModal,event_id,refreshloader}) => {
    const [registerData, setregisterData] = useState({
        fullname: '',
        email: '',
        address: '',
        phone: ''
      });
    
      const handleChange = (e) => {
        setregisterData({ ...registerData, [e.target.name]: e.target.value });
      };

      const event_form = async()=>{
       
        const url = "http://localhost/event-api/api/event.php";
        
        const json={
        booked_data:[registerData],
        event_id:event_id
        }
        const formdata= new FormData();
        formdata.append("json",JSON.stringify(json));
        formdata.append("operation","event_booked_submit");
        const response= await axios.post(url,formdata);
        console.log(response.data);

        if(response.data == 1){
            alert("Event booked successfully");
            refreshloader();
            closeModal();
        }else{
            alert("Event booking failed");
        }
      }
  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
    <h2>Event Register Form</h2>
  
      <div style={{ marginBottom: '10px' }}>
        <input  
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={registerData.fullname}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          required
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={registerData.email}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          required
        />
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={registerData.address}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          required
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={registerData.phone}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          required
        />
      </div>
      <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#0070f3', color: '#fff', border: 'none' }} onClick={event_form}>
        submit
      </button>
   
  </div>
  );
};

export default Page;
