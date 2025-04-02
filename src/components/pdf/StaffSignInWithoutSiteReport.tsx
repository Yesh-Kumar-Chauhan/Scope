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
interface StaffSignInWithoutSiteReportProps {
    data: any;
}

const StaffSignInWithoutSiteReport: React.FC<StaffSignInWithoutSiteReportProps> = ({ data }) => {
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
                        <Text style={styles.header}>Staff Sign In</Text>
                    </div>
                    <View style={{ marginTop: '5px', marginBottom: '15px', width: '80%', margin: 'auto' }}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', width: '100%', margin: 'auto' }}>
                            <Text style={{ fontSize: '10px', fontWeight: 'normal', marginRight: '10px' }}>Today's Date:</Text>
                            <View style={{ width: '100px', height: '1px', backgroundColor: '#000' }}></View>
                        </View>
                    </View>
                    <View style={{ margin: '5px' }}>

                    </View>
                    {data?.map((data: any, index: number) => (
                    <View style={styles.table}>
                        <View style={{
                            margin: 'auto',
                            flexDirection: 'row',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'stretch',
                            gap: '0px',
                            marginBottom: '-1px',
                            justifyContent: 'flex-start',
                            alignSelf: 'stretch'
                        }}>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '33.33%', gap: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', minHeight: '22px', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px' }}>
                                    <Text>Name</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '33.33%', gap: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', minHeight: '22px', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px' }}>
                                    <Text>District</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '33.33%', gap: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', minHeight: '22px', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px' }}>
                                    <Text>Signature</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{
                            margin: 'auto',
                            flexDirection: 'row',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'stretch',
                            gap: '0px',
                            marginBottom: '-1px',
                            justifyContent: 'flex-start',
                            alignSelf: 'stretch'
                        }}>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '33.33%', gap: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', minHeight: '22px', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', height: '100%' }}>
                                <Text>{data?.FirstName} {data?.LastName}</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '33.33%', gap: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', minHeight: '22px', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', height: '100%' }}>
                                <Text>{data?.DIST_NAM}</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '33.33%', gap: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '1px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', minHeight: '22px', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', height: '100%' }}>
                                    <Text></Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    ))}
                </View>
                <Text style={styles.dateText} fixed>{todayDate}</Text>
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `Page ${pageNumber} of ${totalPages}`
                )} fixed />
            </Page>
        </Document>
    )
}
export default StaffSignInWithoutSiteReport