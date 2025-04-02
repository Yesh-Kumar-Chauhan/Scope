import React, { useEffect } from 'react'
import {
    Document,
    Page,
    Text,
    View,
    PDFDownloadLink,
    pdf,
} from '@react-pdf/renderer';
import moment from 'moment';
import styles from './style/StyleForReport';
interface StaffAttendanceReportProps {
    data: any;
}

const StaffAttendanceReport: React.FC<StaffAttendanceReportProps> = ({ data }) => {
    const todayDate = moment().format('DD-MM-YYYY');
    useEffect(() => {
        if (data) {
            console.log('data for pdf', data);
        }
    }, [data]);

    if (!data) {
        return null;
    }

    return (
        <Document>
            <Page size="A4" style={styles.page} orientation="landscape">
                <View>
                    <div style={styles.section}>
                        <Text style={styles.header}>Staff Attendance</Text>
                    </div>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '8%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text>Date</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '16%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text>Name</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '16%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text>District</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '16%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text>Site name</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text>Absent</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text>Reason</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '17%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text>Notes</Text>
                                </View>
                            </View>
                        </View>
                        {data.length > 0 ? (
                            data.map((data: any, index: number) => (
                                <View style={styles.tableRow}>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '8%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text>{data?.DATE ? moment(data?.DATE).format('YYYY-MM-DD') : ''}</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '16%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text>{data?.FIRSTNAME}, {data?.LASTNAME}</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '16%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text>{data?.DIST_NAM}</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '16%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text>{data?.SITENAM}</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text>{data?.Absent}</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text>{data?.Reason}</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '17%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text>{data?.Notes}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <Page size="A4" style={styles.page}>
                                <View style={styles.section}>
                                    <Text>No data available</Text>
                                </View>
                            </Page>
                        )}
                    </View>
                </View>
                <Text style={styles.dateText} fixed>{todayDate}</Text>
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `Page ${pageNumber} of ${totalPages}`
                )} fixed />
            </Page>
        </Document>
    )
}
export default StaffAttendanceReport