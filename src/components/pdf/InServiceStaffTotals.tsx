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
import styles from './style/StyleForReport';
interface InServiceStaffTotalsPdfProps {
    data: any;
    // setReportData: (data: any) => void;
}

const groupByDistrict = (data: any[]) => {
    return data.reduce((acc: any, item: any) => {
        const key = `${item.DIST_NAM}`;
        if (!acc[key]) {
            acc[key] = {
                DIST_NAM: item.DIST_NAM,
                items: []
            };
        }
        acc[key].items.push(item);
        return acc;
    }, {});
};

const InServiceStaffTotals: React.FC<InServiceStaffTotalsPdfProps> = ({ data }) => {
    const todayDate = moment().format('DD-MM-YYYY');
    useEffect(() => {
        if (data) {
            console.log('data for pdf', data);
        }
    }, [data]);


    if (!data) {
        return null; // Return early if data is null or undefined
    }

    const groupedData = groupByDistrict(data);

    return (
        <Document>
            <Page size="A4" style={styles.page} orientation="landscape">
                <View>
                    <div style={styles.section}>
                        <Text style={styles.header}>Inservice Staff Totals</Text>
                    </div>
                    {Object.keys(groupedData).length > 0 ? (
                        Object.keys(groupedData).map((key: string, index: number) => {
                            const group = groupedData[key];
                            return (
                                <>
                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '100%', gap: '0px' }}>
                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text>{group.DIST_NAM}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.table}>
                                        <View style={styles.tableRow}>
                                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '20%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                    <Text>Name</Text>
                                                </View>
                                            </View>
                                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text>Title</Text>
                                                </View>
                                            </View>
                                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '10%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text>From</Text>
                                                </View>
                                            </View>
                                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '10%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text>To</Text>
                                                </View>
                                            </View>
                                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '15%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text>Total Inservice Hours</Text>
                                                </View>
                                            </View>
                                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '20%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text>Topics</Text>
                                                </View>
                                            </View>
                                        </View>
                                        {group.items.map((x: any, subIndex: number) => (
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '20%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>{x.FIRSTNAME} {x.LASTNAME}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>{x.SitePos}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '10%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>{x.FromDate ? moment(x.FromDate).format('YYYY-MM-DD') : ''}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '10%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>{x.ToDate ? moment(x.ToDate).format('YYYY-MM-DD') : ''}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '15%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>{x.TotalInserviceHours}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '20%', gap: '0px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>{x.Topics}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                </>
                                // </View>
                            );
                        })
                    ) : (
                        <Page size="A4" style={styles.page}>
                            <View style={styles.section}>
                                <Text>No data available</Text>
                            </View>
                        </Page>
                    )}
                </View >
                <Text style={styles.dateText} fixed>{todayDate}</Text>
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `Page ${pageNumber} of ${totalPages}`
                )} fixed />
            </Page>
        </Document>
    );
};

export default memo(InServiceStaffTotals);
