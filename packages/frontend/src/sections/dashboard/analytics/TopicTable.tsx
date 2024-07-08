import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, TableContainer, TableSortLabel, Paper } from '@mui/material';
import TopicTableBody from './TopicTableBody'; // Adjust the import path accordingly
import { SolicitationTopic } from '../../../../../api/src/dto/SolicitationTopic';
import { c } from 'vite/dist/node/types.d-aGj9QkWt';

function TopicTable() {
    const [rows, setRows] = useState<SolicitationTopic[]>([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('topic_title');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data from the endpoint
        const fetchData = async () => {
            try {
                const response = await axios.get<SolicitationTopic[]>('http://localhost:8080/api/v1/solicitation/solicitation-topics'); // Adjust the URL as needed
                setRows(response.data);
            } catch (error) {
                // setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleRequestSort = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, property: React.SetStateAction<string>) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    // if (error) {
    //     return <div>Error: {error.message}</div>;
    // }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'topic_title'}
                                // direction={orderBy === 'topic_title' ? order : 'asc'}
                                onClick={(event) => handleRequestSort(event, 'topic_title')}
                            >
                                Topic Title
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'topic_branch'}
                                // direction={orderBy === 'topic_title' ? order : 'asc'}
                                onClick={(event) => handleRequestSort(event, 'topic_branch')}
                            >
                                Topic Branch
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'open_date'}
                                // direction={orderBy === 'open_date' ? order : 'asc'}
                                onClick={(event) => handleRequestSort(event, 'open_date')}
                            >
                                Open Date
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'close_date'}
                                // direction={orderBy === 'close_date' ? order : 'asc'}
                                onClick={(event) => handleRequestSort(event, 'close_date')}
                            >
                                Close Date
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TopicTableBody rows={rows} order={order} orderBy={orderBy} />
            </Table>
        </TableContainer>
    );
}

export default TopicTable;
