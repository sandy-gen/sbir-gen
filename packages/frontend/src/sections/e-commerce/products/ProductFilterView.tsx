// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// types
import { ProductsFilter, TopicsFilter } from 'types/e-commerce';

// project imports
import ColorOptions from './ColorOptions';
import IconButton from 'components/@extended/IconButton';

// assets
import CloseOutlined from '@ant-design/icons/CloseOutlined';

function getColor(color: string) {
  return ColorOptions.filter((item: any) => item.value === color);
}

// ==============================|| PRODUCT GRID - FILTER VIEW ||============================== //

interface TopicsFilterViewProps {
  filter: TopicsFilter;
  initialState: TopicsFilter;
  filterIsEqual: (initialState: TopicsFilter, filter: TopicsFilter) => boolean;
  handelFilter: (type: string, params: string, rating?: number) => void;
}

export default function ProductFilterView({ filter, filterIsEqual, handelFilter, initialState }: TopicsFilterViewProps) {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <>
      {!filterIsEqual(initialState, filter) && (
        <Stack spacing={2}>
          <Typography variant="h5">Active Filters</Typography>
          {!(initialState.search === filter.search) && (
            <Grid item>
              <Stack direction="row" alignItems="center" sx={{ ml: '-10px' }}>
                <Chip
                  size={matchDownMD ? 'small' : undefined}
                  label={filter.search}
                  sx={{
                    borderRadius: '4px',
                    textTransform: 'capitalize',
                    color: `grey.500`,
                    bgcolor: 'inherit',
                    '& .MuiSvgIcon-root': { color: `grey` }
                  }}
                />
                <IconButton
                  color="secondary"
                  size="small"
                  sx={{ '&:hover': { bgcolor: 'transparent' }, ml: -1.5 }}
                  onClick={() => handelFilter('search', '')}
                >
                  <CloseOutlined />
                </IconButton>
              </Stack>
            </Grid>
          )}
          {!(initialState.sort === filter.sort) && (
            <Grid item>
              <Stack>
                <Typography variant="subtitle1">Sort</Typography>
                <Stack direction="row" alignItems="center" sx={{ ml: '-10px' }}>
                  <Chip
                    size={matchDownMD ? 'small' : undefined}
                    label={filter.sort}
                    sx={{
                      borderRadius: '4px',
                      textTransform: 'capitalize',
                      color: `grey.500`,
                      bgcolor: 'inherit',
                      '& .MuiSvgIcon-root': { color: `grey` }
                    }}
                  />
                  <IconButton
                    color="secondary"
                    size="small"
                    sx={{ '&:hover': { bgcolor: 'transparent' }, ml: -1.5 }}
                    onClick={() => handelFilter('sort', initialState.sort)}
                  >
                    <CloseOutlined />
                  </IconButton>
                </Stack>
              </Stack>
            </Grid>
          )}
          {!(JSON.stringify(initialState.phase) === JSON.stringify(filter.phase)) && (
            <Grid item>
              <Stack>
                <Typography variant="subtitle1">Phase</Typography>
                <Grid container item sx={{ ml: '-10px' }}>
                  {filter.phase.map((item: string, index: number) => (
                    <Stack direction="row" alignItems="center" key={index}>
                      <Chip
                        size={matchDownMD ? 'small' : undefined}
                        label={item}
                        sx={{
                          borderRadius: '4px',
                          textTransform: 'capitalize',
                          color: `grey.500`,
                          bgcolor: 'inherit',
                          '& .MuiSvgIcon-root': { color: `grey` }
                        }}
                      />
                      <IconButton
                        color="secondary"
                        size="small"
                        sx={{ '&:hover': { bgcolor: 'transparent' }, ml: -1.5 }}
                        onClick={() => handelFilter('phase', item)}
                      >
                        <CloseOutlined />
                      </IconButton>
                    </Stack>
                  ))}
                </Grid>
              </Stack>
            </Grid>
          )}
          <Grid item>
            <Button variant="text" color="primary" sx={{ ml: '-10px' }} onClick={() => handelFilter('reset', '')}>
              Reset all filters
            </Button>
          </Grid>
          <Grid item>
            <Divider sx={{ ml: '-8%', mr: '-8%' }} />
          </Grid>
        </Stack>
      )}
    </>
  );
}
