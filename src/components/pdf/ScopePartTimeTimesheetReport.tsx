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

interface ScopePartTimeTimesheetReportProps {
    data: any;
}

const ScopePartTimeTimesheetReport: React.FC<ScopePartTimeTimesheetReportProps> = ({ data }) => {
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
                        <Text style={styles.header}>SCOPE Part Time - Time Sheet</Text>
                    </div>

                    {data.length > 0 ? (
                        data.map((data: any, index: number) => (
                            <>
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
                                                <Text>District:</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text>{data?.DIST_NAM}</Text>
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
                                        <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '60%', gap: '10px', marginBottom: '2px' }}>
                                            <View style={styles.tableColHeader}>
                                                <Text>Building:</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <View style={{ width: '50%', height: '1px', backgroundColor: '#000' }}></View>
                                            </View>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '40%', gap: '10px', marginBottom: '2px' }}>
                                            <View style={styles.tableColHeader}>
                                                <Text>Program:</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text>{data?.SITE_NAM}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.tableRow}>

                                        <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '60%', gap: '10px', marginBottom: '2px' }}>
                                            <View style={styles.tableColHeader}>
                                                <Text>Schedule:</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text>{data?.Schedule}</Text>
                                            </View>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '40%', gap: '10px', marginBottom: '2px' }}>
                                            <View style={styles.tableColHeader}>
                                                <Text>Multi-Site Directors:</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text>{data?.Directors}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '100%', gap: '10px', marginBottom: '2px' }}>
                                            <View style={styles.tableCol}>
                                                <Text><Text style={{ color: '#000' }}>IMPORTANT NOTE:</Text> You may be assigned additional hours or a location change which you must accommodate in order to meet legally required staff to student ratio .
                                                </Text>
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
                                            <Text style={{ fontSize: '10px', color: '#000', fontWeight: 'bold' }}>Maximum Weekly Program Hours. {data?.Max_Hours}</Text>
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

                                        <View style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'row', flex: '0 0 auto', width: '100%', gap: '10px', marginBottom: '0px', overflow: 'hidden', paddingRight: '30px' }}>
                                            <View style={{
                                                fontSize: '9px',
                                                fontWeight: 'bold',
                                                padding: '0px',
                                                color: '#000',
                                                marginRight: '0px'
                                            }}>
                                                <Text>Program Hours:</Text>
                                            </View>
                                            <View style={{ width: '80px' }}>
                                                <Text style={{ width: '80px', borderBottomWidth: '1px', borderStyle: 'solid', borderColor: '#000' }}></Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ width: '50%', paddingLeft: '5px' }}>

                                        <View style={{ width: '100%', textAlign: 'center' }}>
                                            <Text style={{ fontSize: '13px', color: '#000', fontWeight: 'bold' }}>Additional Hours / Extra Pay</Text>
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
                                    </View>
                                </View>

                                <View style={{
                                    margin: '0',
                                    flexDirection: 'row',
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0px',
                                    marginTop: '10px',
                                    marginBottom: '5px',
                                    justifyContent: 'center'
                                }}>
                                    <View style={{ width: '27%', paddingRight: '5px' }}>
                                        <View style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', flexDirection: 'row', flex: '0 0 auto', width: '100%', gap: '10px', marginBottom: '0px', overflow: 'hidden', paddingRight: '0' }}>
                                            <View style={{
                                                fontSize: '8px',
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
                                    <View style={{ width: '27%', paddingRight: '5px' }}>
                                        <View style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', flexDirection: 'row', flex: '0 0 auto', width: '100%', gap: '10px', marginBottom: '0px', overflow: 'hidden', paddingRight: '0' }}>
                                            <View style={{
                                                fontSize: '8px',
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
                                    <View style={{ width: '27%', paddingRight: '5px' }}>
                                        <View style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', flexDirection: 'row', flex: '0 0 auto', width: '100%', gap: '10px', marginBottom: '0px', overflow: 'hidden', paddingRight: '0' }}>
                                            <View style={{
                                                fontSize: '8px',
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


                                <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '100%', gap: '10px', marginTop: '12px' }}>
                                    <View style={{ fontSize: '8px', fontWeight: 'bold', color: '#000', width: '100%' }}>
                                        <Text>I certify that the above account is true and correct and that the services performed were
                                            rendered to SCOPE on the dates and hours stated.
                                        </Text>
                                    </View>
                                </View>

                                <View style={{
                                    width: '100%',
                                    borderStyle: 'solid',
                                    borderBottomWidth: 0,
                                    borderColor: '#cdcdcd',
                                    paddingBottom: '12px',
                                    paddingTop: '12px',
                                }}>
                                    <View style={{
                                        margin: 'auto',
                                        flexDirection: 'row',
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '0px',
                                        marginBottom: '0px',
                                        justifyContent: 'flex-start'
                                    }} wrap={false}>
                                        <View
                                            wrap={false}
                                            style={{
                                                display: 'flex', alignItems: 'flex-start', flexDirection: 'column', flex: '0 0 auto', width: '55%', gap: '10px', marginBottom: '0px', overflow: 'hidden',
                                                marginTop: '10px', paddingRight: '10px', justifyContent: 'flex-start'
                                            }}>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'row', flex: '0 0 auto', width: '60%', gap: '10px', marginBottom: '5px', overflow: 'hidden', paddingRight: '5px' }}>
                                                    <View style={{
                                                        fontSize: '9px',
                                                        fontWeight: 'bold',
                                                        padding: '0px',
                                                        color: '#000',
                                                        marginRight: '15px'
                                                    }}>
                                                        <Text>Employee Signature:</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={{ width: '95px', borderBottomWidth: '1px', borderStyle: 'solid', borderColor: '#000' }}></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'row', flex: '0 0 auto', width: '40%', gap: '10px', marginBottom: '5px', overflow: 'hidden', paddingLeft: '5px', paddingRight: '5px' }}>
                                                    <View style={{
                                                        fontSize: '9px',
                                                        fontWeight: 'bold',
                                                        padding: '0px',
                                                        color: '#000',
                                                        marginRight: '0px'
                                                    }}>
                                                        <Text>Date:</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={{ width: '150px', borderBottomWidth: '1px', borderStyle: 'solid', borderColor: '#000' }}></Text>
                                                    </View>
                                                </View>
                                            </View>

                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'row', flex: '0 0 auto', width: '60%', gap: '10px', marginBottom: '5px', overflow: 'hidden', paddingRight: '5px' }}>
                                                    <View style={{
                                                        fontSize: '9px',
                                                        fontWeight: 'bold',
                                                        padding: '0px',
                                                        color: '#000',
                                                        marginRight: '15px'
                                                    }}>
                                                        <Text>Employee Signature:</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={{ width: '95px', borderBottomWidth: '1px', borderStyle: 'solid', borderColor: '#000' }}></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'row', flex: '0 0 auto', width: '40%', gap: '10px', marginBottom: '5px', overflow: 'hidden', paddingLeft: '5px', paddingRight: '5px' }}>
                                                    <View style={{
                                                        fontSize: '9px',
                                                        fontWeight: 'bold',
                                                        padding: '0px',
                                                        color: '#000',
                                                        marginRight: '0px'
                                                    }}>
                                                        <Text>Date:</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={{ width: '150px', borderBottomWidth: '1px', borderStyle: 'solid', borderColor: '#000' }}></Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>

                                        <View
                                            wrap={false}
                                            style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column', flex: '0 0 auto', width: '45%', gap: '10px', marginBottom: '10px', overflow: 'hidden', paddingLeft: '10px' }}>
                                            <View style={styles.tableRow} wrap={false}>
                                                <View style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', flex: '0 0 auto', width: '40%', gap: '10px', marginBottom: '7px', overflow: 'hidden', paddingRight: '5px' }}>
                                                    <View style={{
                                                        fontSize: '9px',
                                                        fontWeight: 'bold',
                                                        padding: '0px',
                                                        color: '#000',
                                                        marginRight: '15px'
                                                    }}>
                                                        <Text>SCOPE Office:</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={{ width: '85px', height: '45px', borderWidth: '1px', borderStyle: 'solid', borderColor: '#000' }}></Text>
                                                    </View>
                                                </View>
                                                <View wrap={false} style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column', flex: '0 0 auto', width: '60%', gap: '10px', marginBottom: '0px', paddingLeft: '5px', paddingRight: '5px', textAlign: 'right' }}>

                                                    <View style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', flexDirection: 'row', flex: '0 0 auto', width: '100%', gap: '10px', marginBottom: '2px', overflow: 'hidden', textAlign: 'right' }}>
                                                        <View style={{
                                                            fontSize: '9px',
                                                            fontWeight: 'bold',
                                                            padding: '0px',
                                                            color: '#000',
                                                            marginRight: '-6px'
                                                        }}>
                                                            <Text>Additional Hours:</Text>
                                                        </View>
                                                        <View style={{
                                                            fontSize: '9px',
                                                            fontWeight: 'bold',
                                                            padding: '0px',
                                                            color: '#000',
                                                            marginRight: '0px'
                                                        }}>
                                                            <View style={{ width: '125px', height: '1px', backgroundColor: '#000' }}></View>
                                                        </View>
                                                    </View>

                                                    <View style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'row', flex: '0 0 auto', width: '100%', gap: '10px', marginBottom: '2px', overflow: 'hidden', textAlign: 'right' }}>
                                                        <View style={{
                                                            fontSize: '9px',
                                                            fontWeight: 'bold',
                                                            padding: '0px',
                                                            color: '#000',
                                                            marginRight: '0px'
                                                        }}>
                                                            <Text>Program Hours:</Text>
                                                        </View>
                                                        <View style={{
                                                            fontSize: '9px',
                                                            fontWeight: 'bold',
                                                            padding: '0px',
                                                            color: '#000',
                                                            marginRight: '0px'
                                                        }}>
                                                            <View style={{ width: '125px', height: '1px', backgroundColor: '#000' }}></View>
                                                        </View>
                                                    </View>

                                                    <View style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'row', flex: '0 0 auto', width: '100%', gap: '10px', marginBottom: '0px', overflow: 'hidden', textAlign: 'right' }}>
                                                        <View style={{
                                                            fontSize: '9px',
                                                            fontWeight: 'bold',
                                                            padding: '0px',
                                                            color: '#000',
                                                            marginRight: '0px'
                                                        }}>
                                                            <Text>Total Hours:</Text>
                                                        </View>
                                                        <View style={{
                                                            fontSize: '9px',
                                                            fontWeight: 'bold',
                                                            padding: '0px',
                                                            color: '#000',
                                                            marginRight: '0px'
                                                        }}>
                                                            <View style={{ width: '125px', height: '1px', backgroundColor: '#000' }}></View>
                                                        </View>
                                                    </View>

                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </>
                        ))
                    ) : (
                        <Page size="A4" style={styles.page}>
                            <View style={styles.section}>
                                <Text>No data available</Text>
                            </View>
                        </Page>
                    )}
                </View>
                <Text style={styles.dateText} fixed>{todayDate}</Text>
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `Page ${pageNumber} of ${totalPages}`
                )} fixed />
            </Page>
        </Document>
    )
}
export default ScopePartTimeTimesheetReport