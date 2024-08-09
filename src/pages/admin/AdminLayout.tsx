import React from 'react';
import Sidebar from '../../components/admin/Sidebar';
import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <>
  
     <Sidebar role="admin"/>

    </>
  )
}

export default AdminLayout
