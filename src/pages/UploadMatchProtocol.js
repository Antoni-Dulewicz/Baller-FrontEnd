import { useState, useEffect, Fragment } from 'react';
import { Box, Button, Collapse } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { MatchProtocolForm } from '../components/UploadMatchProtocol/MatchProtocolForm';

export function UploadMatchProtocol() {
    const [refereeMatches, setRefereeMatches] = useState([]);
    const [openRowIndex, setOpenRowIndex] = useState();
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

    const handleClose = () => {
        setOpenRowIndex(null);
    };

    return (
        <>
            <TableContainer component={Paper} sx={{ marginY: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((col, idx) => (
                                <TableCell key={idx}>{col.header}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {refereeMatches.map((row, rowIdx) => (
                            <Fragment key={rowIdx}>
                                <TableRow>
                                    <TableCell>{row.day}</TableCell>
                                    <TableCell>{row.timeslot}</TableCell>
                                    <TableCell>{row.participants}</TableCell>
                                    <TableCell>
                                        {openRowIndex === rowIdx ? (
                                            <Button onClick={() => setOpenRowIndex(null)}>Discard</Button>
                                        ) : (
                                            <Button onClick={() => setOpenRowIndex(rowIdx)}>Upload results</Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                                <Collapse in={openRowIndex === rowIdx}>
                                    <MatchProtocolForm />
                                </Collapse>
                            </Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
