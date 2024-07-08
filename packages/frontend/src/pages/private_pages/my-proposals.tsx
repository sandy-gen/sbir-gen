// material-ui
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';
import ProposalComponent from 'sections/proposal/proposal';

// ==============================|| SAMPLE PAGE ||============================== //

export default function MyProposals() {
  return (
    <MainCard title="">
      <ProposalComponent />
    </MainCard>
  );
}
