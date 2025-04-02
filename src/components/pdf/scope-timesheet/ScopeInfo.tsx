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
    tableColSc: {
        padding: '0px',
        width: '350px'
    },
    staffHeadCol:
        { display: 'flex', alignItems: 'center', gap: '3px', flexDirection: 'row' },
    text: {
        marginBottom: 4,
    },
});

interface ScopeInfoProps {
    data: any;
}

const ScopeInfo: React.FC<ScopeInfoProps> = ({ data }) => {
    return (
        <View style={styles.table}>
            <View style={styles.tableRow}>
                <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '50%', gap: '10px', marginBottom: '8px' }}>
                    <View style={styles.tableColHeader}>
                        <Text>Name:</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text>{data?.FullName}</Text>
                    </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '50%', gap: '10px', marginBottom: '8px' }}>
                    <View style={styles.tableColHeader}>
                        <Text>Position:</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text>{data?.Position ? data?.Position : ''}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.tableRow}>
                <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '50%', gap: '10px', marginBottom: '8px' }}>
                    <View style={styles.tableColHeader}>
                        <Text>District:</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text>{data?.DistrictName ? data?.DistrictName : ''}</Text>
                    </View>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '50%', gap: '10px', marginBottom: '8px' }}>
                    <View style={styles.tableColHeader}>
                        <Text>Budget Code:</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text>{data?.DIST_NUM ? data?.DIST_NUM : ''}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.tableRow}>
                <View style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'row', flex: '0 0 auto', width: '50%', gap: '10px', marginBottom: '8px', overflow: 'hidden' }}>
                    <View style={styles.tableColHeader}>
                        <Text>Building:</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={{ width: '150px', borderBottomWidth: '1px', borderStyle: 'solid', borderColor: '#000' }}></Text>
                    </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '50%', gap: '10px', marginBottom: '0px', overflow: 'hidden' }}>
                    <View style={styles.tableColHeader}>
                        <Text>Program:</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text>{data?.SiteName ? data?.SiteName : ''}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.tableRow}>
                <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '50%', gap: '10px', marginBottom: '0px', overflow: 'hidden' }}>
                    <View style={styles.tableColHeader}>
                        <Text>Schedule:</Text>
                    </View>
                    <View style={[styles.tableCol, styles.tableColSc]}>
                        <Text>{data?.Schedule ? data?.Schedule : ''}</Text>
                    </View>
                </View>
            </View>

            {/* Continue Mapping Rows for Each Data Element as Needed */}
        </View>
    )
}

export default ScopeInfo