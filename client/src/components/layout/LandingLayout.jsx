import React from 'react';
import LandingNavbar from '../LandingNavbar';
import { Outlet } from 'react-router-dom';

export default function LandingLayout() {
  return (
    <>
      <LandingNavbar />
      <Outlet />
    </>
  );
}
