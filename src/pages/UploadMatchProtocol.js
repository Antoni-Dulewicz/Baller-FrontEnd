import Table from '../components/Table/Table';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { getRefereeMatches } from '../services/eventService';

export function UploadMatchProtocol() {
    const [refereeMatches, setRefereeMatches] = useState([]);
    const refereeMatchez = [
        {
            day: '11-11-2022',
            timeslot: '8:00 - 8:45',
            participants: ['Wiktor Smaga', 'Antoni Dulewicz'],
        },
        {
            day: '13-11-2022',
            timeslot: '6:00 - 8:45',
            participants: ['Jakub Karczewski', 'Jakub Wisniewski'],
        },
    ];
    const columns = [
        {
            header: 'Day',
            accessor: 'day',
        },
        {
            header: 'timeslot',
            accessor: 'timeslot',
        },
        {
            header: 'participants',
            accessor: 'participants',
        },
        {
            header: 'upload',
            accessor: 'id',
            render: () => <Button>Upload results</Button>,
        },
    ];

    useEffect(() => {
        const fetchRefereeMatches = async () => {
            // const matches = await getRefereeMatches(1)
            const matches = refereeMatchez;
            if (matches) {
                setRefereeMatches(matches);
            }
        };
        fetchRefereeMatches();
    }, []);

    return <Table data={refereeMatches} columns={columns} />;
}
