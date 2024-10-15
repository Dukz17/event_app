"use client";
import React from 'react';
import styles from './EmailForm.module.css'; 
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const Page = () => {
const [email,setEmail]=useState('');
const Router= useRouter();
const redirect = async()=>{
 
    const url = "http://localhost/event-api/api/event.php";

    const json = {
        email:email
    }

    const formdata= new FormData();
    formdata.append('json',JSON.stringify(json));
    formdata.append("operation","redirect");

    const response = await axios.post(url,formdata);
    console.log(response.data);

    if(Object.keys(response.data).length > 0){
        Router.push('./ClientDashboard');
    }else{
       alert("invalid Email")
    }
};

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <input 
          type="email" 
          value={email}
          onChange={(e)=>setEmail(e.target.value)}

          placeholder="Enter your email" 
          className={styles.input} 
        />
        <button type="submit" onClick={redirect} className={styles.button}>Submit</button>
      </form>
    </div>
  );
};

export default Page;
