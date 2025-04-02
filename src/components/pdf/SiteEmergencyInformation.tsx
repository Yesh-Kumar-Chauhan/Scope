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
interface SiteEmergencyInformationReportProps {
    data: any;
    // setReportData: (data: any) => void;
}

const SiteEmergencyInformation: React.FC<SiteEmergencyInformationReportProps> = ({ data }) => {
    const todayDate = moment().format('DD-MM-YYYY');
    const siteInfo = data[0];
    console.log("dataSiteEmergencyInformationReportProps",siteInfo)
    return (
        <Document>
          
            <Page size="A4" style={styles.page} orientation="portrait">
                <View>
                    <div style={styles.section}>
                        <Text style={styles.header}>Site Emergency Information</Text>
                    </div>
                    <View style={{ paddingLeft: '5px' }}>
                        <Text style={{ fontSize: '10px', fontWeight: 'normal', marginBottom: '3px' }}>{siteInfo.DIST_NAM}</Text>
                    </View>
                    <View style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'row' }}>
                        <View style={{ width: '15%' }}>
                            <View style={{ paddingLeft: '5px' }}>
                        <Text style={{ fontSize: '10px', fontWeight: 'normal', marginBottom: '3px' }}>  <Text>{siteInfo.SITE_NUM} </Text></Text>
                    </View>
                        </View>
                        <View style={{ width: '35%' }}>
                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                <Text>{siteInfo.SITE_NAM}</Text>
                                <Text>{siteInfo.ADDR1}</Text>
                                <Text>{siteInfo.ADDR2}</Text>
                                <Text>{siteInfo.ADDR3}</Text>
                            </View>
                        </View>
                        <View style={{ width: '15%' }}>
                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                <Text>{siteInfo.PERMIT}</Text>
                            </View>
                        </View>
                        <View style={{ width: '35%' }}>
                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                            <Text>{siteInfo.GRADE_LVLS}</Text>

                                <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginTop: '10px' }}>
                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                        <Text>SCOPE Phone </Text>
                                    </View>
                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{siteInfo.PHONE}</Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                        <Text>Land Line Phone Location:</Text>
                                    </View>
                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{siteInfo.LNDLNLOC}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>


                    <View style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'row' }}>
                        <View style={{ width: '50%' }}>
                            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginTop: '10px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', minWidth: '80px' }}>
                                    <Text>Location:</Text>
                                </View>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{siteInfo.ROOM_NO}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ width: '50%' }}>
                            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginTop: '10px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', minWidth: '80px' }}>
                                    <Text>Outside Safe Place.</Text>
                                </View>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{siteInfo.OSSPLACE}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'row' }}>
                        <View style={{ width: '50%' }}>
                            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginTop: '10px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', minWidth: '80px' }}>
                                    <Text>Capacity:</Text>
                                </View>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{siteInfo.CAPACTIY}</Text>
                                </View>
                            </View>
                        </View>
                    </View>



                    <View style={{
                        width: '100%',
                        borderStyle: 'solid',
                        borderBottomWidth: 0,
                        borderColor: '#cdcdcd',
                        paddingBottom: '11px',
                        paddingTop: '11px',
                        margin: 'auto',
                        height: 'auto'
                    }}>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text>Approved Spaces</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingRight: '35px' }}>
                                    <Text>Space Capacity</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text>Additional Approved Space</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                                    <Text>Space Capacity</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text>{siteInfo.ROOM_NO}</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingRight: '35px' }}>
                                <Text>{siteInfo.CAP1}</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                <Text>{siteInfo.ADDLOC}</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                                <Text>{siteInfo.ASCAP1}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                <Text>{siteInfo.ROOM_NO2}</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingRight: '35px' }}>
                                <Text>{siteInfo.CAP2}</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                <Text>{siteInfo.ADDLOC2}</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                                <Text>{siteInfo.ASCAP2}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                <Text>{siteInfo.ROOM_NO3}</Text>

                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingRight: '35px' }}>
                                <Text>{siteInfo.CAP3}</Text>

                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                <Text>{siteInfo.ADDLOC3}</Text>

                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                                <Text>{siteInfo.ASCAP3}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                <Text>{siteInfo.ROOM_NO4}</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingRight: '35px' }}>
                                <Text>{siteInfo.CAP4}</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                <Text>{siteInfo.ADDLOC4}</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                                <Text>{siteInfo.ASCAP4}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{
                        width: '100%',
                        borderStyle: 'solid',
                        borderBottomWidth: 0,
                        borderColor: '#cdcdcd',
                        paddingBottom: '11px',
                        paddingTop: '11px',
                        margin: 'auto',
                        height: 'auto'
                    }}>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '33.33%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text style={{ marginBottom: '5px' }}>Principal</Text>
                                    <Text>{siteInfo.PRINCIPAL}</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '33.33%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text style={{ marginBottom: '5px' }}>School Phone</Text>
                                    <Text>{siteInfo.SCHFONE}</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '33.33%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text style={{ marginBottom: '5px' }}>School Fax</Text>
                                    <Text>{siteInfo.SFAX}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        width: '100%',
                        borderStyle: 'solid',
                        borderBottomWidth: 0,
                        borderColor: '#cdcdcd',
                        paddingBottom: '11px',
                        paddingTop: '11px',
                        margin: 'auto',
                        height: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px'
                    }}>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '50%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text style={{ marginBottom: '5px' }}>Police</Text>
                                    <Text>{siteInfo.PADR1}</Text>
                                    <Text>{siteInfo.PADR2}</Text>
                                    <Text>{siteInfo.PADR3}</Text>
                                    <Text>{siteInfo.PPHONE}</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '40%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text style={{ marginBottom: '5px' }}>Evacuation One</Text>
                                    <Text>{siteInfo.EADR1}</Text>
                                    <Text>{siteInfo.EADR2}</Text>
                                    <Text>{siteInfo.EADR3}</Text>
                                    <Text>{siteInfo.EPHONE}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '50%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text style={{ marginBottom: '5px' }}>Fire</Text>
                                    <Text>{siteInfo.FADR1}</Text>
                                    <Text>{siteInfo.FADR2}</Text>
                                    <Text>{siteInfo.FADR3}</Text>
                                    <Text>{siteInfo.FPHONE}</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '40%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text style={{ marginBottom: '5px' }}>Evacuation Two</Text>
                                    <Text>{siteInfo.EADR1}</Text>
                                    <Text>{siteInfo.EADR2}</Text>
                                    <Text>{siteInfo.EADR3}</Text>
                                    <Text>{siteInfo.EPHONE}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '50%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row' }}>
                                    <Text style={{ minWidth: '120px' }}>Security: </Text>
                                    <Text style={{}}>{siteInfo.SECURITY}</Text>
                                </View>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row' }}>
                                    <Text style={{ minWidth: '120px' }}>Transportation: </Text>
                                    <Text style={{}}>{siteInfo.TRANSPORT}</Text>
                                </View>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row' }}>
                                    <Text style={{ minWidth: '120px' }}>Shelter-in-Place location: </Text>
                                    <Text style={{}}>{siteInfo.SAFEPLACE}</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '40%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', flexDirection: 'row' }}>
                                    <Text style={{ minWidth: '80px' }}>Ambulance: </Text>
                                    <View>
                                        <Text>{siteInfo.SECPHONE}</Text>
                                        <Text>{siteInfo.TPPHONE}</Text>
                                        <Text>{siteInfo.AMBPHONE}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>


                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '50%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row' }}>
                                    <Text style={{ minWidth: '120px' }}>Lock down procedure: </Text>
                                    <Text style={{}}>{siteInfo.LOCKDOWN}</Text>
                                </View>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row' }}>
                                    <Text style={{ minWidth: '120px' }}>Additional Emergency Information: </Text>
                                    <Text style={{}}>{siteInfo.ADDEMGINFO}</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '40%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', flexDirection: 'row' }}>

                                </View>
                            </View>
                        </View>


                    </View>
                </View >
                <Text style={styles.dateText} fixed>{todayDate}</Text>
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `Page ${pageNumber} of ${totalPages}`
                )} fixed />
            </Page >
        </Document >
    )
}

export default SiteEmergencyInformation