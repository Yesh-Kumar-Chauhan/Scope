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
interface CBCPdfProps {
    data: any;
    // setReportData: (data: any) => void;
}

const CBC: React.FC<CBCPdfProps> = ({ data }) => {
    const todayDate = moment().format('DD-MM-YYYY');
    return (
        <Document>
            <Page size="A4" style={styles.page} orientation="landscape">
                <View>
                    <div style={styles.section}>
                        <Text style={styles.header}>CBC</Text>
                    </div>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>Date</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '22%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>Name</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '22%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>District</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '22%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>Site</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '22%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>Position</Text>
                                </View>
                            </View>
                        </View>
                        {(data && data.length) && data.map((x: any, index: number) => (
                            <View style={styles.tableRow}>
                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text>{x.CBC ? moment(x.CBC).format('YYYY-MM-DD') : ''}</Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '22%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text>{x.FIRSTNAME} {x.LASTNAME}</Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '22%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text>{x.DIST_NAM}</Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '22%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text>{x.SITE_NAM}</Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '22%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '0px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text>{x.SitePos}</Text>
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

export default memo(CBC);
