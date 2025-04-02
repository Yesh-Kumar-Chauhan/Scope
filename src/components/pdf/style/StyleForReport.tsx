import React from 'react'
import { StyleSheet, } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: '15px 30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        position: 'relative', 
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
        justifyContent: 'flex-start',
        alignSelf: 'stretch'
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
        color: '#474747',
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
export default styles;