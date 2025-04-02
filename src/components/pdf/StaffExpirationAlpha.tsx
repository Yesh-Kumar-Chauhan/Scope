import React from 'react'
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
interface StaffExpirationAlphaReportProps {
    data: any;
    // setReportData: (data: any) => void;
}

const StaffExpirationAlpha: React.FC<StaffExpirationAlphaReportProps> = ({ data }) => {
    const todayDate = moment().format('DD-MM-YYYY');
    console.log("StaffExpirationAlphaReportProps", data)

    return (
        <Document>
            <Page size="A4" style={styles.page} orientation="landscape">
                <View>
                    <div style={styles.section}>
                        <Text style={styles.header}>Staff Expiration Alpha</Text>
                    </div>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '17%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>Name</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '17%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>Site</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '8%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>DOE</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>Child Abuse</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '15%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>Foundations</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '15%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text>Title</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '8%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>CPR</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '8%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>MAT</Text>
                                </View>
                            </View>
                        </View>
                        {(data && data.length) && data.map((x: any, index: number) => (
                            <View style={styles.tableRow}>
                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '17%', gap: '0px' }}>
                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text>{x.FIRSTNAME}</Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '17%', gap: '0px' }}>
                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text>{x.SiteName}</Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '8%', gap: '0px' }}>
                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text>{x.DOEMP ? moment(x.DOEMP).format('YYYY-MM-DD') : ''}</Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px' }}>
                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text>{x.MatApp ? moment(x.MatApp).format('YYYY-MM-DD') : ''}</Text>

                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '15%', gap: '0px' }}>
                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                      
                                        <Text>{x.Foundations ? moment(x.Foundations).format('YYYY-MM-DD') : ''}</Text>

                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '15%', gap: '0px' }}>
                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text>{x.Position}</Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '8%', gap: '0px' }}>
                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                         <Text>{x.CPR ? moment(x.CPR).format('YYYY-MM-DD') : ''}</Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '8%', gap: '0px' }}>
                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text>{x.MATDATE ? moment(x.MATDATE).format('YYYY-MM-DD') : ''}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
                <Text style={styles.dateText} fixed>{todayDate}</Text>
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `Page ${pageNumber} of ${totalPages}`
                )} fixed />
            </Page>
        </Document >
    )
}

export default StaffExpirationAlpha