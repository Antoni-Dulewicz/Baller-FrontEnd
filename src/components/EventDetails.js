import { User, Menu, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getEvent, getParticipants } from '../services/eventService';
import Header from '../components/Header';
import { Button, Box, Collapse } from '@mui/material';
import CustomTable from '../components/Table/Table';

const Event = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState(null);
  const [referees, setReferees] = useState(null);
  const { id } = useParams();

  const fetchEventData = async () => {
      try {
          console.log(window.location.hostname);
          const eventData = await getEvent(id);
          setEvent(eventData)
          console.log('Fetched event:', eventData);

          const participantsData = await getParticipants(eventData.participants);
          setParticipants(participantsData)
          console.log('Fetched participants:', participantsData);

          // const refereesData = await getReferees(eventData.referees);
          // setReferees(refereesData);
          // console.log('Fetched referees:', refereesData);

      } catch (error) {
          console.error('Error fetching:', error);
      }
  };


  useEffect(() => {
    fetchEventData();
  },[id]);

  const handleBackClick = () => {
    const path = '/events';
    // console.log(path);
    navigate(path);
  };

  // const navItems = [
  //   { path: '/events', label: 'Powrót do wydarzeń' },
  // ];

  if (!event) return <div>Ładowanie danych wydarzenia...</div>;

  const participantsColumns = [
    { header: 'Imię i nazwisko', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
  ];

  return (
    <div>
      <Header title={event.name}/>

      <Box sx={{ display: 'flex', justifyContent: 'flex-start', margin: '1rem' }}>
          <Button 
              variant="contained" 
              color="primary" 
              onClick={() => handleBackClick()}
          >
            Powrót
          </Button>
      </Box>

      <div style={{ padding: '2rem' }}>
          <h2>Uczestnicy</h2>
          {participants ?
            <CustomTable data={participants} columns={participantsColumns} /> 
            : 
            'Brak uczestnikow'}
          
      </div>
    </div>

  );
};

export default Event;