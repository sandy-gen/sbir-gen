// material-ui
import { useTheme } from '@mui/material/styles';

// project-import
import { ThemeMode } from 'config';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */
import logoDark from 'assets/images/logo/logo_dark.svg';
import logo from 'assets/images/logo/logo.svg';
// ==============================|| LOGO SVG ||============================== //

export default function LogoMain({ reverse }: { reverse?: boolean }) {
  const theme = useTheme();
  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     *
     */
    <>
      <img src={theme.palette.mode === ThemeMode.DARK ? logoDark : logo} alt="SBIR Gen" width="200"  style={{marginTop:38, padding: 2}} />

    </>
  );
}
