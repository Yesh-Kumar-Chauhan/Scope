import React, { memo, useEffect } from 'react';
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

interface SiteAssignmentReportProps {
    data: any;
}

const styles = StyleSheet.create({
    page: {
        padding: '15px 30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    section: {
        marginBottom: '11px',
        width: '100%',
        height: 'auto'
    },
    header: {
        fontSize: '18px',
        marginBottom: 0,
        textAlign: 'left',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: '#cdcdcd',
        paddingBottom: '0px',
        width: '100%'
    },
    staffList: {
        fontSize: '14px',
        marginBottom: 10,
        marginTop: 8,
        textAlign: 'left',
    },
    table: {
        // display: 'table',
        width: '100%',
        borderStyle: 'solid',
        borderBottomWidth: 0,
        borderColor: '#cdcdcd',
        paddingBottom: '11px',
        paddingTop: '0px',
        margin: 'auto',
        height: 'auto'
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
        alignItems: 'stretch',
        gap: '0px',
        marginBottom: '-1px',
        justifyContent: 'flex-start'
    },
    tableColHeader: {
        borderWidth: 0,
        fontSize: '13px',
        fontWeight: 'bold',
        padding: '0px',
        color: '#000',
        border: '0',
        verticalAlign: 'sub',
        minWidth: 'auto',
        flex: '0 0 auto'
    },
    tableColHeaderLic: {
        borderWidth: 0,
        fontSize: '13px',
        fontWeight: 'bold',
        padding: '0px',
        color: '#000',
        border: '0',
        verticalAlign: 'sub',
        minWidth: '100px',
        flex: '0 0 100px'
    },
    tableCol: {
        fontSize: '13px',
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

const SiteAssignmentReport: React.FC<SiteAssignmentReportProps> = ({data}) => {
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
                        <Text style={styles.header}>Sites Assignments</Text>
                    </div>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '33.33%', gap: '10px', marginBottom: '2px' }}>
                                <View style={styles.tableColHeader}>
                                    <Text>District:</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text>{data[0]?.DIST_NAM}</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '33.33%', gap: '10px', marginBottom: '2px' }}>
                                <View style={styles.tableColHeader}>
                                    <Text>Site:</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text>{data[0]?.SITE_NAM}</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', flex: '0 0 auto', width: '33.33%', gap: '10px', marginBottom: '2px' }}>
                                <View style={styles.tableColHeader}>
                                    <Text>Others</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text></Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text></Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>Name</Text>
                                </View>
                            </View>

                            <View style={{  flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>Phones</Text>
                                </View>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>Forms</Text>
                                </View>
                            </View>

                            <View style={{flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>E-mail</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '42px',  alignItems: 'flex-start', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>District Manager</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px' , padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.FieldSupervisorName}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>Fax  {data[0]?.FieldSupervisorFax}</Text>
                                    <Text>Cell {data[0]?.FieldSupervisorPhone}</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                        <View style={{ width: '50%', flex: '0 0 auto', textAlign: 'left' }}>
                                            <Text>Other {data[0]?.FieldSupervisorOthers}</Text>
                                        </View>
                                        <View style={{ width: '50%', flex: '0 0 auto', textAlign: 'left' }}>
                                            <Text>Ext {data[0]?.FieldSupervisorExt}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.FieldSupervisorForms}</Text>
                                </View>
                            </View>

                            <View style={{  flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', textAlign: 'center' , padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.FieldSupervisorEmail}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>Field Trainer</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.FieldTrainerName}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>Fax  {data[0]?.FieldTrainerFax}</Text>
                                    <Text>Cell  {data[0]?.FieldTrainerPhone}</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                        <View style={{ width: '50%', flex: '0 0 auto', textAlign: 'left' }}>
                                            <Text>Other  {data[0]?.FieldTrainerOthers}</Text>
                                        </View>
                                        <View style={{ width: '50%', flex: '0 0 auto', textAlign: 'left' }}>
                                            <Text>Ext  {data[0]?.FieldTrainerExt}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{  flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.FieldTrainerForms}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.FieldTrainerEmail}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>Registar</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.RegistarName}</Text>
                                </View>
                            </View>

                            <View style={{  flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>Fax  {data[0]?.RegistarFax}</Text>
                                    <Text>Cell  {data[0]?.RegistarPhone}</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                        <View style={{ width: '50%', flex: '0 0 auto', textAlign: 'left' }}>
                                            <Text>Other  {data[0]?.RegistarOthers}</Text>
                                        </View>
                                        <View style={{ width: '50%', flex: '0 0 auto', textAlign: 'left' }}>
                                            <Text>Ext  {data[0]?.RegistarExt}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.RegistarForms}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.RegistarEmail}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px' , padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center'}}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>Account Billing Clerk</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center'  }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000'}}>
                                    <Text>{data[0]?.AccountBillingName}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>Fax  {data[0]?.AccountBillingFax}</Text>
                                    <Text>Cell  {data[0]?.AccountBillingPhone}</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                        <View style={{ width: '50%', flex: '0 0 auto', textAlign: 'left' }}>
                                            <Text>Other  {data[0]?.AccountBillingOthers}</Text>
                                        </View>
                                        <View style={{ width: '50%', flex: '0 0 auto', textAlign: 'left' }}>
                                            <Text>Ext  {data[0]?.AccountBillingExt}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.AccountBillingForms}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.AccountBillingEmail}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>Timesheet Staffing</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.StaffingAssistantName}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>Fax  {data[0]?.StaffingAssistantFax}</Text>
                                    <Text>Cell  {data[0]?.StaffingAssistantPhone}</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                        <View style={{ width: '50%', flex: '0 0 auto', textAlign: 'left' }}>
                                            <Text>Other  {data[0]?.StaffingAssistantOthers}</Text>
                                        </View>
                                        <View style={{ width: '50%', flex: '0 0 auto', textAlign: 'left' }}>
                                            <Text>Ext  {data[0]?.StaffingAssistantExt}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{  flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.StaffingAssistantForms}</Text>
                                </View>
                            </View>

                            <View style={{  flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.StaffingAssistantEmail}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={{flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>Absences Substitutes</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.SubstitutesName}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>Fax  {data[0]?.SubstitutesFax}</Text>
                                    <Text>Cell  {data[0]?.SubstitutesPhone}</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                        <View style={{ width: '50%', flex: '0 0 auto', textAlign: 'left' }}>
                                            <Text>Other  {data[0]?.SubstitutesOthers}</Text>
                                        </View>
                                        <View style={{ width: '50%', flex: '0 0 auto', textAlign: 'left' }}>
                                            <Text>Ext  {data[0]?.SubstitutesExt}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{  flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.SubstitutesForms}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.SubstitutesEmail}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>SCOPE HHC</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center'  }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000'}}>
                                    <Text>{data[0]?.HealthCareConsultantName}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>Fax  {data[0]?.HealthCareConsultantFax}</Text>
                                    <Text>Cell  {data[0]?.HealthCareConsultantPhone}</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                        <View style={{ width: '50%', flex: '0 0 auto', textAlign: 'left' }}>
                                            <Text>Other  {data[0]?.HealthCareConsultantOthers}</Text>
                                        </View>
                                        <View style={{ width: '50%', flex: '0 0 auto', textAlign: 'left' }}>
                                            <Text>Ext  {data[0]?.HealthCareConsultantExt}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.HealthCareConsultantForms}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.HealthCareConsultantEmail}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>Food</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.FoodContactName}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>Fax  {data[0]?.FoodContactFax}</Text>
                                    <Text>Cell  {data[0]?.FoodContactPhone}</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                        <View style={{ width: '50%', flex: '0 0 auto', textAlign: 'left' }}>
                                            <Text>Other  {data[0]?.FoodContactOthers}</Text>
                                        </View>
                                        <View style={{ width: '50%', flex: '0 0 auto', textAlign: 'left' }}>
                                            <Text>Ext  {data[0]?.FoodContactExt}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.FoodContactForms}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.FoodContactEmail}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>Supply Contact</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.SupplyContactName}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>Fax  {data[0]?.SupplyContactFax}</Text>
                                    <Text>Cell  {data[0]?.SupplyContactPhone}</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                        <View style={{ width: '50%', flex: '0 0 auto', textAlign: 'left' }}>
                                            <Text>Other  {data[0]?.SupplyContactOthers}</Text>
                                        </View>
                                        <View style={{ width: '50%', flex: '0 0 auto', textAlign: 'left' }}>
                                            <Text>Ext  {data[0]?.SupplyContactExt}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.SupplyContactForms}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.SupplyContactEmail}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>Special Event Contact</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.PettyCashSpecialEventContactName}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>Fax  {data[0]?.PettyCashSpecialEventContactFax}</Text>
                                    <Text>Cell  {data[0]?.PettyCashSpecialEventContactPhone}</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                        <View style={{ width: '50%', flex: '0 0 auto', textAlign: 'left' }}>
                                            <Text>Other  {data[0]?.PettyCashSpecialEventContactOthers}</Text>
                                        </View>
                                        <View style={{ width: '50%', flex: '0 0 auto', textAlign: 'left' }}>
                                            <Text>Ext  {data[0]?.PettyCashSpecialEventContactExt}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.PettyCashSpecialEventContactForms}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.PettyCashSpecialEventContactEmail}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>SCOPE DSS</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.SCOPEDSSName}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>Fax  {data[0]?.SCOPEDSSFax}</Text>
                                    <Text>Cell  {data[0]?.SCOPEDSSPhone}</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                        <View style={{ width: '50%', flex: '0 0 auto', textAlign: 'left' }}>
                                            <Text>Other  {data[0]?.SCOPEDSSOthers}</Text>
                                        </View>
                                        <View style={{ width: '50%', flex: '0 0 auto', textAlign: 'left' }}>
                                            <Text>Ext  {data[0]?.SCOPEDSSExt}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.SCOPEDSSForms}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.SCOPEDSSEmail}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>Presenters/Photo IDs</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.PresentersName}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>Fax  {data[0]?.PresentersFax}</Text>
                                    <Text>Cell  {data[0]?.PresentersPhone}</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                        <View style={{ width: '50%', flex: '0 0 auto', textAlign: 'left' }}>
                                            <Text>Other  {data[0]?.PresentersOthers}</Text>
                                        </View>
                                        <View style={{ width: '50%', flex: '0 0 auto', textAlign: 'left' }}>
                                            <Text>Ext  {data[0]?.PresentersExt}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center'  }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000'}}>
                                    <Text>{data[0]?.PresentersForms}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '17.5%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>
                                    <Text>{data[0]?.PresentersEmail}</Text>
                                </View>
                            </View>
                        </View>


                    </View>
                </View>
                <Text style={styles.dateText} fixed>{todayDate}</Text>
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `Page ${pageNumber} of ${totalPages}`
                )} fixed />
            </Page>
        </Document >
    );
}
export default memo(SiteAssignmentReport);