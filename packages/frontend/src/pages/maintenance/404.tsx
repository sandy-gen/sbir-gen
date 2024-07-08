import { Link } from 'react-router-dom';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import { APP_DEFAULT_PATH } from 'config';

// assets
import error404 from 'assets/images/maintenance/Error404.png';
import TwoCone from 'assets/images/maintenance/TwoCone.png';

// ==============================|| ERROR 404 - MAIN ||============================== //

export default function Error404() {
  return (
    <Grid
      container
      spacing={10}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', pt: 1.5, pb: 1, overflow: 'hidden', bgcolor: '#f0f4f8' }}
    >
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Box sx={{ width: { xs: 250, sm: 590 }, height: { xs: 130, sm: 300 } }}>
            <img src={error404} alt="404 Error" style={{ width: '100%', height: '100%' }} />
          </Box>
          <Box sx={{ position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: { xs: 30, sm: 60 }, left: { xs: -20, sm: -40 }, width: { xs: 130, sm: 390 }, height: { xs: 115, sm: 330 } }}>
              <img src={TwoCone} alt="Under Construction" style={{ width: '100%', height: '100%' }} />
            </Box>
          </Box>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={2} justifyContent="center" alignItems="center" textAlign="center">
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#333' }}>Page Not Found</Typography>
          <Typography color="text.secondary" sx={{ width: { xs: '80%', sm: '60%' }, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
            The page you are looking for was moved, removed, renamed, or might never have existed!
          </Typography>
          <Button component={Link} to={APP_DEFAULT_PATH} variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
            Back To Home
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
