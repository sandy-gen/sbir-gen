// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';
import { ThemeDirection, ThemeMode } from 'config';

//asset
import WelcomeImage from 'assets/images/analytics/welcome-banner.png';
import WelcomeImageArrow from 'assets/images/analytics/welcome-arrow.png';

// ==============================|| ANALYTICS - WELCOME ||============================== //

export default function WelcomeBanner() {
  const theme = useTheme();

  return (
    <MainCard
      border={false}
      sx={{
        background: `linear-gradient(250.38deg, ${theme.palette.primary.lighter} 2.39%, ${theme.palette.primary.light} 34.42%, ${theme.palette.primary.main} 60.95%, ${theme.palette.primary.dark} 84.83%, ${theme.palette.primary.darker} 104.37%)`,
        ...(theme.direction === ThemeDirection.RTL && {
          background: `linear-gradient(60.38deg, ${theme.palette.primary.lighter} 114%, ${theme.palette.primary.light} 34.42%, ${theme.palette.primary.main} 60.95%, ${theme.palette.primary.dark} 84.83%, ${theme.palette.primary.darker} 104.37%)`
        })
      }}
    >
      <Grid container>
        <Grid item md={6} sm={6} xs={12}>
          <Stack spacing={2} sx={{ padding: 3.4 }}>
            <Typography variant="h2" color="background.paper">
              Welcome to SBIR Gen
            </Typography>
            <Typography variant="h6" color="background.paper">
            AI Generated SBIR Proposal Writing
            </Typography>

          </Stack>
        </Grid>
        <Grid item sm={6} xs={12} sx={{ display: { xs: 'none', sm: 'initial' } }}>
          <Stack sx={{ position: 'relative', pr: { sm: 3, md: 8 } }} justifyContent="center" alignItems="flex-end">
            
         
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
}
