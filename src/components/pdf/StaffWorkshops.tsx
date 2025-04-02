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
interface StaffWorkshopsPdfProps {
    data: any;
    // setReportData: (data: any) => void;
}

const StaffWorkshops: React.FC<StaffWorkshopsPdfProps> = ({ data }) => {
    const todayDate = moment().format('DD-MM-YYYY');
    console.log("StaffWorkshopsPdfProps1", data)

    return (
        <Document>
            <Page size="A4" style={styles.page} orientation="landscape">
                <View>
                    <div style={styles.section}>
                        <Text style={styles.header}>Workshops Report</Text>
                    </div>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '15%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text></Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>Title</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '8.11111111%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>Employed</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '8.11111111%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>First Aid</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '8.11111111%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>Abuse</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '8.11111111%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>Mat Exp.</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '8.11111111%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>S.Haras.</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '8.11111111%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>H&S 5</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '8.11111111%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>H&S 15</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '8.11111111%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>ACES</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '8.11111111%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>ELaw</Text>
                                </View>
                            </View>
                        </View>

                        {/* <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '100%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', backgroundColor: '#cdcdcd' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text>SCOPE</Text>
                                    <Text>SCOPE SUFFOLK A</Text>
                                </View>
                            </View>
                        </View> */}

                        {(data && data.length) && data.map((x: any, index: number) => (
                            <View style={styles.tableRow}>
                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '15%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text>{x.WorkshopName}</Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text></Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '8.11111111%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>{x.Date ? moment(x.Date).format('YYYY-MM-DD') : ''}</Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '8.11111111%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text></Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '8.11111111%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text></Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '8.11111111%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text></Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '8.11111111%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text></Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '8.11111111%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text></Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '8.11111111%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text></Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '8.11111111%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text></Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '8.11111111%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '0px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text></Text>
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
        </Document>
    );
};

export default memo(StaffWorkshops);
