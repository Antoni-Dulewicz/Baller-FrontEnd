import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function CustomBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div style={{ padding: '16px' }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{
          '& .MuiLink-root': {
            display: 'flex',
            alignItems: 'center',
            color: 'inherit',
            fontWeight: 500,
          },
          '& .MuiTypography-root': {
            display: 'flex',
            alignItems: 'center',
            color: 'text.primary',
            fontWeight: 500,
          },
        }}
      >
        <Link
          component={RouterLink}
          to="/"
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          Home
        </Link>

        {pathnames.map((name, index) => {
          const routeTo = '/' + pathnames.slice(0, index + 1).join('/');
          const isLast = index === pathnames.length - 1;

          const label = decodeURIComponent(name);

          return isLast ? (
            <Typography key={name}>{label}</Typography>
          ) : (
            <Link
              key={name}
              component={RouterLink}
              to={routeTo}
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
