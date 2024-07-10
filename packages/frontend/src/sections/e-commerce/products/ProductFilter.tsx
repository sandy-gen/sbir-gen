import { useEffect, useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Skeleton from '@mui/material/Skeleton';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// project imports
import Colors from './Colors';

// types
import { ProductsFilter, TopicsFilter } from 'types/e-commerce';

// ==============================|| TOPICS GRID PHASE FILTER ||============================== //
function Phase({ phase, handelFilter }: { phase: string[]; handelFilter: (type: string, params: string) => void }) {
  const [isPhaseLoading, setPhaseLoading] = useState(true);

  useEffect(() => {
    setPhaseLoading(false);
  }, []);

  return (
    <Stack>
    {isPhaseLoading ? (
      <Skeleton variant="rectangular" width="100%" height={42} />
    ) : (
      <>
        <Typography variant="h5">Phase</Typography>
        <Box sx={{ pl: 0.5 }}>
          <Stack>
            <FormControlLabel
              control={<Checkbox checked={phase.some((item) => item === 'I')} />}
              onChange={() => handelFilter('phase', 'i')}
              label="Phase I"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={phase.some((item) => item === 'II')}
                  onChange={() => handelFilter('phase', 'ii')}
                  color="secondary"
                />
              }
              label="Phase II"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={phase.some((item) => item === 'III')}
                  onChange={() => handelFilter('phase', 'iii')}
                  color="error"
                />
              }
              label="Phase III"
            />
          </Stack>
        </Box>
      </>
    )}
  </Stack>
  )
}

export default function TopicFilter({
  filter,
  handelFilter
}: {
  filter: TopicsFilter;
  handelFilter: (type: string, params: string, rating?: number) => void;
}) {
  return (
    <Grid container direction="column" rowSpacing={3}>
      <Grid item>
        {/* <Phase phase={filter.status} handelFilter={handelFilter} /> */}
      </Grid>
      {/* <Grid item>
        <Categories categories={filter.categories} handelFilter={handelFilter} />
      </Grid>
      <Grid item>
        <Colors colors={filter.colors} handelFilter={handelFilter} />
      </Grid>
      <Grid item>
        <Price price={filter.price} handelFilter={handelFilter} />
      </Grid>
      <Grid item>
        <RatingSection rating={filter.rating} handelFilter={handelFilter} />
      </Grid> */}
    </Grid>
  );
}
