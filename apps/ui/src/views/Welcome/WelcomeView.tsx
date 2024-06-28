import { Typography } from '@mui/material';
import { AppView } from '@/components';
import { Screen } from '@/components/common/Screen'


/**
 * Renders "Welcome" view
 * url: /
 * @page Welcome
 */
const WelcomeView = () => {
  return (
    <AppView>
      <Screen title={'Dashboard'} subtitle={'..'}>
        <Typography variant="h4"></Typography>
      </Screen>
    </AppView>
  );
};

export default WelcomeView;
