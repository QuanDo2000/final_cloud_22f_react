import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './Header.module.css';
import PropTypes from 'prop-types';
import { Link as MuiLink } from '@mui/material';

export default function Header({
  token,
  setToken,
  custom,
  setCustom,
}: {
  token: string | null;
  setToken: (userToken: string | null) => void;
  custom: boolean;
  setCustom: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerUl}>
          <div className={styles.headerRight}>
            <Link to="/" className={styles.headerA}>
              Home
            </Link>
            <Link to={token ? '/dashboard' : '/'} className={styles.headerA}>
              Dashboard
            </Link>
            <Link
              to={token ? (!custom ? '/import' : '/') : '/'}
              className={styles.headerA}
            >
              {!custom ? 'Import' : 'Imported'}
            </Link>
          </div>
          {token && (
            <div className={styles.headerLeft}>
              <div className={styles.headerA}>Hello, {token}</div>
              {custom ? (
                <MuiLink
                  href="/"
                  className={styles.headerA}
                  marginX="1rem"
                  color="#fff"
                  onClick={() => {
                    setCustom(false);
                  }}
                  underline="none"
                >
                  Remove Import
                </MuiLink>
              ) : (
                <></>
              )}
              <MuiLink
                href="/"
                className={styles.headerA}
                marginX="1rem"
                color="#fff"
                onClick={() => {
                  setToken(null);
                  setCustom(false);
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
  token: PropTypes.string.isRequired,
  custom: PropTypes.bool.isRequired,
  setToken: PropTypes.func.isRequired,
  setCustom: PropTypes.func.isRequired,
};
