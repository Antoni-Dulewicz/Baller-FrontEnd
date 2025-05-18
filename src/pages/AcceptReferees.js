import React, { useEffect, useState } from 'react';
import { Button, Box, Collapse } from '@mui/material';
import CustomTable from '../components/Table/Table';
import Header from '../components/Header';
import { getReferees, acceptReferee } from '../services/eventService';

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
    <div>
      <Header title="Sedziowie" />

      <div style={{ padding: '2rem' }}>
        <h2>Oczekujący sędziowie</h2>
        <CustomTable data={notApprovedReferees} columns={columnsNotAccepted} />
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
          <CustomTable data={approvedReferees} columns={columnsAccepted} />
        </Collapse>
      </div>
    </div>
  );
};

export default AcceptReferees;
