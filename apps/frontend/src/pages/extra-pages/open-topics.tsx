// material-ui
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';
import OrdersList from 'sections/dashboard/analytics/OrdersList';

// ==============================|| SAMPLE PAGE ||============================== //

export default function OpenTopics() {
  return (
    <MainCard title="Open Topics">
      <OrdersList />
    </MainCard>
  );
}
