import React from 'react';
import { Button } from '@mui/material';
import CustomTable from '../components/Table/Table';
import Header from '../components/Header';

const referees = [
  { id: 1, name: 'Adam Nowak', email: 'adam@example.com' },
  { id: 2, name: 'Ewa Wiśniewska', email: 'ewa@example.com' },
];

const AcceptReferees = () => {
  const handleAccept = (refereeId) => {
    console.log(`Zaakceptowano sędziego o ID: ${refereeId}`);
  };

  const columns = [
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

  const tableData = referees.map((ref) => ({
    ...ref,
    id: columns.find((c) => c.accessor === 'id' && c.render)
      ? columns.find((c) => c.accessor === 'id').render(ref.id)
      : ref.id,
  }));

  return (
    <div>
      <Header title="Sedziowie" />

      <div style={{ padding: '2rem' }}>
        <h2>Oczekujący sędziowie</h2>
        <CustomTable data={tableData} columns={columns} />
      </div>
    </div>
  );
};

export default AcceptReferees;
