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

interface SiteLicensorsReportProps {
    data: any;
}

const SiteLicensorsReport: React.FC<SiteLicensorsReportProps> = ({ data }) => {
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
            <Page size="A4" style={styles.page} orientation="portrait">
                <View>
                    <div style={styles.section}>
                        <Text style={styles.header}>Site Licensors</Text>
                    </div>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '27%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text>District</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '27%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text>Site</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text>Permit#</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '19%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text>Licensor</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '13%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text>Phone</Text>
                                </View>
                            </View>
                        </View>
                        {data.length > 0 ? (
                            data.map((data: any, index: number) => (
                                <View style={styles.tableRow}>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '27%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '0px' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text>{data?.DIST_NAM}</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '27%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '0px' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text>{data?.SITE_NAM}</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '14%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '0px' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text>{data?.PERMIT}</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '19%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '0px' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text>{data?.DSS_REP}</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '13%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '0px' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text>{data?.DSS_FON}</Text>
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
export default SiteLicensorsReport