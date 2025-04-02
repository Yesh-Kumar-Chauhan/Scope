import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Sidebar from './Sidebar';
import ProtectedRoutes from '../pages/auth/ProtectedRoutes';
import Header from './Header';
import District from '../pages/district/District';
import Site from '../pages/site/Site';
import Personnel from '../pages/personnel/Personnel';
import Report from '../pages/reports/Report';
import School from '../pages/school/school';
import Inservice from '../pages/inservice/Inservice';
import Closing from '../pages/closing/Closing';
import Visits from '../pages/visits/Visits';
import Status from '../pages/status/Status';
import Contact from '../pages/contact/contact'
import Workshop from '../pages/workshops/Workshop';
import Dashboard from '../pages/Dashboard';
import BulkTimeSheet from '../pages/bulkTimeSheet/BulkTimeSheet';
const Layout: React.FC = () => {
  const userDataString = localStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const navigate = useNavigate();
  const location = useLocation();

  const [pageTitle, setPageTitle] = useState('District');

  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };
  useEffect(() => {
    const routePath = location.pathname;
    switch (routePath) {
      case '/district':
        setPageTitle('District');
        break;
      case '/site':
        setPageTitle('Site');
        break;
      case '/personnel':
        setPageTitle('Personnel');
        break;
      case '/report':
        setPageTitle('Report');
        break;
      case '/school':
        setPageTitle('School');
        break;
      case '/inservice':
        setPageTitle('Inservice');
        break;
      case '/closing':
        setPageTitle('Closing');
        break;
      case '/visits':
        setPageTitle('Visits');
        break;
      case '/status':
        setPageTitle('Status');
        break;
      case '/contact':
        setPageTitle('Contacts');
        break;
      case '/workshop':
        setPageTitle('Workshop');
        break;
      case '/bulkTimeSheet':
        setPageTitle('bulkTimeSheet');
        break;
      default:
        setPageTitle('District'); // Default to 'District' for unrecognized routes
    }
  }, [location.pathname]);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate('/');
  };
  const handleNavigation = (route: string, title: string) => {
    setPageTitle(title);
    navigate(route);
    setSidebarVisible(!isSidebarVisible);
  };

  if (!userData) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }
  const isDashboard = location.pathname === '/dashboard';
  // const hideHeader = location.pathname === '/district' || location.pathname === '/site' || location.pathname === '/personnel' || location.pathname === '/school' || location.pathname === '/inservice' || location.pathname === '/closing' || location.pathname === '/workshop' || location.pathname === '/status' || location.pathname === '/visits' || location.pathname === '/contact';
  // const hideHeader = location.pathname === '/site';
  if (isDashboard) {
    return (
      <Routes>
        <Route element={<ProtectedRoutes allowedRoutes={true} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    );
  }

  return (
    <>
      <section className="DashboardPage">
        <div className="container-fluid">
          <div className="DashboardRow row d-flex flex-lg-row flex-md-row flex-sm-column flex-column ">
            <Sidebar
              onLogout={handleLogout}
              onNavigate={handleNavigation}
              isSidebarVisible={isSidebarVisible}
              onToggleSidebar={toggleSidebar} />
            <div className="PageBody">

              {/* <Header onLogout={handleLogout} userData={userData} pageTitle={pageTitle} /> */}
              {/* {!hideHeader && ( */}
              <Header
                onLogout={handleLogout}
                userData={userData}
                pageTitle={pageTitle}
                onToggleSidebar={toggleSidebar} />
              {/* )} */}
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route element={<ProtectedRoutes allowedRoutes={false} />}>
                  <Route path="/district" element={<District />} />
                  <Route path="/site" element={<Site />} />
                  <Route path="/personnel" element={<Personnel />} />
                  <Route path="/report" element={<Report />} />
                  <Route path="/school" element={<School />} />
                  <Route path="/inservice" element={<Inservice />} />
                  <Route path="/closing" element={<Closing />} />
                  <Route path="/visits" element={<Visits />} />
                  <Route path="/status" element={<Status />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/workshop" element={<Workshop />} />
                  <Route path="/bulkTimeSheet" element={<BulkTimeSheet />} />
                </Route>
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Layout;


