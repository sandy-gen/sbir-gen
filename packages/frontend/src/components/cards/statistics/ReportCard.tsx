// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'components/MainCard';
import { GenericCardProps } from 'types/root';
import {  Link as RouterLink, LinkProps as RouterLinkProps  } from 'react-router-dom';
import { styled } from '@mui/material/styles';
interface ReportCardProps extends GenericCardProps { }

// ==============================|| REPORT CARD ||============================== //
const StyledRouterLink = styled(RouterLink)<RouterLinkProps>(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
}));

export default function ReportCard({ primary, secondary, iconPrimary, color, to }: ReportCardProps) {
  const IconPrimary = iconPrimary!;
  const primaryIcon = iconPrimary ? <IconPrimary fontSize="large" /> : null;

  return (
    <MainCard>
      <Grid container justifyContent="space-between" alignItems="center" component={StyledRouterLink} to={to || ''}>
        <Grid item>
          <Stack spacing={1}>
            <Typography variant="h4">{primary}</Typography>
            <Typography variant="body1" color="secondary">
              {secondary}
            </Typography>
          </Stack>
        </Grid>
        <Grid item>
          <Typography variant="h2" sx={{ color }}>
            {primaryIcon}
          </Typography>
        </Grid>
      </Grid>
    </MainCard>
  );
}
