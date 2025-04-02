import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import moment from 'moment';

interface ScopeTableRowsProps {
    data: any[];
}

const styles = StyleSheet.create({
    tableRow: {
        flexDirection: 'row',
        width: '100%',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        marginBottom: 0,
        borderTopWidth: 1,
        marginTop: -1
    },
    tableCell: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3px',
        fontSize: '6px',
        fontWeight: 'bold',
        color: '#000',
        borderStyle: 'solid',
        borderColor: '#000',
        borderBottomWidth: 1,
        minHeight: '20px',
        textAlign: 'center',
    },
    wideCell: {
        flex: '0 0 90%',
        borderRightWidth: '1px',
    },
    normalCell: {
        flex: '0 0 7.5%',
        borderRightWidth: '1px',
    },
    firstCell: {
        flex: '0 0 10%',
        borderRightWidth: '1px',
        borderLeftWidth: '1px',
    },
});

const ScopeTableRows: React.FC<ScopeTableRowsProps> = ({ data }) => {

    const row = data[0]; // Access only the first item

    if (!row) return null; // Handle the case if there's no data

    return (
        <View>
            {/* First Row */}
            <View style={styles.tableRow} wrap={false}>
                <View style={[styles.tableCell, styles.firstCell]}>
                    <Text>{row.SiteName}</Text>
                </View>

                <View style={[styles.tableCell, styles.normalCell]}>
                    <Text>{moment(row.TimeSheetDate).format("YYYY-MM-DD")}</Text>
                </View>
                <View style={[styles.tableCell, styles.normalCell]}>
                    <Text>{row.TimeIn ? moment(row.TimeIn, "HH:mm:ss").format("h:mm a") : ''}</Text>
                </View>
                <View style={[styles.tableCell, styles.normalCell]}>
                    <Text>{row.ClockInLocal ? moment(row.ClockInLocal).format("YYYY-MM-DD") : ''}</Text>
                </View>
                <View style={[styles.tableCell, styles.normalCell]}>
                    <Text>{row.TimeOut ? moment(row.TimeOut, "HH:mm:ss").format("h:mm a") : ''}</Text>
                </View>
                <View style={[styles.tableCell, styles.normalCell]}>
                    <Text>{row.ClockOutLocal ? moment(row.ClockOutLocal).format("YYYY-MM-DD") : ''}</Text>
                </View>
                <View style={[styles.tableCell, styles.normalCell]}>
                    <Text>{row.LunchIn ? moment(row.LunchIn, "HH:mm:ss").format("h:mm a") : ''}</Text>
                </View>
                <View style={[styles.tableCell, styles.normalCell]}>
                    <Text>{row.LunchOut ? moment(row.LunchOut, "HH:mm:ss").format("h:mm a") : ''}</Text>
                </View>
                <View style={[styles.tableCell, styles.normalCell]}>
                    <Text>{row.AdditionalStart ? moment(row.AdditionalStart, "HH:mm:ss").format("h:mm a") : ''}</Text>
                </View>
                <View style={[styles.tableCell, styles.normalCell]}>
                    <Text>{row.AdditionalStop ? moment(row.AdditionalStop, "HH:mm:ss").format("h:mm a") : ''}</Text>
                </View>
                <View style={[styles.tableCell, styles.normalCell]}>
                    <Text></Text>
                </View>
                <View style={[styles.tableCell, styles.normalCell]}>
                    <Text></Text>
                </View>
                <View style={[styles.tableCell, styles.normalCell]}>
                    <Text>{row.WorkingHours ? row.WorkingHours.toFixed(2) : ''}</Text>
                </View>
            </View>

            {/* Second Row */}
            <View style={styles.tableRow} wrap={false}>
                <View style={[styles.tableCell, styles.firstCell]}>
                    <Text>{row.NotesHeader ? row.NotesHeader : ''}</Text>
                </View>
                <View style={[styles.tableCell, styles.wideCell, { alignItems: 'flex-start' }]}>
                    <Text>{row.NotesDetails ? row.NotesDetails : ''}</Text>
                </View>
            </View>
        </View>
    );
};

export default ScopeTableRows;
