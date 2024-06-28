import { FunctionComponent, ReactNode } from 'react';
import { AppBar, Stack, Toolbar, Typography } from '@mui/material';
import { AppIconButton } from '@/components';
import { useEventLogout } from '@/hooks';
import { useAppStore } from '@/store';
import { sessionStorageSet } from '@/utils';
import { useNavigate } from 'react-router-dom';

interface Props {
  endNode?: ReactNode;
  startNode?: ReactNode;
  title?: string;
}

/**
 * Renders TopBar composition
 * @component TopBar
 */
const TopBar: FunctionComponent<Props> = ({ endNode, startNode, title = '', ...restOfProps }) => {
  const navigate = useNavigate();
  const [, dispatch] = useAppStore();
  const onLogout = useEventLogout();

  const onLogin = () => {
    // TODO: AUTH: Sample of access token store, replace next line in real application
    sessionStorageSet('access_token', 'TODO:_save-real-access-token-here');
    localStorage.setItem('access_token', '34345433553')
    dispatch({ type: 'LOG_IN' });
    navigate('/', { replace: true }); // Redirect to home page without ability to go back
  };

  return (
    <AppBar
      component="div"
      sx={
        {
          // boxShadow: 'none', // Uncomment to hide shadow
        }
      }
      {...restOfProps}
    >
      <Toolbar disableGutters sx={{ paddingX: 1 }}>
        {startNode}

        <Typography
          variant="h6"
          sx={{
            marginX: 1,
            flexGrow: 1,
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </Typography>

        {endNode}
        <Stack direction="row" justifyContent="center">

          {!localStorage.getItem('access_token') && (
            <AppIconButton icon="login" title="Login" onClick={onLogin} />
          )}
          {localStorage.getItem('access_token') && (
            <AppIconButton icon="logout" title="Logout Current User" onClick={onLogout} />)}
        </Stack>
      </Toolbar>

    </AppBar>
  );
};

export default TopBar;
