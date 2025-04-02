import React, { memo, useEffect } from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFDownloadLink,
    pdf,
} from '@react-pdf/renderer';
import moment from 'moment';
import styles from './style/StyleForReport';
interface SiteInfoPdfProps {
    data: any;
   // setReportData: (data: any) => void;
}

const SiteInfoReport: React.FC<SiteInfoPdfProps> = ({ data }) => {
    const todayDate = moment().format('DD-MM-YYYY');
    useEffect(() => {
        if (data) {
            console.log('data for pdf', data);
            // downloadPDF(data)
            // setReportData(null)
        }
    }, [data]);

    if (!data) {
        return null; // Return early if data is null or undefined
    }
    
    return (
        <Document>
                <Page size="A4" style={styles.page}>
                    {/* Header Section */}
                    <div style={styles.section}>
                        <Text style={styles.header}>Site Information</Text>
                    </div>

                    {/* Site Info Table */}
                    <View style={styles.table}>
                        {/* District and Program Info */}
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '60%', gap: '10px', marginBottom: '8px' }}>
                                <View style={styles.tableColHeader}>
                                    <Text>District:</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text>{`${data[0]?.DIST_NUM} ${data[0]?.DIST_NAM}`}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '40%', gap: '10px', marginBottom: '8px' }}>
                                <View style={styles.tableColHeader}>
                                    <Text>Program:</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text>{`${data[0]?.SITE_NUM} ${data[0]?.SITE_NAM}`}</Text>
                                </View>
                            </View>
                        </View>

                        {/* More Rows as Needed */}
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '60%', gap: '10px', marginBottom: '8px' }}>
                                <View style={styles.tableColHeader}>
                                    <Text>Hours:</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text>{`${data[0]?.START_TIME} - ${data[0]?.STOP_TIME}`}</Text>
                                </View>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '40%', gap: '10px', marginBottom: '8px' }}>
                                <View style={styles.tableColHeader}>
                                    <Text>Permit#:</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text>{data[0]?.PERMIT}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '60%', gap: '10px', marginBottom: '8px' }}>
                                <View style={styles.tableColHeader}>
                                    <Text>Start:</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text>{data[0]?.START_DATE ? moment(data[0]?.START_DATE).format('YYYY-MM-DD') : ''}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '40%', gap: '10px', marginBottom: '8px' }}>
                                <View style={styles.tableColHeader}>
                                    <Text>District Liaison#:</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text>{data[0]?.LIAISON}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '60%', gap: '10px', marginBottom: '8px', overflow: 'hidden' }}>
                                <View style={styles.tableColHeader}>
                                    <Text>Scope Email:</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text>{data[0]?.ScopeEmail}</Text>
                                    <Text style={{ textTransform: 'uppercase' }}>{data[0]?.ADDR1}
                                    </Text>
                                    <Text style={{ textTransform: 'uppercase' }}>{data[0]?.ADDR2}
                                    </Text>
                                    <Text style={{ textTransform: 'uppercase' }}>{data[0]?.ADDR3}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '40%', gap: '10px', marginBottom: '8px' }}>
                                <View style={styles.tableColHeader}>
                                    <Text style={{ marginBottom: '8px' }}>Principal Name:</Text>
                                    <Text>Principal Email:</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={{ marginBottom: '8px' }}>{data[0]?.PRINCIPAL}
                                    </Text>
                                    <Text>{data[0]?.PRINCIPAL}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '60%', gap: '10px', marginBottom: '0px', overflow: 'hidden' }}>
                                <View style={styles.tableColHeader}>
                                    <Text>School Phone:</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text>{data[0]?.SCHFONE}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '40%', gap: '10px', marginBottom: '0px' }}>
                                <View style={styles.tableColHeader}>
                                    <Text>School Fax:</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text>{data[0]?.SFAX}</Text>
                                </View>
                            </View>
                        </View>
                        {/* Continue Mapping Rows for Each Data Element as Needed */}
                    </View>

                    <View style={styles.table}>
                        {/* District and Program Info */}
                        <View style={{
                            margin: 'auto',
                            flexDirection: 'row',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0px',
                            marginBottom: '0px',
                            justifyContent: 'flex-start'
                        }}>
                            <View style={{ width: '33.33%', gap: '10px', marginBottom: '0px', paddingRight: '12px' }}>
                                <Text style={{ fontSize: '13px', fontWeight: 'bold', color: '#000' }}>Emergency Department</Text>
                                <Text style={{ fontSize: '10px', fontWeight: 'thin', color: '#3a3a3a' }}>
                                    {data[0]?.EADR1}  {data[0]?.EADR2}  {data[0]?.EADR3}  {data[0]?.PHONE}</Text>
                            </View>
                            <View style={{ width: '33.33%', gap: '10px', marginBottom: '0px', paddingRight: '12px' }}>
                                <Text style={{ fontSize: '13px', fontWeight: 'bold', color: '#000' }}>Fire Department</Text>
                                <Text style={{ fontSize: '10px', fontWeight: 'thin', color: '#3a3a3a' }}>
                                    {data[0]?.FADR1} {data[0]?.FADR2} {data[0]?.FADR3} {data[0]?.FPHONE}</Text>
                            </View>
                            <View style={{ width: '33.33%', gap: '10px', marginBottom: '0px' }}>
                                <Text style={{ fontSize: '13px', fontWeight: 'bold', color: '#000' }}>Police Department</Text>
                                <Text style={{ fontSize: '10px', fontWeight: 'thin', color: '#3a3a3a  ' }}>
                                    {data[0]?.PADR1} {data[0]?.PADR2} {data[0]?.PADR3} {data[0]?.PPHONE}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.table}>
                        {/* District and Program Info */}
                        <View style={{
                            margin: 'auto',
                            flexDirection: 'row',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'flex-end',
                            gap: '0px',
                            marginBottom: '0px',
                            justifyContent: 'flex-start'
                        }}>
                            <View style={{
                                width: '40%', gap: '10px', marginBottom: '0', paddingRight: '12px', display: 'flex', flexDirection: 'row',
                                alignItems: 'flex-end'
                            }}>
                                <Text style={{ fontSize: '11px', fontWeight: 'thin', color: '#000' }}>Scope Cell Phone:</Text>
                                <Text style={{ fontSize: '11px', fontWeight: 'thin', color: '#000' }}>{data[0]?.PHONE}</Text>
                            </View>
                            <View style={{
                                width: '60%', gap: '10px', marginBottom: '0', paddingRight: '12px', display: 'flex', flexDirection: 'row',
                                alignItems: 'flex-end',
                            }}>
                                <View style={{
                                    width: '20%', gap: '10px', marginBottom: '0', paddingRight: '12px', display: 'flex', flexDirection: 'row',
                                    alignItems: 'flex-end'
                                }}>
                                    <Text style={{ fontSize: '11px', fontWeight: 'thin', color: '#000' }}>Fees:</Text>
                                    <Text style={{ fontSize: '11px', fontWeight: 'thin', color: '#000' }}></Text>
                                </View>
                                <View style={{ width: '20%', gap: '10px', marginBottom: '0', paddingRight: '12px' }}>
                                    <Text style={{ fontSize: '11px', fontWeight: 'thin', color: '#000', textAlign: 'center' }}>Full</Text>
                                    <Text style={{ fontSize: '11px', fontWeight: 'bold', color: '#000', textAlign: 'center' }}> {data[0]?.FULL}
                                    </Text>
                                </View>
                                <View style={{ width: '20%', gap: '10px', marginBottom: '0', paddingRight: '12px' }}>
                                    <Text style={{ fontSize: '11px', fontWeight: 'thin', color: '#000', textAlign: 'center' }}>Min</Text>
                                    <Text style={{ fontSize: '11px', fontWeight: 'bold', color: '#000', textAlign: 'center' }}> {data[0]?.MIN}</Text>
                                </View>
                                <View style={{ width: '20%', gap: '10px', marginBottom: '0', paddingRight: '12px' }}>
                                    <Text style={{ fontSize: '11px', fontWeight: 'thin', color: '#000', textAlign: 'center' }}>Daily</Text>
                                    <Text style={{ fontSize: '11px', fontWeight: 'bold', color: '#000', textAlign: 'center' }}>{data[0]?.DAILY}</Text>
                                </View>
                                <View style={{ width: '20%', gap: '10px', marginBottom: '0', paddingRight: '12px' }}>
                                    <Text style={{ fontSize: '11px', fontWeight: 'thin', color: '#000', textAlign: 'center' }}>AM/PM</Text>
                                    <Text style={{ fontSize: '11px', fontWeight: 'bold', color: '#000', textAlign: 'center' }}> {data[0]?.AMPM}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.table}>
                        <View style={{
                            margin: 'auto',
                            flexDirection: 'row',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0px',
                            marginBottom: '0px',
                            justifyContent: 'flex-start'
                        }}>
                            <View style={{ width: '23%', flex: '0 0 23%', gap: '10px', marginBottom: '0px', paddingRight: '6px' }}>
                                <Text style={{ fontSize: '13px', fontWeight: 'bold', color: '#000' }}>Approved Spaces</Text>
                                <Text style={{ fontSize: '11px', fontWeight: 'thin', color: '#3a3a3a', }}>{data[0]?.ROOM_NO}</Text>
                                <Text style={{ fontSize: '11px', fontWeight: 'thin', color: '#3a3a3a', }}>{data[0]?.ROOM_NO2}</Text>
                                <Text style={{ fontSize: '11px', fontWeight: 'thin', color: '#3a3a3a', }}>{data[0]?.ROOM_NO3}</Text>
                                <Text style={{ fontSize: '11px', fontWeight: 'thin', color: '#3a3a3a', }}>{data[0]?.ROOM_NO4}</Text>
                            </View>
                            <View style={{ width: '23%', flex: '0 0 23%', gap: '10px', marginBottom: '0px', paddingRight: '6px', paddingLeft: '6px' }}>
                                <Text style={{ fontSize: '13px', fontWeight: 'bold', color: '#000' }}>Space Capacity</Text>
                                <Text style={{ fontSize: '11px', fontWeight: 'thin', color: '#3a3a3a' }}>{data[0]?.CAP1}</Text>
                                <Text style={{ fontSize: '11px', fontWeight: 'thin', color: '#3a3a3a' }}>{data[0]?.CAP2}</Text>
                                <Text style={{ fontSize: '11px', fontWeight: 'thin', color: '#3a3a3a' }}>{data[0]?.CAP3}</Text>
                                <Text style={{ fontSize: '11px', fontWeight: 'thin', color: '#3a3a3a' }}>{data[0]?.CAP4}</Text>
                            </View>
                            <View style={{ width: '33%', flex: '0 0 33%', gap: '10px', marginBottom: '0px', paddingRight: '6px', paddingLeft: '6px' }}>
                                <Text style={{ fontSize: '13px', fontWeight: 'bold', color: '#000' }}>Additional Approved Spaces</Text>
                                <Text style={{ fontSize: '11px', fontWeight: 'thin', color: '#3a3a3a  ' }}>{data[0]?.ADDLOC}</Text>
                                <Text style={{ fontSize: '11px', fontWeight: 'thin', color: '#3a3a3a  ' }}>{data[0]?.ADDLOC2}</Text>
                                <Text style={{ fontSize: '11px', fontWeight: 'thin', color: '#3a3a3a  ' }}>{data[0]?.ADDLOC3}</Text>
                                <Text style={{ fontSize: '11px', fontWeight: 'thin', color: '#3a3a3a  ' }}>{data[0]?.ADDLOC4}</Text>
                            </View>
                            <View style={{ width: '23%', flex: '0 0 23%', gap: '10px', marginBottom: '0px', paddingLeft: '6px', textAlign: 'right' }}>
                                <Text style={{ fontSize: '13px', fontWeight: 'bold', color: '#000', textAlign: 'left' }}>Space Capacity</Text>
                                <Text style={{ fontSize: '11px', fontWeight: 'thin', color: '#3a3a3a', textAlign: 'left' }}>{data[0]?.ASCAP1}
                                </Text>
                                <Text style={{ fontSize: '11px', fontWeight: 'thin', color: '#3a3a3a', textAlign: 'left' }}>{data[0]?.ASCAP2}
                                </Text>
                                <Text style={{ fontSize: '11px', fontWeight: 'thin', color: '#3a3a3a', textAlign: 'left' }}>{data[0]?.ASCAP3}
                                </Text>
                                <Text style={{ fontSize: '11px', fontWeight: 'thin', color: '#3a3a3a', textAlign: 'left' }}>{data[0]?.ASCAP4}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Site Info Table */}
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '50%', gap: '10px', marginBottom: '8px' }}>
                                <View style={styles.tableColHeaderLic}>
                                    <Text>License Capacity:</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text>{data[0]?.CAPACTIY}</Text>
                                </View>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '50%', gap: '10px', marginBottom: '8px' }}>
                                <View style={styles.tableColHeaderLic}>
                                    <Text>Phone Type:</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text>{data[0]?.PHONE_TYPE}</Text>
                                </View>
                            </View>
                        </View>
                        {/* More Rows as Needed */}
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '50%', gap: '10px', marginBottom: '8px' }}>
                                <View style={styles.tableColHeaderLic}>
                                    <Text>Grade:</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text>{data[0]?.GRADE_LVLS}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '50%', gap: '10px', marginBottom: '8px' }}>
                                <View style={styles.tableColHeaderLic}>
                                    <Text>Scope Available:</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text>{data[0]?.TIME_AVAIL}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '50%', gap: '10px', marginBottom: '8px' }}>
                                <View style={styles.tableColHeaderLic}>
                                    <Text>OCFS Phone:</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text>{data[0]?.DSS_FON}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '50%', gap: '10px', marginBottom: '8px' }}>
                                <View style={styles.tableColHeaderLic}>
                                    <Text>OCFS Rep:</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text>{data[0]?.DSS_REP}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '50%', gap: '10px', marginBottom: '8px', overflow: 'hidden' }}>
                                <View style={styles.tableColHeaderLic}>
                                    <Text>Transport Phone:</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text>{data[0]?.TPPHONE}</Text>
                                </View>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '50%', gap: '10px', marginBottom: '8px' }}>
                                <View style={styles.tableColHeaderLic}>
                                    <Text style={{ marginBottom: '8px' }}>Transport:</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={{ marginBottom: '8px' }}>{data[0]?.TRANSPORT}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '50%', gap: '10px', marginBottom: '8px', overflow: 'hidden' }}>
                                <View style={styles.tableColHeaderLic}>
                                    <Text>District Manager:</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text>{data[0]?.FieldSupervisorName}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '50%', gap: '10px', marginBottom: '8px' }}>
                                <View style={styles.tableColHeaderLic}>
                                    <Text>Registar:</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text>{data[0]?.RegistarName}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '50%', gap: '10px', marginBottom: '8px', overflow: 'hidden' }}>
                                <View style={styles.tableColHeaderLic}>
                                    <Text>Scope Field Trainer:</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text>{data[0]?.FieldTrainerName}</Text>
                                </View>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '50%', gap: '10px', marginBottom: '8px' }}>
                                <View style={styles.tableColHeaderLic}>
                                    <Text>Account Billing:</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text>{data[0]?.AccountBillingName}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '50%', gap: '10px', marginBottom: '0px', overflow: 'hidden' }}>
                                <View style={styles.tableColHeaderLic}>
                                    <Text>HCC:</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text>{data[0]?.HealthCareConsultantName}</Text>
                                </View>
                            </View>
                        </View>
                        {/* Continue Mapping Rows for Each Data Element as Needed */}
                    </View>


                    {/* Site Info Table */}
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '100%', gap: '10px', marginBottom: '8px' }}>
                                <View style={styles.tableColHeaderLic}>
                                    <Text>Notes:</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    {(data && data.length > 0) && (
                                        data.map((x: any, index: number) => (
                                            x.NOTES &&
                                            <Text key={index}>
                                                {x.NOTES ? x.NOTES : ''}
                                            </Text>
                                        ))
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Staff List */}
                    <View style={styles.section} wrap={false}>
                        <Text style={styles.staffList}>Staff List</Text>
                        {(data && data.length) && data.map((x: any, index: number) => (
                            <View key={index} style={styles.tableStaff} wrap={false}>
                                <View style={{
                                    margin: 'auto',
                                    flexDirection: 'row',
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '0px',
                                    justifyContent: 'flex-start',
                                    borderStyle: 'solid',
                                    borderTopWidth: 0,
                                    borderBottomWidth: 1,
                                    borderColor: '#000',
                                }}>
                                    <View style={{
                                        fontSize: '11px',
                                        borderLeftWidth: 1,
                                        fontWeight: 'normal',
                                        verticalAlign: 'super',
                                        padding: '5px',
                                        borderStyle: 'solid',
                                        height: '100%',
                                        borderColor: '#000',
                                        width: '25%',
                                        flex: '0 0 auto',
                                        display: 'flex',
                                        alignItems: 'flex-start'
                                    }}>
                                        <Text>{`${x.FIRSTNAME} ${x.LASTNAME}`}</Text>
                                        <Text>{x.SitePos}</Text>
                                        <Text>{x.STREET}</Text>
                                        <Text>{`${x.CITY}, ${x.STATE}, ${x.ZIPCODE}`}</Text>
                                    </View>
                                    <View style={{
                                        fontSize: '11px',
                                        borderLeftWidth: 1,
                                        fontWeight: 'normal',
                                        verticalAlign: 'super',
                                        padding: '5px',
                                        borderStyle: 'solid',
                                        height: '100%',
                                        borderColor: '#000',
                                        width: '25%',
                                        flex: '0 0 auto',
                                        display: 'flex',
                                        alignItems: 'flex-start'
                                    }}>
                                        <View style={styles.staffHeadCol}>
                                            <Text style={{ fontWeight: 900, color: '#000', fontSize: '10px' }}>Home:</Text>
                                            <Text style={{ fontWeight: 700, color: '#3a3a3a', fontSize: '10px' }}>{x.HOMEPHONE}</Text>
                                        </View>
                                        <View style={styles.staffHeadCol}>
                                            <Text style={{ fontWeight: 900, color: '#000', fontSize: '10px' }}>Work:</Text>
                                            <Text style={{ fontWeight: 700, color: '#3a3a3a', fontSize: '10px' }}>{x.WORKPHONE}</Text>
                                        </View>
                                        <View style={styles.staffHeadCol}>
                                            <Text style={{ fontWeight: 900, color: '#000', fontSize: '10px' }}>Other:</Text>
                                            <Text style={{ fontWeight: 700, color: '#3a3a3a', fontSize: '10px' }}>{x.OTHERPHONE}</Text>
                                        </View>
                                        <View style={styles.staffHeadCol}>
                                            <Text style={{ fontWeight: 900, color: '#000', fontSize: '10px' }}>NYSID#:</Text>
                                            <Text style={{ fontWeight: 700, color: '#3a3a3a', fontSize: '10px' }}>{x.NYSID}</Text>
                                        </View>
                                        <View style={styles.staffHeadCol}>
                                            <Text style={{ fontWeight: 900, color: '#000', fontSize: '10px' }}>A. W. Children:</Text>
                                            <Text style={{ fontWeight: 700, color: '#3a3a3a', fontSize: '10px' }}>{x.AloneWithChildren ? 'YES' : 'NO'}</Text>
                                        </View>
                                    </View>
                                    <View style={{
                                        fontSize: '11px',
                                        borderLeftWidth: 1,
                                        fontWeight: 'normal',
                                        verticalAlign: 'super',
                                        padding: '5px',
                                        borderStyle: 'solid',
                                        height: '100%',
                                        borderColor: '#000',
                                        width: '25%',
                                        flex: '0 0 auto',
                                        display: 'flex',
                                        alignItems: 'flex-start'
                                    }}>

                                        <View style={styles.staffHeadCol}>
                                            <Text style={{ fontWeight: 900, color: '#000', fontSize: '10px' }}>Fingerprint:</Text>
                                            <Text style={{ fontWeight: 700, color: '#3a3a3a', fontSize: '10px' }}>{x.STATE_FPR ? moment(x.STATE_FPR).format('YYYY-MM-DD') : ''}</Text>
                                        </View>
                                        <View style={styles.staffHeadCol}>
                                            <Text style={{ fontWeight: 900, color: '#000', fontSize: '10px' }}>Medical:</Text>
                                            <Text style={{ fontWeight: 700, color: '#3a3a3a', fontSize: '10px' }}>{x.MEDICALEXP ? moment(x.MEDICALEXP).format('YYYY-MM-DD') : ''}</Text>
                                        </View>
                                        <View style={styles.staffHeadCol}>
                                            <Text style={{ fontWeight: 900, color: '#000', fontSize: '10px' }}>Foundations:</Text>
                                            <Text style={{ fontWeight: 700, color: '#3a3a3a', fontSize: '10px' }}>{x.Foundations ? moment(x.Foundations).format('YYYY-MM-DD') : ''}</Text>
                                        </View>
                                        <View style={styles.staffHeadCol}>
                                            <Text style={{ fontWeight: 900, color: '#000', fontSize: '10px' }}>CPR Expires:</Text>
                                            <Text style={{ fontWeight: 700, color: '#3a3a3a', fontSize: '10px' }}>{x.CPR ? moment(x.CPR).format('YYYY-MM-DD') : ''}</Text>
                                        </View>
                                        <View style={styles.staffHeadCol}>
                                            <Text style={{ fontWeight: 900, color: '#000', fontSize: '10px' }}>F. A. Expires:</Text>
                                            <Text style={{ fontWeight: 700, color: '#3a3a3a', fontSize: '10px' }}>{x.FIRSTAID ? moment(x.FIRSTAID).format('YYYY-MM-DD') : ''}</Text>
                                        </View>
                                    </View>
                                    <View style={{
                                        fontSize: '11px',
                                        borderLeftWidth: 1,
                                        fontWeight: 'normal',
                                        verticalAlign: 'super',
                                        padding: '5px',
                                        borderStyle: 'solid',
                                        height: '100%',
                                        borderColor: '#000',
                                        width: '25%',
                                        borderRightWidth: 1,
                                        flex: '0 0 auto',
                                        display: 'flex',
                                        alignItems: 'flex-start'
                                    }}>
                                        <View style={styles.staffHeadCol}>
                                            <Text style={{ fontWeight: 900, color: '#000', fontSize: '10px' }}>Mat Expires:</Text>
                                            <Text style={{ fontWeight: 700, color: '#3a3a3a', fontSize: '10px' }}>{x.MATDATE ? moment(x.MATDATE).format('YYYY-MM-DD') : ''}</Text>
                                        </View>
                                        <View style={styles.staffHeadCol}>
                                            <Text style={{ fontWeight: 900, color: '#000', fontSize: '10px' }}>ACES:</Text>
                                            <Text style={{ fontWeight: 700, color: '#3a3a3a', fontSize: '10px' }}>{x.ACES ? moment(x.ACES).format('YYYY-MM-DD') : ''}</Text>
                                        </View>
                                        <View style={styles.staffHeadCol}>
                                            <Text style={{ fontWeight: 900, color: '#000', fontSize: '10px' }}>E. Law:</Text>
                                            <Text style={{ fontWeight: 700, color: '#3a3a3a', fontSize: '10px' }}>{x.ELaw ? moment(x.ELaw).format('YYYY-MM-DD') : ''}</Text>
                                        </View>
                                    </View>

                                </View>
                            </View>

                        ))}
                    </View>
                    <Text style={styles.dateText} fixed>{todayDate}</Text>
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `Page ${pageNumber} of ${totalPages}`
                )} fixed />
                </Page>
            </Document>
    );
};

export default memo(SiteInfoReport);
