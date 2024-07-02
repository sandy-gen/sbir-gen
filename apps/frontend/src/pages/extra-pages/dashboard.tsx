// material-ui
import { FileTextOutlined, DownloadOutlined } from '@ant-design/icons';
import { Grid } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import ReportCard from 'components/cards/statistics/ReportCard';
import OrdersList from 'sections/dashboard/analytics/OrdersList';

// ==============================|| SAMPLE PAGE ||============================== //

export default function Dashboard() {
  return (
    <MainCard title="">
      <Grid container sx={{}} >
        <Grid item xs={12} lg={6} sm={6}>
          <ReportCard primary="68" secondary="Open Topics" color="success.dark" iconPrimary={FileTextOutlined} />
        </Grid>
        <Grid item xs={12} lg={6} sm={6}>
          <ReportCard primary="12" secondary="My Topics" color="primary.main" iconPrimary={DownloadOutlined} />
        </Grid>
      </Grid>
      <br/>
      <OrdersList />
    </MainCard>
  );
}
