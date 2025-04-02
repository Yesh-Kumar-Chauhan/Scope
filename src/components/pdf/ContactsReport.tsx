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

interface ContactsReportProps {
    data: any;
}

const ContactsReport: React.FC<ContactsReportProps> = ({ data }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    if (!data) {
        return null;
    }
    return (
        <Document>
            <Page size="A4" style={styles.page} orientation="landscape">
                <View>
                    <div style={styles.section}>
                        <Text style={styles.header}>Contacts</Text>
                    </div>

                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '22%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>Site</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '8%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>Date</Text>
                                </View>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '23.3333333%', gap: '0px', textAlign: 'center' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>Name</Text>
                                </View>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '23.3333333%', gap: '0px', textAlign: 'center' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>Contact</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '23.3333333%', gap: '0px', textAlign: 'center' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>Child</Text>
                                </View>
                            </View>
                        </View>

                        {data.length > 0 ? (
                            data.map((data: any, index: number) => (
                                <>
                                    <View style={styles.tableRow}>
                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '22%', gap: '0px' }}>
                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', borderBottomStyle: 'dashed' }}>
                                                <Text>{data?.SITE_NAM}</Text>
                                            </View>
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '8%', gap: '0px' }}>
                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', borderBottomStyle: 'dashed' }}>
                                                <Text>{data?.DATE? moment(data?.DATE).format('YYYY-MM-DD') : ''}</Text>
                                            </View>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '23.3333333%', gap: '0px', textAlign: 'center' }}>
                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', borderBottomStyle: 'dashed' }}>
                                                <Text>{data?.NAME}</Text>
                                            </View>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '23.3333333%', gap: '0px', textAlign: 'center' }}>
                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', borderBottomStyle: 'dashed' }}>
                                                <Text>{data?.CONTACT}</Text>
                                            </View>
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '23.3333333%', gap: '0px', textAlign: 'center' }}>
                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', borderBottomStyle: 'dashed' }}>
                                                <Text>{data?.CHILD}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.tableRow}>
                                        <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '100%%', gap: '0px' }}>
                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flex: '0 0 auto', width: '6%' }}>
                                                <Text>Notes</Text>
                                            </View>
                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flex: '0 0 auto', width: '94%' }}>
                                                <Text>{data?.SITUATION}</Text>
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
                )} fixed />
            </Page>
        </Document>
    )
}
export default ContactsReport