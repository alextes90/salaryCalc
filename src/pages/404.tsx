import React from 'react';
import { Link } from 'gatsby';
import { Alert, Box, Typography, Button } from '@mui/material';

const pageStyles = {
  height: '100vh',
};

const wrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
};

const alertStyle = {
  padding: '2em',
};

const btnStyle = {
  marginTop: '2em',
};

const NotFoundPage = () => {
  return (
    <main style={pageStyles}>
      <title>Not found</title>
      <Box sx={wrapperStyle}>
        <Alert severity="info" sx={alertStyle}>
          <Typography variant="h4">Page not found</Typography>
          <Typography variant="subtitle2">
            Sorry we couldn’t find what you were looking for.
          </Typography>

          <Button component={Link} to="/" variant="contained" sx={btnStyle}>
            Go back
          </Button>
        </Alert>
      </Box>
    </main>
  );
};

export default NotFoundPage;
