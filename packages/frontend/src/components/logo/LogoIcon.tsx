// material-ui
import { useTheme } from '@mui/material/styles';
import { ThemeMode } from 'config';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoIconDark from 'assets/images/logo-icon-dark.svg';
 * import logoIcon from 'assets/images/logo-icon.svg';
 * import { ThemeMode } from 'config';
 *
 */
import logoIconDark from 'assets/images/logo/logo_dark.svg';
import logoIcon from 'assets/images/logo/logo.svg';
// ==============================|| LOGO ICON SVG ||============================== //

export default function LogoIcon() {
  const theme = useTheme();

  return (
    <img src={theme.palette.mode === ThemeMode.DARK ? logoIconDark : logoIcon} alt="SBIR Gen" width="300" style={{marginTop: 14}} />
  );
}
