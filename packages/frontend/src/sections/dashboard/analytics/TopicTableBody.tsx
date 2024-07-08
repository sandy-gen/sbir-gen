import React from 'react';
import { TableBody, TableRow, TableCell, Button, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { SolicitationTopic } from '../../../../../api/src/dto/SolicitationTopic';


interface TopicTableBodyProps {
    rows: any[];
    order: string;
    orderBy: string;
}


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

function getComparator<Key extends keyof any>(
    order: SolicitationTopic['topic_id' | 'topic_title' | 'open_date' | 'close_date'],
    orderBy: Key
  ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
  }

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

function TopicTableBody({ rows, order, orderBy }: TopicTableBodyProps) {
    return (
        <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                    <TableRow
                        hover
                        role="checkbox"
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        tabIndex={-1}
                        key={row.solicitation_id} // Assuming solicitation_id is unique
                    >
                        {/* <TableCell>{row.topic_id}</TableCell> */}
                        <TableCell>{row.topic_title}</TableCell>
                        <TableCell>{row.topic_branch}</TableCell>
                        <TableCell>{new Date(row.open_date).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(row.close_date).toLocaleDateString()}</TableCell>
                        <TableCell>
                            <Button variant="contained" component={RouterLink} to='/open-topic-detail'>
                                View
                            </Button>
                        </TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
    );
}

export default TopicTableBody;
