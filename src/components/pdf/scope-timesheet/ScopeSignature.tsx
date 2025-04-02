import React, { memo, useEffect } from 'react'
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFDownloadLink,
    pdf,
} from '@react-pdf/renderer';

interface ScopeSignatureProps {
    data: any;
}

const styles = StyleSheet.create({
    page: {
        padding: 30,
    },
    section: {
        marginBottom: 10,
        width: '100%',
    },
    header: {
        fontSize: '18px',
        marginBottom: 0,
        textAlign: 'center',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: '#cdcdcd',
        paddingBottom: '8px',
    },
    staffList: {
        fontSize: '13px',
        marginBottom: 0,
        marginTop: 8,
        textAlign: 'left',
    },
    table: {
        width: '100%',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: '#cdcdcd',
        paddingBottom: '12px',
        paddingTop: '12px',
    },
    tableStaff: {
        // display: 'table',
        width: '100%',
        borderSpacing: '10px',
        marginBottom: -1,
        borderCollaps: 'collapsed',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        borderStyle: 'solid',
        borderTopWidth: 1,
        borderColor: '#000',
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row',
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0px',
        marginBottom: '0px',
        justifyContent: 'flex-start'
    },
    tableColHeader: {
        borderWidth: 0,
        fontSize: '10px',
        fontWeight: 'bold',
        padding: '0px',
        color: '#000',
        border: '0',
        verticalAlign: 'sub',
        minWidth: '75px',
        flex: '0 0 75px'
    },
    tableColHeaderLic: {
        borderWidth: 0,
        fontSize: '10px',
        fontWeight: 'bold',
        padding: '0px',
        color: '#000',
        border: '0',
        verticalAlign: 'sub',
        minWidth: '100px',
        flex: '0 0 100px'
    },
    tableCol: {
        fontSize: '10px',
        borderWidth: 1,
        color: '#3a3a3a',
        fontWeight: 'normal',
        verticalAlign: 'sub',
        padding: '0px',
        border: '0'
    },
    staffHeadCol:
        { display: 'flex', alignItems: 'center', gap: '3px', flexDirection: 'row' },
    text: {
        marginBottom: 4,
    },
});

const ScopeSignature: React.FC<ScopeSignatureProps> = ({ data }) => {

    return (
        <View style={{
            width: '100%',
            borderStyle: 'solid',
            borderBottomWidth: 0,
            borderColor: '#cdcdcd',
            paddingBottom: '12px',
            paddingTop: '12px',
        }}>
            <View style={styles.tableRow} wrap={false}>
                <View
                    wrap={false}
                    style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column', flex: '0 0 auto', width: '55%', gap: '10px', marginBottom: '0px', overflow: 'hidden', paddingRight: '10px' }}>
                    <View style={styles.tableRow}>
                        <View style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'row', flex: '0 0 auto', width: '60%', gap: '10px', marginBottom: '5px', overflow: 'hidden', paddingRight: '5px' }}>
                            <View style={{
                                fontSize: '9px',
                                fontWeight: 'bold',
                                padding: '0px',
                                color: '#000',
                                marginRight: '15px'
                            }}>
                                <Text>Employee Signature:</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={{ width: '95px', borderBottomWidth: '1px', borderStyle: 'solid', borderColor: '#000' }}></Text>
                            </View>
                        </View>
                        <View style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'row', flex: '0 0 auto', width: '40%', gap: '10px', marginBottom: '5px', overflow: 'hidden', paddingLeft: '5px', paddingRight: '5px' }}>
                            <View style={{
                                fontSize: '9px',
                                fontWeight: 'bold',
                                padding: '0px',
                                color: '#000',
                                marginRight: '0px'
                            }}>
                                <Text>Date:</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={{ width: '150px', borderBottomWidth: '1px', borderStyle: 'solid', borderColor: '#000' }}></Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'row', flex: '0 0 auto', width: '60%', gap: '10px', marginBottom: '5px', overflow: 'hidden', paddingRight: '5px' }}>
                            <View style={{
                                fontSize: '9px',
                                fontWeight: 'bold',
                                padding: '0px',
                                color: '#000',
                                marginRight: '15px',
                            }}>
                                <Text>Verfication Signature:</Text>
                                <Text>(for Program Hours)</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={{ width: '95px', borderBottomWidth: '1px', borderStyle: 'solid', borderColor: '#000', marginTop: '-12px' }}></Text>
                            </View>
                        </View>
                        <View style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'row', flex: '0 0 auto', width: '40%', gap: '10px', marginBottom: '0px', overflow: 'hidden', paddingLeft: '5px', paddingRight: '5px' }}>
                            <View style={{
                                fontSize: '9px',
                                fontWeight: 'bold',
                                padding: '0px',
                                color: '#000',
                                marginRight: '0px'
                            }}>
                                <Text>Date:</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={{ width: '150px', borderBottomWidth: '1px', borderStyle: 'solid', borderColor: '#000' }}></Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View
                    wrap={false}
                    style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column', flex: '0 0 auto', width: '45%', gap: '10px', marginBottom: '10px', overflow: 'hidden', paddingLeft: '10px' }}>
                    <View style={styles.tableRow} wrap={false}>
                        <View style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', flex: '0 0 auto', width: '40%', gap: '10px', marginBottom: '7px', overflow: 'hidden', paddingRight: '5px' }}>
                            <View style={{
                                fontSize: '9px',
                                fontWeight: 'bold',
                                padding: '0px',
                                color: '#000',
                                marginRight: '15px'
                            }}>
                                <Text>SCOPE Office:</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={{ width: '55px', height: '55px', borderWidth: '1px', borderStyle: 'solid', borderColor: '#000' }}></Text>
                            </View>
                        </View>
                        <View wrap={false} style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column', flex: '0 0 auto', width: '60%', gap: '10px', marginBottom: '0px', paddingLeft: '5px', paddingRight: '5px', textAlign: 'right' }}>

                            <View style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'row', flex: '0 0 auto', width: '100%', gap: '10px', marginBottom: '2px', overflow: 'hidden', textAlign: 'right' }}>
                                <View style={{
                                    fontSize: '9px',
                                    fontWeight: 'bold',
                                    padding: '0px',
                                    color: '#000',
                                    marginRight: '-6px'
                                }}>
                                    <Text>Additional Hours:</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text>${data.AdditionalHours.toFixed(2)} Hours</Text>
                                </View>
                            </View>

                            <View style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'row', flex: '0 0 auto', width: '100%', gap: '10px', marginBottom: '2px', overflow: 'hidden', textAlign: 'right' }}>
                                <View style={{
                                    fontSize: '9px',
                                    fontWeight: 'bold',
                                    padding: '0px',
                                    color: '#000',
                                    marginRight: '0px'
                                }}>
                                    <Text>Program Hours:</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text>${data.WorkingHours.toFixed(2)} Hours</Text>
                                </View>
                            </View>

                            <View style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'row', flex: '0 0 auto', width: '100%', gap: '10px', marginBottom: '0px', overflow: 'hidden', textAlign: 'right' }}>
                                <View style={{
                                    fontSize: '9px',
                                    fontWeight: 'bold',
                                    padding: '0px',
                                    color: '#000',
                                    marginRight: '0px'
                                }}>
                                    <Text>Total Hours:</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text> ${(Number(data.WorkingHours) + Number(data.AdditionalHours)).toFixed(2)} Hours</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ScopeSignature