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
interface StaffMATCPRReportProps {
    data: any;
}

const StaffMATCPRReport: React.FC<StaffMATCPRReportProps> = ({ data }) => {
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
                        <Text style={styles.header}>Staff MAT/ CPR/ FA</Text>
                    </div>

                    <View style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'flex-start' }}>
                        <View style={{ width: '100%', flex: '0 0 auto' }}>
                            <View style={styles.table}>
                                <View style={styles.tableRow}>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '50px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text>
                                                Name:
                                            </Text>
                                            <Text style={{ marginTop: '4px' }}>
                                            {data[0]?.FIRSTNAME}, {data[0]?.LASTNAME}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '50px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text>
                                                A = Add
                                            </Text>
                                            <Text style={{ marginTop: '4px' }}>
                                                R = Remove
                                            </Text>
                                            <Text style={{ marginTop: '4px' }}>
                                                C = Change
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', textAlign: 'center' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text>MAT</Text>
                                            <Text>Exp date</Text>
                                        </View>
                                    </View>

                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', textAlign: 'center' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text>CPR</Text>
                                            <Text>Exp date</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', textAlign: 'center' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text>First Aid</Text>
                                            <Text>Exp date</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', textAlign: 'center' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text>HHC</Text>
                                            <Text>Initials</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', textAlign: 'center' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text>Date</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.tableRow}>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text>
                                                Original
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text>
                                                Add
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', textAlign: 'center' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '0px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text>{data[0]?.MATDATE ? moment(data?.MATDATE).format('YYYY-MM-DD') : ''}</Text>
                                        </View>
                                    </View>

                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', textAlign: 'center' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '0px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                         <Text>{data[0]?.CPR ? moment(data?.CPR).format('YYYY-MM-DD') : ''}</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', textAlign: 'center' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '0px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text>{data[0]?.FIRSTAID ? moment(data?.FIRSTAID).format('YYYY-MM-DD') : ''}</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', textAlign: 'center' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '0px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', textAlign: 'center' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '0px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                        </View>
                                    </View>
                                </View>
                                <View style={styles.tableRow}>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text>
                                                Language
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text>

                                            </Text>
                                        </View>
                                    </View>

                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', textAlign: 'center' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                        </View>
                                    </View>

                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', textAlign: 'center' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', textAlign: 'center' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', textAlign: 'center' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', textAlign: 'center' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                        </View>
                                    </View>
                                </View>
                                <View style={styles.tableRow}>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text>
                                                Renewal
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text>

                                            </Text>
                                        </View>
                                    </View>

                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', textAlign: 'center' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                        </View>
                                    </View>

                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', textAlign: 'center' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', textAlign: 'center' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', textAlign: 'center' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', textAlign: 'center' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                        </View>
                                    </View>
                                </View>
                                <View style={styles.tableRow}>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text>
                                                Renewal
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text>

                                            </Text>
                                        </View>
                                    </View>

                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', textAlign: 'center' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                        </View>
                                    </View>

                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', textAlign: 'center' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', textAlign: 'center' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', textAlign: 'center' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', textAlign: 'center' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                        </View>
                                    </View>
                                </View>
                                <View style={styles.tableRow}>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text>
                                                Renewal
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text>

                                            </Text>
                                        </View>
                                    </View>

                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', textAlign: 'center' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                        </View>
                                    </View>

                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', textAlign: 'center' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', textAlign: 'center' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', textAlign: 'center' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', textAlign: 'center' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* <View style={{ width: '10px', flex: '0 0 auto', height: '100%' }}>
                            <View style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: '#000', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: '11px', color: '#000', fontWeight: 'bold', transform: 'rotate(180deg)', flexWrap: 'nowrap', display: 'flex', }}>
                                    APPENDIX H 0 ONLY COMPLETE THIS SECTION IF THE PROGRAM WILL ADMINISTER MEDICATION
                                </Text>
                            </View>
                        </View> */}
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
export default StaffMATCPRReport;