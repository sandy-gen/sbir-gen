// material-ui
import { FileTextOutlined, DownloadOutlined } from '@ant-design/icons';
import { Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// project import
import MainCard from 'components/MainCard';
import ReportCard from 'components/cards/statistics/ReportCard';
import OrdersList from 'sections/dashboard/analytics/OrdersList';
import TopicTable from 'sections/dashboard/analytics/TopicTable';

// ==============================|| SAMPLE PAGE ||============================== //

export default function Dashboard() {
  return (
    <MainCard title="">
      <Grid container spacing={4}>
        <Grid item xs={12} lg={6} sm={6}>
          <ReportCard primary="68" secondary="Open Topics" color="success.dark" iconPrimary={FileTextOutlined} to='/open-topics' />
        </Grid>
        <Grid item xs={12} lg={6} sm={6}>
          <ReportCard primary="12" secondary="My Topics" color="primary.main" iconPrimary={DownloadOutlined} to='/my-topics' />
        </Grid>
      </Grid>
      <br />
      <TopicTable  />
    </MainCard>
  );
}
