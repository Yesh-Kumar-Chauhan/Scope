import React from 'react'
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

interface WorkshopReportProps {
    data: any;
}

const WorkshopReport: React.FC<WorkshopReportProps> = ({ data }) => {
    const todayDate = moment().format('DD-MM-YYYY');
    return (
        <Document>
            <Page size="A4" style={styles.page} orientation="landscape">
                <View>
                    <div style={styles.section}>
                        <Text style={styles.header}>Workshops Report</Text>
                    </div>


                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row' }}>
                                    <Text style={{ width: '8%', color: '#000', textAlign: 'right', marginRight: '8px' }}>Name:</Text>
                                    <Text style={{ width: '92%', color: '#2a2a2a' }}>Test 1</Text>

                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                <View style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'row' }}>
                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row', width: '50%' }}>
                                        <Text style={{ width: '35%', color: '#000', textAlign: 'right', marginRight: '8px' }}>Hours:</Text>
                                        <Text style={{ width: '65%', color: '#2a2a2a' }}>1.00</Text>
                                    </View>
                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row', width: '50%' }}>
                                        <Text style={{ width: '35%', color: '#000', textAlign: 'right', marginRight: '8px' }}>Date:</Text>
                                        <Text style={{ width: '65%', color: '#2a2a2a' }}>04/01/2020</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row' }}>
                                    <Text style={{ width: '8%', color: '#000', textAlign: 'right', marginRight: '8px' }}>Sponsor:</Text>
                                    <Text style={{ width: '92%', color: '#2a2a2a' }}>Test 1</Text>

                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                <View style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'row' }}>
                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row', width: '50%' }}>
                                        <Text style={{ width: '35%', color: '#000', textAlign: 'right', marginRight: '8px' }}>Yes:</Text>
                                        <Text style={{ width: '65%', color: '#2a2a2a' }}>Yes</Text>
                                    </View>
                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row', width: '50%' }}>
                                        <Text style={{ width: '35%', color: '#000', textAlign: 'right', marginRight: '8px' }}>Date:</Text>
                                        <Text style={{ width: '65%', color: '#2a2a2a' }}>04/01/2020</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>


                    <View style={{ marginBottom: '0px', marginTop: '0px' }}>
                        <Text style={{ fontSize: '11px', color: '#000', textDecoration: 'underline' }}>Topics:</Text>
                    </View>

                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '50%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column' }}>
                                    <Text>01. Principles of Childhood Development</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '50%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column' }}>
                                    <Text>03. Child Care Program Development</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '50%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column' }}>
                                    <Text>02. Nutrition & Health</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '50%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column' }}>
                                    <Text>09. Shaken Baby Syndrome</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '50%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column' }}>
                                    <Text>05. Business Record Maintenance & Management</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '50%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column' }}>
                                    <Text>01. Principles of Childhood Development</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '50%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column' }}>
                                    <Text>02. Nutrition & Health</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '50%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column' }}>
                                    <Text>03. Child Care Program Development</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '50%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column' }}>
                                    <Text>05. Business Record Maintenance & Management</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '50%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column' }}>
                                    <Text>09. Shaken Baby Syndrome</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginBottom: '0px', marginTop: '0px' }}>
                        <Text style={{ fontSize: '11px', color: '#000', textDecoration: 'underline' }}>Attendence:</Text>
                    </View>

                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '100%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column' }}>
                                    <Text>ABDULLA, ANDREA</Text>
                                </View>
                            </View>
                        </View>
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
export default WorkshopReport