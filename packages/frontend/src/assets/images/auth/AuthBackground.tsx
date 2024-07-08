// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// project imports
import { ThemeDirection, ThemeMode } from 'config';
import login_image from 'assets/images/auth/login.png';

// ==============================|| AUTH BLUR BACK SVG ||============================== //

const AuthBackground = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: 'absolute',
        filter: 'blur(11px)',
        zIndex: -1,
        bottom: 100,
        // transform: theme.direction === ThemeDirection.RTL ? 'rotate(180deg)' : 'inherit'
      }}
    >
      <Box
        component="img"
        sx={{
          height: '70vh',
          // width: '95vh'
          // maxHeight: { xs: '20vh', md: '40vh' },
          // maxWidth: { xs: 350, md: 250 },
        }}
        alt=""
        src={login_image}
      />
    </Box>
  );
};

export default AuthBackground;
