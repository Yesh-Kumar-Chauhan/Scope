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

interface EmergencyPhoneReportProps {
    data: any;
}

const EmergencyPhoneReport: React.FC<EmergencyPhoneReportProps> = ({ data }) => {
    const todayDate = moment().format('DD-MM-YYYY');
  
    if (!data) {
        return null;
    }
    return (
        <Document>
            <Page size="A4" style={styles.page} orientation="portrait">
                <View>
                    <div style={styles.section}>
                        <Text style={styles.header}>Emergency Phone Report
                        </Text>
                    </div>
                    {data.length > 0 ? (
                        data.map((data: any, index: number) => (
                            <>
                                <View style={{ marginTop: '5px', marginBottom: '5px', width: '100%', textAlign: 'center' }}>
                                    <Text style={{ fontSize: '12px', fontWeight: 'normal', marginBottom: '5px' }}>{data?.SITE_NUM} {data?.SITE_NAM}</Text>
                                    <Text style={{ fontSize: '13px', fontWeight: 'normal', marginBottom: '5px' }}>SCOPE Information</Text>
                                    <Text style={{ fontSize: '10px', fontWeight: 'normal', marginBottom: '3px' }}>{data?.DIST_NAM} / {data?.ADDR1}
                                    </Text>
                                </View>
                                <View style={{ marginTop: '5px', marginBottom: '5px', width: '80%', margin: 'auto' }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', margin: 'auto' }}>
                                        <Text style={{ fontSize: '12px', fontWeight: 'normal', marginBottom: '5px', minWidth: '200px' }}>SCOPE program phone number:</Text>
                                        <Text style={{ fontSize: '12px', fontWeight: 'normal', marginBottom: '5px' }}>{data?.PHONE}</Text>
                                    </View> <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', margin: 'auto' }}>
                                        <Text style={{ fontSize: '12px', fontWeight: 'normal', marginBottom: '5px', minWidth: '200px' }}>Home School phone number:</Text>
                                        <Text style={{ fontSize: '12px', fontWeight: 'normal', marginBottom: '5px' }}>{data?.SCHFONE}</Text>
                                    </View> <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', margin: 'auto' }}>
                                        <Text style={{ fontSize: '12px', fontWeight: 'normal', marginBottom: '5px', minWidth: '200px' }}>Home School fax# number:</Text>
                                        <Text style={{ fontSize: '12px', fontWeight: 'normal', marginBottom: '5px' }}>{data?.SFAX}</Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', width: '100%', marginTop: '15px' }}>
                                    <View style={{ width: '50%', paddingRight: '12px' }}>
                                        <View style={styles.table}>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>SCOPE Admin Office</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>(631)360-0800</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '52px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>SCOPE Beyond Office Hours </Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '52px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>(631)942-8054</Text>
                                                        <Text>Or contact your District Field Manager</Text>
                                                    </View>
                                                </View>
                                            </View>

                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '52px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>Long Island Regional Office
                                                            250 Veteran’s Highway,
                                                            Suite 2A-20 Hauppauge,
                                                            New York 11788</Text>
                                                        <Text>
                                                            www.ocfs.state.ny.us</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '52px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>(631)240-2560</Text>
                                                    </View>
                                                </View>
                                            </View>


                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>Suffolk Child Care Council</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>(631)462-0303</Text>
                                                    </View>
                                                </View>
                                            </View>

                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>Nassau Child Care Council</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>(516)358-9250</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>Suffolk Soc. Ser. Day Care Unit</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>(631)853-3666</Text>
                                                    </View>
                                                </View>
                                            </View>

                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>Nassau Soc. Ser. Day Care Unit</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>(516)227-7976</Text>
                                                    </View>
                                                </View>
                                            </View>

                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>Department of health</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>(631)852-5999</Text>
                                                    </View>
                                                </View>
                                            </View>

                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>Child Protective Services</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>(800)635-1522</Text>
                                                    </View>
                                                </View>
                                            </View>


                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>Poison Control</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>(800)222-1222</Text>
                                                    </View>
                                                </View>
                                            </View>


                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>School Tranportaion</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>516-801-5190</Text>
                                                    </View>
                                                </View>
                                            </View>


                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>Fire Department</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>516-621-7539</Text>
                                                    </View>
                                                </View>
                                            </View>


                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>Police</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>516-573-6600</Text>
                                                    </View>
                                                </View>
                                            </View>


                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>School Security</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>516-782-1129</Text>
                                                    </View>
                                                </View>
                                            </View>

                                        </View>
                                    </View>
                                    <View style={{ width: '50%', paddingLeft: '12px' }}>

                                        <View style={styles.table}>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>EMERGENCY</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>911</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>Ambulance</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>516-742-3300</Text>
                                                    </View>
                                                </View>
                                            </View>

                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>Hospital</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>

                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>

                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>


                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>


                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>


                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>


                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>


                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>


                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>


                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>


                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>


                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>


                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>


                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>


                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '70%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                            </View>

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
                <Text style={styles.dateText} fixed>{todayDate}</Text>
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `Page ${pageNumber} of ${totalPages}`
                )} fixed />
            </Page>
        </Document>
    )
}
export default EmergencyPhoneReport