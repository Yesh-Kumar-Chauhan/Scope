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

interface FingerprintWaiverAdditionalSiteReportProps {
    data: any;
}

const FingerprintWaiverAdditionalSiteReport: React.FC<FingerprintWaiverAdditionalSiteReportProps> = ({ data }) => {
    const todayDate = moment().format('DD-MM-YYYY');
  
    if (!data) {
        return null;
    }
    return (
        <Document>
            <Page size="A4" style={styles.page} orientation="portrait">
                <View>
                    <div style={styles.section}>
                        <Text style={{
                            fontSize: '18px',
                            marginBottom: 0,
                            textAlign: 'center',
                            borderStyle: 'solid',
                            borderBottomWidth: 1,
                            borderColor: '#cdcdcd',
                            paddingBottom: '0px',
                            width: '100%'
                        }}>Fingerprint Waiver - Additional Sites</Text>
                    </div>
                    <View style={{ width: '100%' }}>
                        <Text style={{ fontSize: '10px', textAlign: 'center' }}>Use this form to eliminate the need to complete a separate waiver request for multiple sites</Text>
                    </View>
                    <View style={{ display: "flex", alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', marginTop: '10px', marginBottom: '5px' }}>
                        <View style={{ width: '32%', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ fontSize: '10px', textAlign: 'center' }}>Name:</Text>
                            <View style={{ width: '85%', height: '1px', backgroundColor: '#000' }}></View>
                        </View>
                        <View style={{ width: '28%', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ fontSize: '10px', textAlign: 'center' }}>D.O.B:</Text>
                            <View style={{ width: '31px', height: '1px', backgroundColor: '#000' }}></View>
                            <Text style={{ fontSize: '13px' }}>/</Text>
                            <View style={{ width: '31px', height: '1px', backgroundColor: '#000' }}></View>
                            <Text style={{ fontSize: '13px' }}>/</Text>
                            <View style={{ width: '31px', height: '1px', backgroundColor: '#000' }}></View>
                        </View>
                        <View style={{ width: '32%', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ fontSize: '10px', textAlign: 'center' }}>NYSID Number(if Known):</Text>
                            <View style={{ width: '50%', height: '1px', backgroundColor: '#000' }}></View>
                        </View>
                    </View>

                    <View style={{ width: '100%', marginBottom: '15px' }}>
                        <Text style={{ fontSize: '8px', textAlign: 'left' }}>Additional Sites (list individually): Check the box next to the programs you need to be associate with</Text>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '4%', gap: '0px' }}>
                                <View style={{ fontSize: '8px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                    <Text></Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '18%', gap: '0px' }}>
                                <View style={{ fontSize: '8px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '1px', borderTopWidth: '0', borderLeftWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                    <Text>Permit#</Text>
                                </View>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '18%', gap: '0px', textAlign: 'center' }}>
                                <View style={{ fontSize: '8px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '1px', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                    <Text>District</Text>
                                </View>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '60%', gap: '0px', textAlign: 'center' }}>
                                <View style={{ fontSize: '8px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '1px', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                    <Text>Facility / Provider / Agency - Name and Address</Text>
                                </View>
                            </View>
                        </View>
                        {data.length > 0 ? (
                            data.map((data: any, index: number) => (
                                <View style={styles.tableRow}>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '4%', gap: '0px' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <View style={{ width: '10px', height: '10px', borderStyle: 'solid', borderWidth: '1px', borderColor: '#000' }}>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '18%', gap: '0px' }}>
                                        <View style={{ fontSize: '8px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0px', borderTopWidth: '0', borderLeftWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text>{data?.PERMIT}</Text>
                                        </View>
                                    </View>

                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '18%', gap: '0px', textAlign: 'center' }}>
                                        <View style={{ fontSize: '8px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0px', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text>{data?.DIST_NAM}</Text>
                                        </View>
                                    </View>

                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '60%', gap: '0px', textAlign: 'center' }}>
                                        <View style={{ fontSize: '8px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0px', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text>{data?.SITE_NAM}, {data?.ADDR1}, {data?.ADDR2}</Text>
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
export default FingerprintWaiverAdditionalSiteReport