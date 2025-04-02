import React, { useEffect, useState } from 'react';
import { ITimesheetTable } from '../../../../interface/Personnel';
import moment from 'moment';
interface TimesheetFormProps {
    timeSheetData: { data: ITimesheetTable[]; totalItems: number } | undefined;
    currentPersonnel: any;
}
interface DateEntry {
    day: string;
    date: string;
}
const TimesheetForm: React.FC<TimesheetFormProps> = ({ timeSheetData, currentPersonnel }) => {
    const [twoWeeksData, setTwoWeeksData] = useState<DateEntry[]>([]);
    const [editableData, setEditableData] = useState(timeSheetData?.data || []);
    useEffect(() => {

        const generateTwoWeeksData = (): DateEntry[] => {
            const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
            const today = moment();
            const startOfCurrentWeek = today.clone().startOf('isoWeek');
            const twoWeeks: DateEntry[] = [];

            const startOfNextWeek = startOfCurrentWeek.clone().add(1, 'week');
            for (let i = 0; i < 5; i++) {
                const day = startOfNextWeek.clone().add(i, 'days');
                if (daysOfWeek.includes(day.format('ddd'))) {
                    twoWeeks.push({
                        day: day.format('ddd'),
                        date: day.format('YYYY-MM-DD'),
                    });
                }
            }

            for (let i = 0; i < 5; i++) {
                const day = startOfCurrentWeek.clone().add(i, 'days');
                if (daysOfWeek.includes(day.format('ddd'))) {
                    twoWeeks.push({
                        day: day.format('ddd'),
                        date: day.format('YYYY-MM-DD'),
                    });
                }
            }

            return twoWeeks;
        };

        setTwoWeeksData(generateTwoWeeksData());
    }, [timeSheetData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, timesheetID: string, field: string) => {
        let { value } = e.target;
        if (value) value = `${value}:00`;
        setEditableData((prevData: any[]) =>
            prevData.map((row) =>
                row.timesheetID === timesheetID
                    ? { ...row, [field]: value }
                    : row
            )
        );
    };

    return (
        <div className="TimeSheetModal timeSheetpage">
            <div className="formCard mt-0 p-0 border-0">
                <form className="DistrictForm">
                    <div className="mb-2 pt-3 row TimeSheetTitle">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                            <div className="mb-0 w-100 d-flex align-items-center gap-3">
                                <label className="form-label mb-0" style={{ minWidth: '80px' }}>Name :</label>
                                <input
                                    type="text"
                                    className="form-control w-auto"
                                    id="initialExpiration"
                                    name="initialExpiration"
                                    placeholder='Name'
                                    // value={fullName}  
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                            <div className="mb-0 w-100 d-flex align-items-center gap-3">
                                <label className="form-label mb-0" style={{ minWidth: '80px' }}>Position :</label>
                                <input
                                    type="text"
                                    className="form-control w-auto"
                                    id="initialExpiration"
                                    placeholder='Position'
                                    name="initialExpiration"
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                            <div className="mb-0 w-100 d-flex align-items-center gap-3">
                                <label className="form-label mb-0" style={{ minWidth: '80px' }}>District :</label>
                                <input
                                    type="text"
                                    className="form-control w-auto"
                                    id="initialExpiration"
                                    placeholder='District'
                                    name="initialExpiration"
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                            <div className="mb-0 w-100 d-flex align-items-center gap-3">
                                <label className="form-label mb-0" style={{ minWidth: '80px' }}>Budget Code :</label>
                                <input
                                    type="text"
                                    className="form-control w-auto"
                                    id="initialExpiration"
                                    placeholder='Budget Code'
                                    name="initialExpiration"
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                            <div className="mb-0 w-100 d-flex align-items-center gap-3">
                                <label className="form-label mb-0" style={{ minWidth: '80px' }}>Max Hours :</label>
                                <input
                                    type="text"
                                    className="form-control w-auto"
                                    id="initialExpiration"
                                    placeholder='Max Hours'
                                    name="initialExpiration"
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                            <div className="mb-0 w-100 d-flex align-items-center gap-3">
                                <label className="form-label mb-0" style={{ minWidth: '80px' }}>Program :</label>
                                <input
                                    type="text"
                                    className="form-control w-auto"
                                    id="initialExpiration"
                                    placeholder='Program'
                                    name="initialExpiration"
                                />
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12 d-flex align-items-end">
                            <div className="mb-0 w-100 d-flex align-items-center gap-3">
                                <label className="form-label mb-0" style={{ minWidth: '80px' }}>Schedule :</label>
                                <input
                                    type="text"
                                    className="form-control w-auto"
                                    id="initialExpiration"
                                    placeholder='Schedule'
                                    name="initialExpiration"
                                />
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12 d-flex align-items-end">
                            <div className="mb-0 w-100 d-flex align-items-center gap-3">
                                <label className="form-label mb-0" style={{ minWidth: '80px' }}>Comment :</label>
                                <input
                                    type="text"
                                    className="form-control w-100"
                                    id="initialExpiration"
                                    placeholder='Comment'
                                    name="initialExpiration"
                                />
                            </div>
                        </div>
                        <div className='col-12'>
                            <label className='form-label mb-0'>
                                <b className='text-danger'>IMPORTANT NOTE: </b>
                                You may be assigned additional hours or a location change which you must accommodate in order to meet legally required
                                staff to student ratio.
                            </label>
                        </div>
                    </div>
                    <div className="mb-3 row g-4">
                        <div className='col-lg-6 col-md-12 col-sm-12 col-12'>
                            <div className="FormTitleWithdivider mt-2 mb-2 position-relative">
                                <h3 className="text-nowrap text-center formTitle m-0">Hours Worked</h3>
                                <h3 className="text-nowrap text-center formTitle m-0">(Record Actual time worked)</h3>
                            </div>
                            <div className="clockE mt-0">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Day</th>
                                            <th>Date</th>
                                            <th>In</th>
                                            <th>Out</th>
                                            <th>Lunch Out</th>
                                            <th>Lunch In</th>
                                            <th>#Hours</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {twoWeeksData.map(({ day, date }) => {
                                            const normalizedDate = moment(date).format("YYYY-MM-DD");
                                            const rowData = editableData
                                                .filter((row: any) => row.paycode === "")
                                                .find((row: any) => {
                                                    const rowTimeSheetDate = moment(row.timeSheetDate).format("YYYY-MM-DD");
                                                    if (rowTimeSheetDate === normalizedDate) {
                                                        console.log("matched", normalizedDate);
                                                    }
                                                    return rowTimeSheetDate === normalizedDate;
                                                });
                                            return (
                                                <tr key={date}>
                                                    <td>{day}</td>
                                                    <td>
                                                        <input
                                                            type="date"
                                                            value={rowData ? moment(rowData.timeSheetDate).format("YYYY-MM-DD") : ''}
                                                            readOnly
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="time"
                                                            value={rowData?.timeIn || ""}
                                                            disabled={!rowData}
                                                            onChange={(e) => handleChange(e, rowData?.timesheetID, "timeIn")}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="time"
                                                            value={rowData?.timeOut || ""}
                                                            disabled={!rowData}
                                                            onChange={(e) => handleChange(e, rowData?.timesheetID, "timeOut")}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="time"
                                                            value={rowData?.lunchOut || ""}
                                                            disabled={!rowData}
                                                            onChange={(e) => handleChange(e, rowData?.timesheetID, "lunchOut")}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="time"
                                                            value={rowData?.lunchIn || ""}
                                                            disabled={!rowData}
                                                            onChange={(e) => handleChange(e, rowData?.timesheetID, "lunchIn")}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            // value={hoursWorked}
                                                            disabled={!rowData}
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>

                            </div>

                            <div className="FormTitleWithdivider mt-2 mb-2 position-relative">
                                <h3 className="text-nowrap text-end formTitle m-0 d-flex align-items-end justify-content-end">Total:
                                    <h3 className="text-nowrap text-start formTitle m-0 ms-1" style={{ borderBottom: '1px solid #000', minWidth: '80px' }}>3.57 hours</h3>
                                </h3>
                            </div>


                        </div>
                        <div className='col-lg-6 col-md-12 col-sm-12 col-12'>
                            <div className="FormTitleWithdivider mt-2 mb-2 position-relative">
                                <h3 className="text-nowrap  text-center formTitle m-0">Additional Hours / Extra Pay</h3>
                                <h3 className="text-nowrap  text-center formTitle m-0">(Record Actual time worked)</h3>
                            </div>
                            <div className="clockE mt-0">
                                <table className="table w-100 m-0">
                                    <thead>
                                        <tr>
                                            <th style={{ verticalAlign: "middle" }} className="text-center text-nowrap">
                                                <label>Date</label>
                                            </th>
                                            <th style={{ verticalAlign: "middle" }} className="text-center text-nowrap">
                                                <label>Start</label>
                                            </th>
                                            <th style={{ verticalAlign: "middle" }} className="text-center text-nowrap">
                                                <label>Stop</label>
                                            </th>
                                            <th style={{ verticalAlign: "middle" }} className="text-center text-nowrap">
                                                <label>Explanation/Location</label>
                                            </th>
                                            <th style={{ verticalAlign: "middle" }} className="text-center text-nowrap">
                                                <label>Code</label>
                                            </th>
                                            <th style={{ verticalAlign: "middle" }} className="text-center text-nowrap">
                                                <label>#Hours</label>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {twoWeeksData.map(({ day, date }) => {
                                            const normalizedDate = moment(date).format("YYYY-MM-DD");

                                            // Filter rows where paycode has a value (not an empty string)
                                            const rowData = editableData
                                                .filter((row: any) => row.paycode !== "")
                                                .find((row: any) => {
                                                    const rowTimeSheetDate = moment(row.timeSheetDate).format("YYYY-MM-DD");
                                                    return rowTimeSheetDate === normalizedDate;
                                                });

                                            return (
                                                <tr key={date}>
                                                    <td style={{ verticalAlign: "middle" }} className="text-center">
                                                        <input
                                                            type="date"
                                                            value={rowData ? moment(rowData.timeSheetDate).format("YYYY-MM-DD") : ''}
                                                            readOnly
                                                        />
                                                    </td>
                                                    <td style={{ verticalAlign: "middle" }} className="text-center">
                                                        <input
                                                            type="time"
                                                            value={rowData?.timeIn || ""}
                                                            disabled={!rowData}
                                                            onChange={(e) => handleChange(e, rowData?.timesheetID, "timeIn")}
                                                        />
                                                    </td>
                                                    <td style={{ verticalAlign: "middle" }} className="text-center">
                                                        <input
                                                            type="time"
                                                            value={rowData?.timeOut || ""}
                                                            disabled={!rowData}
                                                            onChange={(e) => handleChange(e, rowData?.timesheetID, "timeOut")}

                                                        />
                                                    </td>
                                                    <td style={{ verticalAlign: "middle" }} className="text-center">
                                                        <input
                                                            type="text"
                                                            readOnly
                                                        />
                                                    </td>
                                                    <td style={{ verticalAlign: "middle" }} className="text-center">
                                                        <input
                                                            type="text"
                                                            value={rowData?.paycode || ""}
                                                            readOnly
                                                        />
                                                    </td>
                                                    <td style={{ verticalAlign: "middle" }} className="text-center">
                                                        <input
                                                            type="text"
                                                            // Assuming hoursWorked is calculated elsewhere
                                                            disabled={!rowData}
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>

                            </div>
                            <div className="FormTitleWithdivider mt-2 mb-2 position-relative">
                                <h3 className="text-nowrap text-end formTitle m-0 d-flex align-items-end justify-content-end">Total:
                                    <h3 className="text-nowrap text-start formTitle m-0 ms-1" style={{ borderBottom: '1px solid #000', minWidth: '80px' }}>
                                        3.57 hours</h3>
                                </h3>
                            </div>
                        </div>
                        <div className='row mb-3 mt-0 g-4 mx-0 px-0'>
                            <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                                <table className="table w-100 m-0 mt-2">
                                    <thead>
                                        <tr>
                                            <th style={{ verticalAlign: "middle", width: '50%' }} className="text-start text-nowrap">
                                                <label>
                                                    <b>For documenting time not at work indicate</b>
                                                </label>
                                            </th>
                                            <th style={{ verticalAlign: "middle", width: '50%' }} className="text-start text-nowrap">
                                                <label></label>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={{ verticalAlign: "middle", width: '50%' }} className="py-0 text-wrap">
                                                <label>
                                                    Sick (Personal Illness or Immediate Family)
                                                </label>
                                            </td>
                                            <td style={{ verticalAlign: "middle", width: '50%' }} className="py-0 text-start">
                                                <label>
                                                    Jury Duty
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ verticalAlign: "middle", width: '50%' }} className="py-0 text-wrap">
                                                <label>
                                                    Personal Business
                                                </label>
                                            </td>
                                            <td style={{ verticalAlign: "middle", width: '50%' }} className="py-0 text-start">
                                                <label>
                                                    Bereavement (Indicate Relationship)
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ verticalAlign: "middle", width: '50%' }} className="py-1 text-wrap">
                                                <label>
                                                    School Closed (as Indicated on Calendar)
                                                </label>
                                            </td>
                                            <td style={{ verticalAlign: "middle", width: '50%' }} className="py-1 text-start">
                                                <label>
                                                    Emergency Closing<br />
                                                    (Snow Days, other authorized emergencies)
                                                </label>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                                <table className="table w-100 m-0 mt-2">
                                    <thead>
                                        <tr>
                                            <th style={{ verticalAlign: "middle" }} className="text-start text-nowrap">
                                                <label>
                                                    <b>Code</b>
                                                </label>
                                            </th>
                                            <th style={{ verticalAlign: "middle" }} className="text-start text-nowrap">
                                                <label>
                                                    <b>Explanation / Location</b>
                                                </label>
                                            </th>
                                            <th style={{ verticalAlign: "middle" }} className="text-start text-nowrap">
                                                <label>
                                                    <b>Code</b>
                                                </label>
                                            </th>
                                            <th style={{ verticalAlign: "middle" }} className="text-start text-nowrap">
                                                <label>
                                                    <b>Explanation / Location</b>
                                                </label>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={{ verticalAlign: "middle" }} className="text-start  text-wrap">
                                                <label>
                                                    1
                                                </label>
                                            </td>
                                            <td style={{ verticalAlign: "middle" }} className="text-start  text-wrap">
                                                <label>
                                                    Assigned Role of Acting Director
                                                </label>
                                            </td>
                                            <td style={{ verticalAlign: "middle" }} className="text-start  text-wrap">
                                                <label>
                                                    3
                                                </label>
                                            </td>
                                            <td style={{ verticalAlign: "middle" }} className="text-start  text-wrap">
                                                <label>
                                                    Group Leader assigned to role of Small Group
                                                    Leader
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ verticalAlign: "middle" }} className="text-start  text-wrap">
                                                <label>
                                                    2
                                                </label>
                                            </td>
                                            <td style={{ verticalAlign: "middle" }} className="text-start  text-wrap">
                                                <label>
                                                    Assigned to another program site Permanent
                                                    sub assigned to a program outside of cluster
                                                </label>
                                            </td>
                                            <td style={{ verticalAlign: "middle" }} className="text-start  text-wrap">
                                                <label>
                                                    4
                                                </label>
                                            </td>
                                            <td style={{ verticalAlign: "middle" }} className="text-start  text-wrap">
                                                <label>
                                                    Group Leader assigned to role of Head of
                                                    Group
                                                </label>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='col-12 pt-lg-4 pt-md-3 pt-3 d-flex align-items-center gap-lg-4 gap-md-3 gap-3 flex-lg-nowrap flex-md-nowrap flex-sm-wrap flex-wrap'>
                            <div className="FormTitleWithdivider mt-0 mb-0 position-relative">
                                <h3 className="text-nowrap text-end formTitle m-0 d-flex align-items-end gap-2 justify-content-start">Total:
                                    <h3 className="text-nowrap text-center formTitle m-0 ms-1" style={{ borderBottom: '1px solid #000', minWidth: '120px' }}>3.57 hours</h3>
                                </h3>
                            </div>
                            <div className="FormTitleWithdivider mt-0 mb-0 position-relative">
                                <h3 className="text-nowrap text-end formTitle m-0 d-flex align-items-end gap-2 justify-content-start">Total Lateness:
                                    <h3 className="text-nowrap text-center formTitle m-0 ms-1" style={{ borderBottom: '1px solid #000', minWidth: '120px' }}>3.57 hours</h3>
                                </h3>
                            </div>
                            <div className="FormTitleWithdivider mt-0 mb-0 position-relative">
                                <h3 className="text-nowrap text-end formTitle m-0 d-flex align-items-end gap-2 justify-content-start">Total Left Early:
                                    <h3 className="text-nowrap text-center formTitle m-0 ms-1" style={{ borderBottom: '1px solid #000', minWidth: '120px' }}>3.57 hours</h3>
                                </h3>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TimesheetForm;
