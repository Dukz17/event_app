import React from 'react'
import styles from './page.module.css';
const page =()=> {
  return (
    <div className={styles.mainContent}>
    {/* Navbar */}
 
    {/* Content Area */}
    <div className={styles.content}>
      <h3>Overview</h3>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h4>Upcoming Events</h4>
          <p>10 Events</p>
        </div>
        <div className={styles.card}>
          <h4>Attendees</h4>
          <p>500+ Participants</p>
        </div>
        <div className={styles.card}>
          <h4>Revenue</h4>
          <p>$5000</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default page