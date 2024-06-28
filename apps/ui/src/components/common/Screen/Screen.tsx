// src/components/ExampleScreen.tsx

import React from 'react';
import { Typography, Container, Paper, Grid } from '@mui/material';

// Define the props interface
interface ScreenProps {
    title: string;
    subtitle: string;
    children: any;
}

const Screen: React.FC<ScreenProps> = ({ title, subtitle, children }) => (
    <Container sx={{  }}>
        <Typography variant="h6" component="h6" gutterBottom>
            {title}
        </Typography>
        <hr />
        <Typography variant="h6" component="h2" gutterBottom>
            {subtitle}
        </Typography>
        <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
            <Grid container spacing={2}>
                {children}
            </Grid>
        </Paper>
    </Container>
);

export default Screen;
