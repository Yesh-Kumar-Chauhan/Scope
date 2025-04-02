import React, { useEffect } from 'react'
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
interface VisitsReportProps {
    data: any;
    // setReportData: (data: any) => void;
}

const VisitsReport: React.FC<VisitsReportProps> = ({ data }) => {
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
                        <Text style={styles.header}>Visits</Text>
                    </div>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>Site</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '10%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>Date</Text>
                                </View>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '20%', gap: '0px', textAlign: 'center' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>Name</Text>
                                </View>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '40%', gap: '0px', textAlign: 'center' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>Reason</Text>
                                </View>
                            </View>
                        </View>
                        {data.length > 0 ? (
                            data.map((data: any, index: number) => (
                                <>
                                    <View style={styles.tableRow} wrap={false}>
                                        <View wrap={false} style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderBottomStyle: 'dashed', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                <Text>{data?.SITE_NAM}</Text>
                                            </View>
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '10%', gap: '0px' }}>
                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderBottomStyle: 'dashed', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Text>{data?.date ? moment(data.date).format('YYYY-MM-DD') : ''}</Text>
                                            </View>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '20%', gap: '0px', textAlign: 'center' }}>
                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderBottomStyle: 'dashed', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                                <Text>{data?.name}</Text>
                                            </View>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '40%', gap: '0px', textAlign: 'center' }}>
                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderBottomStyle: 'dashed', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                <Text>{data?.OFFICAL == true ? 'Official, ' : ''} {data?.STAFFING == true ? 'Staffing, ' : ''} {data?.PROBLEM == true ? 'Problem, ' : ''} {data?.TRAINING == true ? 'Training, ' : ''} {data?.QUALITY == true ? 'Quality, ' : ''} {data?.OTHER == true ? 'Other, ' : ''}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.tableRow} wrap={false}>
                                        <View wrap={false} style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '100%', gap: '0px' }}>
                                            <View wrap={false} style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row' }}>
                                                <Text wrap={false} style={{ width: '5%', fontWeight: 'bold', color: '#000' }}>Notes</Text>
                                                <Text wrap={false} style={{ width: '95%', color: '#474747' }}>{data?.NOTES}</Text>
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
                </View>
                    <Text style={styles.dateText} fixed>{todayDate}</Text>
                    <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                        `Page ${pageNumber} of ${totalPages}`
                    )} fixed/>
            </Page>
        </Document>
    )
}

export default VisitsReport