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
interface ScopeTrainerTimesheetReportProps {
    data: any;
}

const ScopeTrainerTimesheetReport: React.FC<ScopeTrainerTimesheetReportProps> = ({ data }) => {
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
            {data.length > 0 ? (
                data.map((data: any, index: number) => (
                    <>
                        <Page size="A4" style={styles.page} orientation="landscape">
                            <View wrap={false}>
                                <div style={styles.section}>
                                    <Text style={styles.header}>SCOPE Trainer - Time Sheet</Text>
                                </div>
                                <View style={styles.table}>
                                    <View style={styles.tableRow}>
                                        <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '60%', gap: '10px', marginBottom: '2px' }}>
                                            <View style={styles.tableColHeader}>
                                                <Text>Name:</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text>{data?.FIRSTNAME}, {data?.LASTNAME}</Text>
                                            </View>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '40%', gap: '10px', marginBottom: '2px' }}>
                                            <View style={styles.tableColHeader}>
                                                <Text>Position:</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text>{data?.SitePos}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '60%', gap: '10px', marginBottom: '2px' }}>
                                            <View style={styles.tableColHeader}>
                                                <Text>Max Hours:</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text>{data?.Max_Hours} a week</Text>
                                            </View>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '40%', gap: '10px', marginBottom: '2px' }}>
                                            <View style={styles.tableColHeader}>
                                                <Text>Budget Code:</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text>{data?.DIST_NUM}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '100%', gap: '10px', marginBottom: '2px' }}>
                                            <View style={styles.tableColHeader}>
                                                <Text>Schedule:</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text>{data?.Schedule}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '100%', gap: '10px', marginBottom: '2px' }}>
                                            <View style={styles.tableColHeader}>
                                                <Text>Comment:</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text>{data?.COMMENTS}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
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
                                    <View style={{ width: '50%', paddingRight: '5px' }}>
                                        <View style={{ width: '100%', textAlign: 'center' }}>
                                            <Text style={{ fontSize: '13px', color: '#000', fontWeight: 'bold' }}>Program Hours</Text>
                                            <Text style={{ fontSize: '10px', color: '#000', fontWeight: 'bold' }}>Maximum Weekly Program Hours.{data?.Max_Hours}</Text>
                                        </View>

                                        <View style={styles.table}>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>Date</Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>In</Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>Out</Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '29.3333334%', gap: '0px', textAlign: 'center', }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '1px 3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>If Applicable</Text>
                                                    </View>
                                                    <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '100%', gap: '0px', textAlign: 'center' }}>
                                                        <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', flex: '0 0 auto', width: '50%', padding: '1px 3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <Text>Lunch In</Text>
                                                        </View>

                                                        <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '1px 3px', flex: '0 0 auto', width: '50%', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <Text>Lunch Out</Text>
                                                        </View>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>#Hours</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>Mon</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>Tue</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>Wed</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>Thu</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>Fri</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>Mon</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>Tue</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>Wed</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>Thu</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>Fri</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>

                                        <View style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'row', flex: '0 0 auto', width: '100%', gap: '10px', marginBottom: '0px', overflow: 'hidden', paddingRight: '0' }}>
                                            <View style={{
                                                fontSize: '9px',
                                                fontWeight: 'bold',
                                                padding: '0px',
                                                color: '#000',
                                                marginRight: '0px'
                                            }}>
                                                <Text>Total:</Text>
                                            </View>
                                            <View style={{ width: '80px' }}>
                                                <Text style={{ width: '80px', borderBottomWidth: '1px', borderStyle: 'solid', borderColor: '#000' }}></Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ width: '50%', paddingLeft: '5px' }}>

                                        <View style={{ width: '100%', textAlign: 'center' }}>
                                            <Text style={{ fontSize: '13px', color: '#000', fontWeight: 'bold' }}>Additional Hours</Text>
                                            <Text style={{ fontSize: '10px', color: '#000', fontWeight: 'bold' }}>(0.50 pre-approved inservices & late pick-up)</Text>
                                        </View>
                                        <View style={styles.table}>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>Date</Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>Start</Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>Stop</Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '29.3333334%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>Explanation/ Location</Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>Code</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>#Hours</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '29.3333334%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '29.3333334%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '29.3333334%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '29.3333334%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '29.3333334%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '29.3333334%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '29.3333334%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '29.3333334%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '29.3333334%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '29.3333334%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14.6666667%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', minHeight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'row', flex: '0 0 auto', width: '100%', gap: '10px', marginBottom: '0px', overflow: 'hidden', paddingRight: '0' }}>
                                            <View style={{
                                                fontSize: '9px',
                                                fontWeight: 'bold',
                                                padding: '0px',
                                                color: '#000',
                                                marginRight: '0px'
                                            }}>
                                                <Text>Total:</Text>
                                            </View>
                                            <View style={{ width: '80px' }}>
                                                <Text style={{ width: '80px', borderBottomWidth: '1px', borderStyle: 'solid', borderColor: '#000' }}></Text>
                                            </View>
                                        </View>

                                    </View>
                                </View>

                                <View style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                    flexDirection: 'row',
                                    marginTop: '10px'
                                }}>
                                    <View style={{
                                        margin: '0',
                                        flexDirection: 'column',
                                        width: '60%',
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        gap: '0px',
                                        marginBottom: '3px',
                                        justifyContent: 'flex-end'
                                        , paddingRight: '5px'
                                    }}>

                                        <View style={styles.table}>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '100%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>For documenting time not at work indicate</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '50%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                                        <Text>Sick (Personal illness or Immediate Family)
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '50%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                                        <Text>Jury Duty</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '50%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                                        <Text>Personal Business</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '50%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                                        <Text>Bereavement (Indicate Relationship)</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '50%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                                        <Text>School Closed (as Indicated on Calender)
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '50%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                                        <Text>Emergency Closing
                                                            (Snow Days, other authorized emergencies)</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>


                                        <View style={{
                                            width: '50%',
                                            borderStyle: 'solid',
                                            borderBottomWidth: 0,
                                            borderColor: '#cdcdcd',
                                            paddingBottom: '0',
                                            paddingTop: '0px',
                                            marginRight: '0',
                                            height: 'auto'
                                        }}>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '100%', gap: '0px' }}>
                                                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'center' }}>
                                                        <Text>Total Hours</Text>
                                                        <Text>For Office Use Only</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{
                                        margin: '0',
                                        flexDirection: 'column',
                                        width: '40%',
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '0px',
                                        marginBottom: '3px',
                                        justifyContent: 'flex-start', paddingLeft: '5px'
                                    }}>

                                        {/* <View style={styles.table}>
                                <View style={styles.tableRow}>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '10%', gap: '0px' }}>
                                        <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text>Code</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '40%', gap: '0px' }}>
                                        <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text>Explanation / Location</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '10%', gap: '0px' }}>
                                        <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text>Code</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '40%', gap: '0px' }}>
                                        <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text>Explanation / Location</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.tableRow}>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '10%', gap: '0px' }}>
                                        <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0', borderLeftWidth: '1px', minHeight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text>1</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '40%', gap: '0px' }}>
                                        <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0', borderLeftWidth: '1px', minHeight: '20px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text>Assigned Role of Acting Director</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '10%', gap: '0px' }}>
                                        <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0', borderLeftWidth: '1px', minHeight: '20px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text>3</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '40%', gap: '0px' }}>
                                        <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0', borderLeftWidth: '1px', minHeight: '20px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text>Group Leader assigned to role of
                                                Small Group Leader</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.tableRow}>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '10%', gap: '0px' }}>
                                        <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0', borderLeftWidth: '1px', minHeight: '27px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text>2</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '40%', gap: '0px' }}>
                                        <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0', borderLeftWidth: '1px', minHeight: '27px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text>Assigned to another program site;
                                                Permanent sub assigned to a program
                                                outside of cluster</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '10%', gap: '0px' }}>
                                        <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0', borderLeftWidth: '1px', minHeight: '27px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text>4</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '40%', gap: '0px' }}>
                                        <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0', borderLeftWidth: '1px', minHeight: '27px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text>Group Leader assigned to role of
                                                Head of Group
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View> */}

                                        <View style={{
                                            margin: '0',
                                            flexDirection: 'column',
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '0px',
                                            marginBottom: '5px',
                                            justifyContent: 'flex-start',
                                            marginTop: '10px'
                                        }}>
                                            <View style={{ width: '100%', marginBottom: '10px', paddingRight: '5px' }}>
                                                <View style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', flexDirection: 'row', flex: '0 0 auto', width: '100%', gap: '10px', marginBottom: '0px', overflow: 'hidden', paddingRight: '0' }}>
                                                    <View style={{
                                                        fontSize: '6px',
                                                        fontWeight: 'bold',
                                                        padding: '0px',
                                                        color: '#000',
                                                        marginRight: '0px'
                                                    }}>
                                                        <Text>Total Absences:</Text>
                                                    </View>
                                                    <View style={{ width: '100px' }}>
                                                        <Text style={{ width: '100px', borderBottomWidth: '1px', borderStyle: 'solid', borderColor: '#000' }}></Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ width: '100%', marginBottom: '10px', paddingRight: '5px' }}>
                                                <View style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', flexDirection: 'row', flex: '0 0 auto', width: '100%', gap: '10px', marginBottom: '0px', overflow: 'hidden', paddingRight: '0' }}>
                                                    <View style={{
                                                        fontSize: '6px',
                                                        fontWeight: 'bold',
                                                        padding: '0px',
                                                        color: '#000',
                                                        marginRight: '0px'
                                                    }}>
                                                        <Text>Total Lateness:</Text>
                                                    </View>
                                                    <View style={{ width: '100px' }}>
                                                        <Text style={{ width: '100px', borderBottomWidth: '1px', borderStyle: 'solid', borderColor: '#000' }}></Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ width: '100%', marginBottom: '10px', paddingRight: '5px' }}>
                                                <View style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', flexDirection: 'row', flex: '0 0 auto', width: '100%', gap: '10px', marginBottom: '0px', overflow: 'hidden', paddingRight: '0' }}>
                                                    <View style={{
                                                        fontSize: '6px',
                                                        fontWeight: 'bold',
                                                        padding: '0px',
                                                        color: '#000',
                                                        marginRight: '0px'
                                                    }}>
                                                        <Text>Total Left Early:</Text>
                                                    </View>
                                                    <View style={{ width: '100px' }}>
                                                        <Text style={{ width: '100px', borderBottomWidth: '1px', borderStyle: 'solid', borderColor: '#000' }}></Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>


                                        <View style={{
                                            margin: '0',
                                            flexDirection: 'column',
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '0px',
                                            marginBottom: '0px',
                                            justifyContent: 'flex-start'
                                        }}>

                                            <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '100%', gap: '10px', marginBottom: '15px' }}>
                                                <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', width: '250px' }}>
                                                    <Text>I certify that the above account is true and correct and that the services performed were
                                                        rendered to SCOPE on the dates and hours stated.
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{
                                                margin: '0',
                                                flexDirection: 'row',
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: '0px',
                                                marginBottom: '10px',
                                                justifyContent: 'flex-start'
                                            }}>
                                                <View style={{ width: '70%', paddingRight: '5px' }}>
                                                    <View style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', flexDirection: 'row', flex: '0 0 auto', width: '100%', gap: '10px', marginBottom: '0px', overflow: 'hidden', paddingRight: '0' }}>
                                                        <View style={{
                                                            fontSize: '6px',
                                                            fontWeight: 'bold',
                                                            padding: '0px',
                                                            color: '#000',
                                                            marginRight: '0px'
                                                        }}>
                                                            <Text>Employee Signature:</Text>
                                                        </View>
                                                        <View style={{ width: '150px' }}>
                                                            <Text style={{ width: '150px', borderBottomWidth: '1px', borderStyle: 'solid', borderColor: '#000' }}></Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={{ width: '30%', paddingRight: '5px' }}>
                                                    <View style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', flexDirection: 'row', flex: '0 0 auto', width: '100%', gap: '10px', marginBottom: '0px', overflow: 'hidden', paddingRight: '0' }}>
                                                        <View style={{
                                                            fontSize: '6px',
                                                            fontWeight: 'bold',
                                                            padding: '0px',
                                                            color: '#000',
                                                            marginRight: '0px'
                                                        }}>
                                                            <Text>Date:</Text>
                                                        </View>
                                                        <View style={{ width: '120px' }}>
                                                            <Text style={{ width: '120px', borderBottomWidth: '1px', borderStyle: 'solid', borderColor: '#000' }}></Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{
                                                margin: '0',
                                                flexDirection: 'row',
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: '0px',
                                                marginBottom: '0px',
                                                justifyContent: 'flex-start'
                                            }}>
                                                <View style={{ width: '70%', paddingRight: '5px' }}>
                                                    <View style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', flexDirection: 'row', flex: '0 0 auto', width: '100%', gap: '10px', marginBottom: '0px', overflow: 'hidden', paddingRight: '0' }}>
                                                        <View style={{
                                                            fontSize: '6px',
                                                            fontWeight: 'bold',
                                                            padding: '0px',
                                                            color: '#000',
                                                            marginRight: '0px'
                                                        }}>
                                                            <Text>Verfication Signature:</Text>
                                                        </View>
                                                        <View style={{ width: '150px' }}>
                                                            <Text style={{ width: '150px', borderBottomWidth: '1px', borderStyle: 'solid', borderColor: '#000' }}></Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={{ width: '30%', paddingRight: '5px' }}>
                                                    <View style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', flexDirection: 'row', flex: '0 0 auto', width: '100%', gap: '10px', marginBottom: '0px', overflow: 'hidden', paddingRight: '0' }}>
                                                        <View style={{
                                                            fontSize: '6px',
                                                            fontWeight: 'bold',
                                                            padding: '0px',
                                                            color: '#000',
                                                            marginRight: '0px'
                                                        }}>
                                                            <Text>Date:</Text>
                                                        </View>
                                                        <View style={{ width: '120px' }}>
                                                            <Text style={{ width: '120px', borderBottomWidth: '1px', borderStyle: 'solid', borderColor: '#000' }}></Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View >
                            <Text style={styles.dateText} fixed>{todayDate}</Text>
                            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                                `Page ${pageNumber} of ${totalPages}`
                            )} fixed />

                        </Page>
                    </>
                ))
            ) : (
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text>No data available</Text>
                    </View>
                </Page>
            )}
        </Document>
    )
}
export default ScopeTrainerTimesheetReport