import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// third-party
import { NumericFormat } from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';

// assets
import { ColorProps } from 'types/extended';

// types
interface Data {
  // "topic_title": "Automated Functional Grading of Materials for Directed Energy Deposition Additive Manufacturing",
  //             "branch": "Army",
  //             "topic_number": "A244-043",
  //             "topic_description": "OUSD (R&E) CRITICAL TECHNOLOGY AREA(S): Advanced Materials\r\n\r\n\u00a0\r\n\r\nOBJECTIVE: Develop software for interfacing closed-network computational processing of CAD models with custom, user-dictated compositional gradients to enable building complex functionally graded materials on a directed energy disposition additive manufacturing system.\r\n\r\n\u00a0\r\n\r\nDESCRIPTION: Current munitions manufacturing is often limited to monolithic, simple designs due to the difficulty of manufacturing the very hard and strong metals of interest to the military through conventional means. Additive manufacturing (AM) has the potential to enable the production of complex, multi-material munitions with enhanced lethality. Directed energy deposition (DED) AM is a process that deposits powder or wire material layer-by-layer using a high temperature source (e.g. laser, arc, electron beam, etc.) [1]. DED AM can build with multiple materials simultaneously to enable creation of functionally graded materials (FGMs) which are characterized by a variation in composition gradually through the bulk volume resulting in changes in the material properties throughout the part. FGMs can lead to enhanced mechanical performance, control of energy dissipation through the material such as thermal management, and/or weight savings compared to bulk monolithic materials [2]. DED AM process coupled with FGMs provides the opportunity to fabricate complex objects with unique material characteristics.\r\n\r\n\u00a0\r\n\r\nThere is significant research ongoing for multi-material and FGM development for DED in a wide range of metals and alloys [3]. The most common gradient deposited is linear which may be undesirable from a material compatibility perspective generating cracks at interfaces or where brittle intermetallic phases are formed. Calphad software (e.g. ThermoCalc, Pandat or OpenCalphad) is actively being used in the community to predict complex chemical gradients to avoid these brittle phases however, software tools to automatically generate complex tool paths that enable material mixing for DED processing do not exist. FGM are typically deposited only along the build direction and are manually coded as layered, discontinuous gradients. The goal of this topic is to develop software to automatically generate DED AM tool path planning for multi-material grading in at least 3 directions (X, Y, Z or a combination) for a 3 axis DED system where the X/Y plane consists of the plane perpendicular to the energy source and Z is parallel with the energy source. For this call, deposits should consist of metals and/or metal alloys only. The software should be able to accept user inputted gradients for combinations of at least 4 metals simultaneously. The software should be generic enough for application to any DED system capable of receiving tool path commands from an external (non-OEM) software program. The proposed software would enable chemical gradients to be constructed in any orientation in 3D for a complex component which would greatly open the design space for multifunctionality of built parts.\r\n\r\n\u00a0\r\n\r\nPHASE I: Develop a proof-of-concept software for printing FGMs on a DED additive manufacturing printer by changing the metal composition on a single layer. Develop the software to accept user-generated gradients, including non-linear gradients, to define material deposition. Grade the composition smoothly from 100% of one metal to 100% of a different metal at least to the resolution of the printer (typically 1 bead width). Demonstrate control of changing the mixing of metals by depositing the gradient with a DED AM printer. Perform at least one form of materials characterization to quantify the chemistry of the deposited gradient and compare to the intended deposit chemistry. Deliverables for Phase I include a final report and a test coupon with a compositional gradient on a single layer. Deliver the coupon to the Army for independent testing.\r\n\r\n\u00a0\r\n\r\nPHASE II: Expand the proof-of-concept software from Phase I into a prototype capability. This software should demonstrate the ability to perform user-defined, material grading using up to 4 metals simultaneously. Fabricate at least 3 graded test coupons with the material gradients in multiple orientations: parallel to the build direction (Z direction), perpendicular to the build direction (X, Y or combo direction) and oblique to the build direction (X/Z, Y/Z or combo X/Y/Z direction). Perform at least one form of materials characterization to quantify the chemistry of the deposited gradient and compare to the intended deposit chemistry for each coupon. Generate a demonstration part containing a FGM designed through a Computer Aided Design (CAD) interface. Coordinate with the customer team to define a good representative demonstration part. Deliverables for Phase II include a final report, graded test coupons, the FGM demonstration part and an executable copy of the developed software. Deliver all coupons, demonstration parts and software to the Army for independent testing\r\n\r\n\u00a0\r\n\r\nPHASE III DUAL USE APPLICATIONS: The development of software for advanced tool path planning and material deposition will greatly increase manufacturing capability and potentially help increase widespread adoption of DED AM technology. For the military, this tool will enable enhanced chemical design flexibility for the next generation of military weapons systems. The civilian sector would also benefit from the developed software for manufacturing research, aerospace, mining, power, tool manufacturing, and medical applications [4].\r\n\r\n\u00a0\r\n\r\nREFERENCES:\r\n\r\n\r\n\tGibson, I., et al., \u201cDirected Energy Deposition,\u201d In Additive Manufacturing Technologies, 2021, Springer. 285-318; \r\n\tPalmero, E. and Bollero, A., \u201c3D and 4D Printing of Functional and Smart Composite Materials,\u201d Encyclopedia of Materials: Composites, 2021, 402-419; \r\n\tFeenstra, D.R. et. al., \u201cCritical review of the state of the art in multi-material fabrication via directed energy deposition,\u201d Current Opinion in Solid State and Materials Science, 2021, 25 (4), 100924; \r\n\tBhavar, V. et al., \u201cA Review on Functionally Gradient Materials (FGMs) and Their Applications,\u201d IOP Conference Series: Materials Science and Engineering, 2017, 229, 012021\r\n\r\n\r\n\u00a0\r\n\r\nKEYWORDS: Directed Energy Deposition, Additive Manufacturing, Functionally Graded Materials, Tool Path Planning, Computer Aided Design\r\n",
  //             "sbir_topic_link
  solicitation_number: string;
  solicitation_title: string;
  // program: string;
  agency: string;
  branch: string;
  open_date: string;
  close_date: string;
  topic_title: string;
  topic_number: string;
  topic_description: string;
  sbir_topic_link: string;
}

function createData(
  solicitation_number: string,
  solicitation_title: string,
  // program: string,
  agency: string,
  branch: string,
  open_date: string,
  close_date: string,
  topic_title: string,
  topic_number: string,
  topic_description: string,
  sbir_topic_link: string
): Data {
  return { solicitation_number, solicitation_title, agency, branch, open_date, close_date, topic_title, topic_number, topic_description, sbir_topic_link };
}

const rows = [
  createData(
    'N244-P01',
    'NAVAIR Open Topic for Advanced Robotic Automation for Fleet Readiness Center Industrial Processes',
    'Navy',
    'NAVAIR',
    '2023-07-01',
    '2023-07-31',
    'NAVSEA Open Topic for Sustainment and Obsolescence',
    'Topic Title  2',
    'Topic Description 2',
    'https://www.sbir.gov/node/2651337',
  ),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
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

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  align: 'center' | 'left' | 'right' | 'inherit' | 'justify' | undefined;
}

const headCells: readonly HeadCell[] = [
  // {
  //   id: 'solicitation_number',
  //   align: 'left',
  //   disablePadding: false,
  //   label: 'Solicitation Number'
  // },
  // {
  //   id: 'solicitation_title',
  //   align: 'left',
  //   disablePadding: true,
  //   label: 'Solicitation Title'
  // },
  // {
  //   id: 'program',
  //   align: 'right',
  //   disablePadding: false,
  //   label: 'Program'
  // },
  // {
  //   id: 'agency',
  //   align: 'left',
  //   disablePadding: false,

  //   label: 'Agency'
  // },
  // {
  //   id: 'branch',
  //   align: 'right',
  //   disablePadding: false,
  //   label: 'Branch'
  // },

  {
    id: 'topic_title',
    align: 'left',
    disablePadding: false,
    label: 'Topic Title'
  },
  {
    id: 'topic_number',
    align: 'right',
    disablePadding: false,
    label: 'Topic Number'
  },
  {
    id: 'topic_description',
    align: 'right',
    disablePadding: false,
    label: 'Topic Description'
  },
  {
    id: 'open_date',
    align: 'right',
    disablePadding: false,
    label: 'Open Date'
  },
  {
    id: 'close_date',
    align: 'right',
    disablePadding: false,
    label: 'Close Date'
  },
  // {
  //   id: 'sbir_topic_link',
  //   align: 'right',
  //   disablePadding: false,
  //   label: 'SBIR Topic Link'
  // },

];

interface OrderTableHeadProps {
  order: Order;
  orderBy: string;
}

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }: OrderTableHeadProps) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// ==============================|| ORDER TABLE - STATUS ||============================== //

interface Props {
  status: number;
}

function OrderStatus({ status }: Props) {
  let color: ColorProps;
  let title: string;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 1:
      color = 'success';
      title = 'Approved';
      break;
    case 2:
      color = 'error';
      title = 'Rejected';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
}

// ==============================|| ORDER TABLE ||============================== //

export default function OrdersList() {
  const order: Order = 'asc';
  const orderBy: keyof Data = 'solicitation_number';

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table aria-labelledby="tableTitle">
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={row.solicitation_number}
                >
                  <TableCell align="right">{row.topic_title}</TableCell>
                  <TableCell align="right">{row.topic_number}</TableCell>
                  <TableCell align="right">{row.topic_description}</TableCell>
                  <TableCell>{row.open_date}</TableCell>
                  <TableCell align="right">{row.close_date}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
