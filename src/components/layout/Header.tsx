import React from 'react';
import userImg from '../../assets/images/userImg.png';
import logo from '../../assets/images/logoFull.png'

interface UserData {
  email: string;
  firstName: string;
}
interface HeaderProps {
  onLogout: () => void;
  userData: UserData | null;
  pageTitle: string;
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout, userData, pageTitle, onToggleSidebar }) => {
  return (
    <>
      <header className="pb-3 DashboardHeader d-lg-none d-md-flex w-100">
        <div className="row w-100">
          <div className="col-lg-6 col-md-6 col-sm-4 col-4 d-flex align-items-center">
            <div className="pageTitle">
              {/* <h1 className="m-0">{pageTitle}</h1> */}
              <img src={logo} height={'35px'} alt="" />
            </div>
          </div>
          <div
            className="col-lg-6 col-md-6 col-sm-8 col-8 d-flex align-items-center justify-content-end gap-lg-4 gap-md-3 gap-sm-3 gap-3">
            <div className="d-lg-none d-md-block d-block">
              <svg onClick={onToggleSidebar} viewBox="0 0 24 24" width="30px" height="30px" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
                </g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M4 7L7 7M20 7L11 7" stroke="#1C274C" stroke-width="1.5"
                    stroke-linecap="round"></path>
                  <path d="M20 17H17M4 17L13 17" stroke="#1C274C" stroke-width="1.5"
                    stroke-linecap="round"></path>
                  <path d="M4 12H7L20 12" stroke="#1C274C" stroke-width="1.5"
                    stroke-linecap="round"></path>
                </g>
              </svg>
            </div>
            <div className="headerUser d-flex align-items-center gap-3">
              <img src={userImg} alt="" />
              <h4 className="d-lg-block d-md-block d-sm-block d-none">{userData ? (
                <span> {userData.firstName}</span>
              ) : (
                ''
              )}</h4>
            </div>
            <div className="logOut" onClick={onLogout} style={{ cursor: 'pointer' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25"
                fill="none">
                <path
                  d="M14.6471 8.3001V6.2001C14.6471 5.64314 14.424 5.109 14.0268 4.71517C13.6297 4.32135 13.091 4.1001 12.5294 4.1001H5.11765C4.55601 4.1001 4.01738 4.32135 3.62024 4.71517C3.22311 5.109 3 5.64314 3 6.2001V18.8001C3 19.3571 3.22311 19.8912 3.62024 20.285C4.01738 20.6788 4.55601 20.9001 5.11765 20.9001H12.5294C13.091 20.9001 13.6297 20.6788 14.0268 20.285C14.424 19.8912 14.6471 19.3571 14.6471 18.8001V16.7001M8.29412 12.5001H21M21 12.5001L17.8235 9.3501M21 12.5001L17.8235 15.6501"
                  stroke="black" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
