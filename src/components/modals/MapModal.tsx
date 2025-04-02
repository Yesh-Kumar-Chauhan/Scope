// src/modal/MapModal.tsx
import React from 'react';
import moment from 'moment';
// Define the types for the props
interface MapModalProps {
  isOpen: boolean;
  closeModal: () => void;
  selectedSiteData: any
}

const MapModal: React.FC<MapModalProps> = ({ isOpen, closeModal, selectedSiteData }) => {
  if (!isOpen || !selectedSiteData) return null;
  const totalPersonnel = selectedSiteData?.personal?.length || 0;
  const siteTimeIn = moment(selectedSiteData.siteTimeIn, 'HH:mm:ss');
  const presentCount = selectedSiteData?.personal?.filter((staff: any) => {
    const staffTimeIn = staff.timeIn ? moment(staff.timeIn, 'HH:mm:ss') : null;
    return staffTimeIn && siteTimeIn;
}).length;
  function calculateBreakTime(lunchIn: any, lunchOut: any) {
    if (!lunchIn || !lunchOut) {
      return null;
    }
    const lunchInTime = moment(lunchIn, 'hh:mm A');
    const lunchOutTime = moment(lunchOut, 'hh:mm A');
    return lunchOutTime.diff(lunchInTime, 'minutes');
  }
  return (
    <div
      className={`modal fade show editAsignment mapInfoModal align-items-xl-center align-items-lg-start overflow-auto align-items-md-center align-items-start justify-content-center`}
      id="Filter"
      aria-labelledby="FilterLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog w-100">
        <div className="modal-content p-4">
          <div className="modal-body p-lg-2 p-md-2 p-0">
            <div className="formCard mt-0 p-0 border-0">
              <div className="FormTitleWithdivider position-relative d-flex align-items-center gap-3 mb-lg-3 mb-md-3 mb-3">
                <h3 className="text-nowrap formTitle m-0">{selectedSiteData.siteNumber}  {selectedSiteData.siteName}</h3>
                <hr className="w-100" />
                <div className="editForm" onClick={closeModal} style={{ cursor: 'pointer' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    style={{ cursor: 'pointer' }}
                  >
                    <path
                      d="M19 5.5L5 19.5M19 19.5L5 5.5"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="clockE mt-4">
                <div className="mb-3">
                  <label className="d-flex align-items-center justify-content-between gap-3 fw-bold">
                    <span>Today’s clock in :</span>
                    <span>{presentCount}/{totalPersonnel}</span>
                  </label>
                </div>

                <table className='table w-100 m-0'>
                  <thead>
                    <tr>
                      <th style={{ verticalAlign: 'middle' }} className='text-start text-nowrap'>
                        <label>Date: <b>{moment(selectedSiteData?.timeSheetDate).format('DD-MM-YYYY')}</b></label>
                      </th>
                      <th style={{ verticalAlign: 'middle' }} className='text-center text-nowrap'>
                        <label>Attendance Status</label>
                      </th>
                      <th style={{ verticalAlign: 'middle' }} className='text-center text-nowrap'>
                        <label>Check In Time</label>
                      </th>
                      <th style={{ verticalAlign: 'middle' }} className='text-center text-nowrap'>
                        <label>Check Out Time</label>
                      </th>
                      <th style={{ verticalAlign: 'middle' }} className='text-center text-nowrap'>
                        <label>Total Break Time</label><br />
                        <span style={{ fontSize: '12px' }}>(In Minutes)</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedSiteData?.personal?.map((staff: any, index: any) => {
                   const siteTimeIn = selectedSiteData.siteTimeIn ? moment(selectedSiteData.siteTimeIn, 'HH:mm:ss') : null;
                   const staffTimeIn = staff.timeIn ? moment(staff.timeIn, 'HH:mm:ss') : null;
                      const status = (!siteTimeIn || !staffTimeIn)
                        ? "Absent"
                        : siteTimeIn.isBefore(staffTimeIn)
                          ? "Late"
                          : "Present";
                      return (

                        <tr>
                          <td style={{ verticalAlign: 'middle' }} className='text-nowrap'>
                            <label>Employee {`${index + 1}`} : <b> {`${staff.firstname} ${staff.lastname}`}</b></label><br />
                            <label>Position: <b>{staff.position}</b></label>
                          </td>
                          <td style={{ verticalAlign: 'middle' }} className='text-center'>
                            <label>{status}</label>
                          </td>
                          <td style={{ verticalAlign: 'middle' }} className='text-center'>
                            <label>{staff?.timeIn ? moment(staff.timeIn, 'HH:mm').format('hh:mm A') : ''}</label>
                          </td>
                          <td style={{ verticalAlign: 'middle' }} className='text-center'>
                            <label>{staff?.timeOut ? moment(staff.timeOut, 'HH:mm').format('hh:mm A') : ''}</label>
                          </td>
                          <td style={{ verticalAlign: 'middle' }} className='text-center'>
                            <label>{calculateBreakTime(staff?.lunchIn, staff?.lunchOut) !== null && (
                              <label>{calculateBreakTime(staff?.lunchIn, staff?.lunchOut)} Min</label>
                            )}</label>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
