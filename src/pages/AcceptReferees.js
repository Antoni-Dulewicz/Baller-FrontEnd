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

  return (
    <div className="flex flex-col min-h-screen bg-white-900 text-white">
      <header className="bg-blue-900 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold pl-8">Sędziowie</h1>
        <button className="p-2 rounded-full hover:bg-blue-800">
          <User size={24} />
        </button>
      </header>
      <div style={{ padding: '2rem' }}>
        <h2>Oczekujący sędziowie</h2>
        <CustomTable 
          data={notApprovedReferees} 
          columns={columnsNotAccepted} 
          rowColor={() => '#fffbe6'} // jasny żółty dla niezaakceptowanych
        />
        <h2>Zakceptowani sędziowie</h2>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem' }}>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={toggleForm}
            >
                {isTableOpen ? 'Zwiń' : 'Rozwiń'}
            </Button>
        </Box>
        <Collapse in={isTableOpen}>
          <CustomTable 
            data={approvedReferees} 
            columns={columnsAccepted} 
            rowColor={() => '#e6fff2'} // jasny zielony dla zaakceptowanych
          />
        </Collapse>
      </div>
      </div>
  );
};

export default AcceptReferees;
