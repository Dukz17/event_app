"use client";
import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '@/Components/login/page';
import Register from '@/Components/register/page';
import Event_form from '@/Components/event_form/page';
import Styles from './ModalComponent.module.css';
import axios from 'axios';
import SearchModal from '@/Components/SearchDataModal/page';
import Client_Email_Modal from '@/Components/client_Email_Modal/page';
const HomePage = () => {
  const [showmodal, setShowmodal] = useState(false);
  const [currentModal, setCurrentModal] = useState({
    loginModal: false,
    registerModal: false,
    event_bookedform: false,
    searchModal:false,
    clientEmail_Modal:false
  });
  const [modalTitle, setModalTitle] = useState('');
  const [eventlist, setEventList] = useState([]);
  const [event_id, setEvent_id] = useState('');
  const [filter, setFilter] = useState('All');  
  const[search_code,setSearch_Code]=useState('');

  const [event_Data,setEvent_data]=useState({
    title:'',
    description:'',
    category_name:'',
    time:'',
    date:'',
    location:''

  })
  const closeModal = () => {
    setCurrentModal({ loginModal: false, registerModal: false });
    setShowmodal(false);
  };

  const ShowmodalLogin = () => {
    setCurrentModal({
      loginModal: true,
      registerModal: false,
    });
    setShowmodal(true);
  };
  const showClient_Email_Modal =()=>{
    setCurrentModal({
      event_bookedform:false,
      registerModal:false,
      loginModal:false,
      searchModal:false,
      clientEmail_Modal:true
  })
  setShowmodal(true);
  }

  const Show_eventform = async (event_id) => {
    setEvent_id(event_id);
    await fetch_events();
    setCurrentModal({
      loginModal: false,
      registerModal: false,
      event_bookedform: true,
    });
    setShowmodal(true);
  };

  const fetch_events = async (category_id = null) => {
    const url = 'http://localhost/event-api/api/event.php';
    const json={
      category_id:category_id
    }
    const formdata = new FormData();
    formdata.append("json",JSON.stringify(json));
    formdata.append('operation', 'fetch_event_list');
    

    const response = await axios.post(url, formdata);
    
    console.log(response.data);
    setEventList(response.data);
  };

   const searchEvent =async()=>{
    if (!search_code.trim()) {
      alert("You need to input the code.");
      return; 
    }
    const url = 'http://localhost/event-api/api/event.php';

    const json={
      search_code:search_code
    }

    const formdata=new FormData();
    formdata.append("json",JSON.stringify(json));
    formdata.append("operation","searchEvent");

    const response= await axios.post(url,formdata);
    const data=response.data[0];
    // console.log(response.data);
     
    setEvent_data({
      title:data.title,
      description:data.description,
      category_name:data.category_name,
      date:data.date,
      time:data.time,
      location:data.location,
      event_code:data.event_code,
      manimum_slot:data.manimum_slot
    })
    setEvent_id(data.event_id);
    setShowmodal(true);
    setCurrentModal({
      event_bookedform:false,
      registerModal:false,
      loginModal:false,
      searchModal:true
  })
   }

  useEffect(() => {
    fetch_events();
 
  }, []);



  const handleFilterChange = (category_id) => {
    setFilter(category_id);
    fetch_events(category_id);
  };
  
  const filteredEvents = eventlist;
  return (
    <>
      <div>
        {/* Header Section */}
        <header style={styles.header}>
          <div style={styles.logo}>CDO Local Events</div>
          <nav style={styles.nav}>
            <ul style={styles.navList}></ul>
            <div style={styles.navButtons}>
            <Button variant="primary" style={styles.signInButton}  onClick={showClient_Email_Modal}>See My Bookings</Button>
              <Button variant="primary" style={styles.signInButton} onClick={ShowmodalLogin}>Sign in</Button>
            </div>
          </nav>
        </header>

        {/* Main Section */}
        <Container className="mt-5">
          <Row>
          <Col lg={6}>
          <div className="mt-4">
             
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                value={search_code}
                onChange={(e) => setSearch_Code(e.target.value)}
                placeholder="Enter code"
                style={{ maxWidth: '300px' }}
              />
            </Col>
            <Col xs="auto">
              <Button
                variant="primary"
                className="ms-2"
                type="submit"
                onClick={searchEvent}
              >
                View Event
              </Button>
            </Col>
          </Row>
          </div>
            </Col>
          </Row>

          {/* Filter Buttons */}
          <div style={styles.filterButtons}>
            <h6>Filter</h6>
            <Button variant={filter === 1 ? 'primary' : 'outline-primary'} onClick={() => handleFilterChange(1)}>
              Religion
            </Button>
            <Button variant={filter === 2 ? 'primary' : 'outline-primary'} onClick={() => handleFilterChange(2)}>
              Education
            </Button>
            <Button variant={filter === 3 ? 'primary' : 'outline-primary'} onClick={() => handleFilterChange(3)}>
              Party
            </Button>
            <Button variant={filter === 4 ? 'primary' : 'outline-primary'} onClick={() => handleFilterChange(4)}>
              Food
            </Button>
            <Button variant={filter === 5 ? 'primary' : 'outline-primary'} onClick={() => handleFilterChange(5)}>
              Music
            </Button>
            <Button variant={filter === 6 ? 'primary' : 'outline-primary'} onClick={() => handleFilterChange(6)}>
              Technology
            </Button>
            <Button variant={filter === 7 ? 'primary' : 'outline-primary'} onClick={() => handleFilterChange(7)}>
              Sports
            </Button>
            <Button variant={filter === 8 ? 'primary' : 'outline-primary'} onClick={() => handleFilterChange(8)}>
              Health
            </Button>
          </div>

          <Row className="mt-4">
            {filteredEvents.map((event, index) => (
              <Col sm={6} md={4} lg={3} key={index} className="mb-4">
                <div style={styles.eventCard}>
                  <h3 style={styles.eventTitle}>{event.title}</h3>
                  <p style={styles.eventDescription}>{event.description}</p>
                  <p>Type: {event.category_name}</p>
                  <p>Time: {event.time}</p>
                  <p>Date: {event.date}</p>
                  <p>Location: {event.location}</p>
                  <p>Slot: {event.total_registrations}/{event.manimum_slot}</p>
                  <p>Event Code: {event.event_code}</p>
                  {event.total_registrations >= event.manimum_slot ? (
                    <p style={{ color: 'red', fontWeight: 'bold' }}>Full</p>
                  ) : (
                    <button
                      type="submit"
                      onClick={() => Show_eventform(event.event_id)}
                    >
                      Book Now
                    </button>
                  )}
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      <Modal show={showmodal} onHide={closeModal} className={Styles.customModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentModal.loginModal && (
            <Login closeModal={closeModal} setCurrentModal={setCurrentModal} setShowmodal={setShowmodal} />
          )}
          {currentModal.registerModal && <Register closeModal={closeModal} />}
          {currentModal.event_bookedform && (
            <Event_form closeModal={closeModal} event_id={event_id} refreshloader={fetch_events} />
          )}
           {currentModal.searchModal && (
            <SearchModal closeModal={closeModal} setCurrentModal={setCurrentModal} eventdata={event_Data} />
          )}
           {currentModal.clientEmail_Modal && (
            <Client_Email_Modal  />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 50px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#4285f4',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
  },
  navList: {
    display: 'flex',
    listStyleType: 'none',
    marginRight: '30px',
    gap: '20px',
  },
  navButtons: {
    display: 'flex',
    gap: '10px',
  },
  signInButton: {
    marginLeft: '10px',
  },
  filterButtons: {
    display: 'flex',
    gap: '10px',
    margin: '20px 0',
  },
  eventCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  eventTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
  },
  eventDescription: {
    color: '#555',
  },
};

export default HomePage;
