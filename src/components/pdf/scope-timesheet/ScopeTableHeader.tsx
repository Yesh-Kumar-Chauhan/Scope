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
import ScopeInfo from './ScopeInfo';

interface ScopeTimeSheetReportProps {
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

const ScopeTableHeader = () => {
    return (
        <View style={styles.tableRow}>
            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '10%', gap: '0px' }}>
                <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Program</Text>
                </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '7.5%', gap: '0px', textAlign: 'center' }}>
                <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Date</Text>
                </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '7.5%', gap: '0px', textAlign: 'center' }}>
                <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Clock In</Text>
                </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '7.5%', gap: '0px', textAlign: 'center' }}>
                <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Text>System In</Text>
                </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '7.5%', gap: '0px', textAlign: 'center' }}>
                <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Clock Out</Text>
                </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '7.5%', gap: '0px', textAlign: 'center' }}>
                <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Text>System Out</Text>
                </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '15%', gap: '0px', textAlign: 'center', }}>
                <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '1px 3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Text>If Applicable</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '100%', gap: '0px', textAlign: 'center' }}>
                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', flex: '0 0 auto', width: '50%', padding: '1px 3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Text>Lunch In</Text>
                    </View>

                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '1px 3px', flex: '0 0 auto', width: '50%', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Text>Lunch Out</Text>
                    </View>
                </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '15%', gap: '0px', textAlign: 'center', }}>
                <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '1px 3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Additional Hour</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '100%', gap: '0px', textAlign: 'center' }}>
                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', flex: '0 0 auto', width: '50%', padding: '1px 3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Text>Start</Text>
                    </View>

                    <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '1px 3px', flex: '0 0 auto', width: '50%', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Text>End</Text>
                    </View>
                </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '7.5%', gap: '0px', textAlign: 'center' }}>
                <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Explanation</Text>
                </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '7.5%', gap: '0px', textAlign: 'center' }}>
                <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Code</Text>
                </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '7.5%', gap: '0px', textAlign: 'center' }}>
                <View style={{ fontSize: '6px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Hours</Text>
                </View>
            </View>
        </View >
    )
}

export default ScopeTableHeader