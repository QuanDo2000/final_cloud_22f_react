import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './Header.module.css';
import PropTypes from 'prop-types';
import { Link as MuiLink } from '@mui/material';

export default function Header({
  token,
  setToken,
}: {
  token: string | null;
  setToken: (userToken: string | null) => void;
}) {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerUl}>
          <div className={styles.headerRight}>
            <Link to="/" className={styles.headerA}>
              Home
            </Link>
            <Link to="/dashboard" className={styles.headerA}>
              Dashboard
            </Link>
          </div>
          {token && (
            <div className={styles.headerLeft}>
              <div className={styles.headerA}>Hello, User</div>
              <MuiLink
                href="#"
                className={styles.headerA}
                color="#fff"
                onClick={() => {
                  setToken(null);
                }}
                underline="none"
              >
                Logout
              </MuiLink>
            </div>
          )}
        </div>
      </header>
      <Outlet />
    </>
  );
}

Header.propTypes = {
  token: PropTypes.string,
};
