import React, { useMemo, useState } from 'react';
import axios from 'axios';
// import {
//     MaterialReactTable,
//     useMaterialReactTable,
//     type MRT_ColumnDef,
// } from 'material-react-table';
// import { useQuery } from '@tanstack/react-query';
import { SolicitationTopic } from 'types/solicitation-topic';

function fetchTopics() {
    return axios.get<SolicitationTopic[]>('http://localhost:8080/api/v1/solicitation/solicitation-topics')
        .then(response => response.data);
}

// export default function TopicTable() {
//     const [order, setOrder] = useState<'asc' | 'desc'>('asc');
//     const [orderBy, setOrderBy] = useState('topic_title');
//     const { data: rows = [], isLoading, error } = useQuery<SolicitationTopic[]>({
//         queryKey: ['solicitation-topics'],
//         queryFn: fetchTopics,}
        
//     );

//     const columns = useMemo<MRT_ColumnDef<SolicitationTopic>[]>(
//         () => [
//             {
//                 accessorKey: 'topic_title',
//                 header: 'Topic Title',
//                 size: 150,
//             },
//             {
//                 accessorKey: 'topic_branch',
//                 header: 'Topic Branch',
//                 size: 150,
//             },
//             {
//                 accessorKey: 'open_date',
//                 header: 'Open Date',
//                 size: 150,
//             },
//             {
//                 accessorKey: 'close_date',
//                 header: 'Close Date',
//                 size: 150,
//             },
//             {
//                 accessorKey: 'action',
//                 header: 'Action',
//                 size: 150,
//                 Cell: ({ row }) => (
//                     <button onClick={() => handleActionClick(row.original)}>Action</button>
//                 ),
//             },
//         ],
//         [],
//     );

//     const table = useMaterialReactTable({
//         columns,
//         data: rows as SolicitationTopic[],
//         state: {
//             sorting: [
//                 {
//                     id: orderBy,
//                     desc: order === 'desc',
//                 },
//             ],
//         },
//         manualSorting: true,
//         onSortingChange: (sortingState: any) => {
//             const sorting = sortingState[0];
//             setOrder(sorting.desc ? 'desc' : 'asc');
//             setOrderBy(sorting.id);
//         },
//     });

//     const handleActionClick = (row: SolicitationTopic) => {
//         // Handle the action button click
//         console.log(row);
//     };

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error.message}</div>;
//     }

//     return <MaterialReactTable table={table} />;
// }


