// material-ui
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';
import OrdersList from 'sections/dashboard/analytics/OrdersList';

// ==============================|| SAMPLE PAGE ||============================== //

export default function MyTopics() {
  return (
    <MainCard title="My Topics">
      <OrdersList />
    </MainCard>
  );
}
