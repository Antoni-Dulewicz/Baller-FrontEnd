import { useState, useEffect } from 'react';
import { Box, Button, Paper, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { MatchProtocolForm } from '../components/UploadMatchProtocol/MatchProtocolForm';
import { getRefereeMatches } from '../services/eventService'

export function UploadMatchProtocol() {
    const [refereeMatches, setRefereeMatches] = useState([]);
    const [openRowId, setOpenRowId] = useState(null);

    useEffect(() => {
        const fetchRefereeMatches = async () => {
            const [upcomingMatches, pastMatches]= await getRefereeMatches(7);
            const matches = upcomingMatches.concat(pastMatches)
            console.log(matches)
            setRefereeMatches(matches);
        };
        fetchRefereeMatches();
    }, []);

    const columns = [
        { field: 'day', headerName: 'Day', flex: 1 },
        { field: 'timeSlot', headerName: 'Timeslot', flex: 1 },
        {
            field: 'participants',
            headerName: 'Participants',
            flex: 2,
            renderCell: params => <span>{params.row.participants.map(p => p.name).join(', ') || '—'}</span>,
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
