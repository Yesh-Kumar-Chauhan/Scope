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
import ScopeTableHeader from './ScopeTableHeader';
import ScopeTableRows from './ScopeTableRows';
import ScopeTimesheetTotal from './ScopeTimesheetTotal';
import ScopeSignature from './ScopeSignature';
import moment from 'moment';

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
    pageNumber: {
        position: 'absolute',
        fontSize: 10,
        bottom: 10,
        left: 0,
        right: 0,
        textAlign: 'center',
    },
    dateText: {
        position: 'absolute',
        fontSize: 10,
        bottom: 10,
        textAlign: 'left',
        marginLeft:10,
    },
});

const ScopeTimeSheetReport: React.FC<ScopeTimeSheetReportProps> = ({ data }) => {
    const todayDate = moment().format('DD-MM-YYYY');
    useEffect(() => {
        if (data) {
            console.log('data for pdf', data);
            // downloadPDF(data)
            // setReportData(null)
        }
    }, [data]);

    if (!data) {
        return null;
    }

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header Section */}
                <Text style={styles.header}>SCOPE - Time Sheet</Text>

                {/* Site Info section*/}
                <ScopeInfo data={data?.scopeTimesheetData[0]} />

                <View style={styles.section} wrap={false}>
                    <Text style={styles.staffList}>Week# {data?.scopeTimesheetData[0]?.WeekNumber}</Text>
                </View>

                <View style={styles.section} wrap={false}>
                    <Text style={{
                        fontSize: '15px',
                        marginBottom: 3,
                        marginTop: 0,
                        textAlign: 'center',
                    }}>Program Hours</Text>
                    <Text style={{
                        fontSize: '10px',
                        marginBottom: 0,
                        marginTop: 0,
                        textAlign: 'center',
                    }}>Maximum Weekly Program Hours.</Text>
                </View>

                {/* Site Info Table */}
                <View style={styles.table}>
                    <ScopeTableHeader />
                    <ScopeTableRows data={data?.scopeTimesheetData} />
                </View>
                <ScopeTimesheetTotal data={data?.scopeTimesheetTotalData[0]} />
                <ScopeSignature data={data?.scopeTimesheetTotalData[0]} />
                <Text style={styles.dateText} fixed>{todayDate}</Text>
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed />
            </Page>
        </Document>
    )
}

export default memo(ScopeTimeSheetReport)