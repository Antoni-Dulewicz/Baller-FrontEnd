import { useState, useEffect } from 'react';
import { Box, Button, Paper, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { MatchProtocolForm } from '../components/UploadMatchProtocol/MatchProtocolForm';

export function UploadMatchProtocol() {
    const [refereeMatches, setRefereeMatches] = useState([]);
    const [openRowId, setOpenRowId] = useState(null);

    const refereeMatchez = [
        {
            id: 1,
            day: '11-11-2022',
            timeslot: '8:00 - 8:45',
            isSubmitted: false,
            participants: ['Wiktor Smaga', 'Antoni Dulewicz'],
        },
        {
            id: 2,
            day: '13-11-2022',
            timeslot: '6:00 - 8:45',
            isSubmitted: false,
            participants: ['Jakub Karczewski', 'Jakub Wisniewski'],
        },
        {
            id: 3,
            day: '13-11-2022',
            timeslot: '6:00 - 8:45',
            isSubmitted: true,
            participants: ['Jakub Karczewski', 'Jakub Wisniewski'],
        },
    ];

    useEffect(() => {
        const fetchRefereeMatches = async () => {
            // const matches = await getRefereeMatches(1);
            const matches = refereeMatchez;
            if (matches) {
                setRefereeMatches(matches);
            }
        };
        fetchRefereeMatches();
    }, []);

    const columns = [
        { field: 'day', headerName: 'Day', flex: 1 },
        { field: 'timeslot', headerName: 'Timeslot', flex: 1 },
        {
            field: 'participants',
            headerName: 'Participants',
            flex: 2,
            renderCell: params => <span>{params.row.participants.join(', ') || '—'}</span>,
        },
        {
            field: 'isSubmitted',
            headerName: 'Submitted',
            renderCell: params => (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                    {params.row.isSubmitted ? <DoneOutlineIcon color="success" /> : <CancelIcon color="error" />}
                </Box>
  ),
        },
        {
            field: 'actions',
            headerName: 'Upload',
            flex: 1,
            renderCell: params => (
                <Button variant="contained" onClick={() => setOpenRowId(params.row.id)}>
                    Upload results
                </Button>
            ),
        },
    ];

    const openMatch = refereeMatches.find(match => match.id === openRowId);

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <Paper sx={{ padding: 2, marginBottom: 2 }}>
                <DataGrid rows={refereeMatches} columns={columns} disableRowSelectionOnClick />
            </Paper>

            {openMatch && (
                <MatchProtocolForm open={Boolean(openRowId)} handleClose={() => setOpenRowId(null)} players={openMatch.participants} />
            )}
        </Box>
    );
}
