// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';

// project imports
import ProductFilterView from './ProductFilterView';
import ProductFilter from './ProductFilter';
import MainCard from 'components/MainCard';
import SimpleBar from 'components/third-party/SimpleBar';

import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';

// types
import { TopicsFilter } from 'types/e-commerce';

// ==============================|| PRODUCT - FILTER DRAWER ||============================== //

interface FilterDrawerProps {
  filter: TopicsFilter;
  initialState: TopicsFilter;
  handleDrawerOpen: () => void;
  openFilterDrawer: boolean | undefined;
  setFilter: (filter: TopicsFilter) => void;
  setLoading: (flag: boolean) => void;
}

export default function ProductFilterDrawer({
  filter,
  initialState,
  handleDrawerOpen,
  openFilterDrawer,
  setFilter,
  setLoading
}: FilterDrawerProps) {
  const theme = useTheme();

  const { mode, container } = useConfig();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
  const matchLG = useMediaQuery(theme.breakpoints.only('lg'));
  const drawerBG = mode === ThemeMode.DARK ? 'dark.main' : 'white';

  const filterIsEqual = (a1: TopicsFilter, a2: TopicsFilter) =>
    a1 === a2 ||
    (a1.length === a2.length &&
      a1.search === a2.search &&
      a1.sort === a2.sort &&
      JSON.stringify(a1.phase) === JSON.stringify(a2.phase));
      // a1.price === a2.price &&
      // a1.rating === a2.rating &&
      // JSON.stringify(a1.gender) === JSON.stringify(a2.gender) &&
      // JSON.stringify(a1.categories) === JSON.stringify(a2.categories) &&
      // JSON.stringify(a1.colors) === JSON.stringify(a2.colors));

  const handelFilter = (type: string, params: string, rating?: number) => {
    setLoading(true);
    switch (type) {
      case 'phase':
        if (filter.phase.some((item) => item === params)) {
          setFilter({ ...filter, phase: filter.phase.filter((item) => item !== params) });
        } else {
          setFilter({ ...filter, phase: [...filter.phase, params] });
        }
        break;
      
      default:
      // no options
    }
  };

  const drawerContent = (
    <Stack sx={{ p: 3 }} spacing={0.5}>
      <ProductFilterView filter={filter} filterIsEqual={filterIsEqual} handelFilter={handelFilter} initialState={initialState} />
      <ProductFilter filter={filter} handelFilter={handelFilter} />
    </Stack>
  );

  return (
    <Drawer
      sx={{
        width: container && matchLG ? 240 : 320,
        flexShrink: 0,
        zIndex: { xs: 1200, lg: 0 },
        mr: openFilterDrawer && !matchDownLG ? 2.5 : 0,
        '& .MuiDrawer-paper': {
          height: matchDownLG ? '100%' : 'auto',
          width: container && matchLG ? 240 : 320,
          boxSizing: 'border-box',
          position: 'relative',
          boxShadow: 'none'
        }
      }}
      variant={matchDownLG ? 'temporary' : 'persistent'}
      anchor="left"
      open={openFilterDrawer}
      ModalProps={{ keepMounted: true }}
      onClose={handleDrawerOpen}
    >
      <MainCard
        title="Filter"
        sx={{
          bgcolor: matchDownLG ? 'transparent' : drawerBG,
          borderRadius: '4px 0 0 4px',
          borderRight: 'none'
        }}
        border={!matchDownLG}
        content={false}
      >
        {matchDownLG && <SimpleBar sx={{ height: 'calc(100vh - 60px)' }}>{drawerContent}</SimpleBar>}
        {!matchDownLG && drawerContent}
      </MainCard>
    </Drawer>
  );
}
