import React, { useEffect, useState } from 'react';
import { Button, Box, Collapse } from '@mui/material';
import CustomTable from '../components/Table/Table';
import Header from '../components/Header';
import { getReferees, acceptReferee } from '../services/eventService';
import { User } from 'lucide-react';

const AcceptReferees = () => {

  const [referees, setReferees] = useState([]);
  const [approvedReferees, setApprovedReferees] = useState([]);
  const [notApprovedReferees, setNotApprovedReferees] = useState([]);
  const [isTableOpen, setIsTableOpen] = useState(false);
  const [isWaitingOpen, setIsWaitingOpen] = useState(false);

  const fetchReferees = async () => {
    try{
      const data = await getReferees();
      setReferees(data);
      setApprovedReferees(data.filter(ref => ref.approved));
      setNotApprovedReferees(data.filter(ref => !ref.approved));
      console.log('Fetched referees:', data);
    } catch (error){
      console.error('Error fetching referees:', error);
    }
  }

  useEffect(() => {
    fetchReferees();
  },[])

  const handleAccept = async (refereeId) => {
    try {
      await acceptReferee(refereeId);
      fetchReferees()

    } catch (error) {
        console.log(error);
    }
  };

  const columnsNotAccepted = [
    { header: 'Imię i nazwisko', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    {
      header: 'Akcja',
      accessor: 'id',
      align: 'right',
      render: (id) => (
        <Button variant="contained" color="primary" onClick={() => handleAccept(id)}>
          Akceptuj
        </Button>
      ),
    },
  ];

  const columnsAccepted = [
    { header: 'Imię i nazwisko', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
  ];

  const toggleForm = () => {
    setIsTableOpen(!isTableOpen)
  }

  const toggleWaiting = () => {
    setIsWaitingOpen(!isWaitingOpen);
  }

  return (
    <div className="flex flex-col min-h-screen bg-white-900 text-black">
      
      {/* <header className="bg-blue-900 py-8 px-4 flex items-center justify-center relative">
        <h1 className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2">
        Sędziowie
        </h1>
        <div className="absolute right-4">
          <button className="p-2 rounded-full hover:bg-blue-800">
            <User size={24} />
          </button>
        </div>
      </header> */}

      <Header title="Sędziowie" />

      <div style={{ padding: '2rem' }}>
        <h2 className="text-black text-xl font-semibold my-4">Oczekujący sędziowie</h2>

        <Button 
            variant="contained" 
            color="primary" 
            onClick={toggleWaiting}
          >
          {isTableOpen ? 'Zwiń' : 'Rozwiń'}
        </Button>

        <Collapse in={isWaitingOpen}>
        <CustomTable 
          data={notApprovedReferees} 
          columns={columnsNotAccepted} 
          rowColor={() => '#fffbe6'} // jasny żółty dla niezaakceptowanych
        />
        </Collapse>

        <h2 className="text-black text-xl font-semibold my-1">Zaakceptowani sędziowie</h2>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={toggleForm}
          >
          {isTableOpen ? 'Zwiń' : 'Rozwiń'}
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mb: 1 }}>
        </Box>

        <Collapse in={isTableOpen}>
          <CustomTable 
            data={approvedReferees} 
            columns={columnsAccepted} 
            rowColor={() => '#e6fff2'} 
          />
        </Collapse>
      </div>
      </div>
  );
};

export default AcceptReferees;
