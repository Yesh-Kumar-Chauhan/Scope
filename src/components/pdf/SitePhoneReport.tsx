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

interface SitePhoneReportProps {
    data: any;
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

const SitePhoneReport: React.FC<SitePhoneReportProps> = ({ data }) => {
    const todayDate = moment().format('DD-MM-YYYY');
    useEffect(() => {
        if (data) {
            console.log('data for pdf', data);
        }
    }, [data]);

    if (!data) {
        return null;
    }
    const groupedData = groupByDistrict(data);
    return (
        <Document>
            <Page size="A4" style={styles.page} orientation="landscape">
                <View>
                    <div style={styles.section}>
                        <Text style={styles.header}>Site Phone</Text>
                    </div>
                    {Object.keys(groupedData).length > 0 ? (
                        Object.keys(groupedData).map((key: string, index: number) => {
                            const group = groupedData[key];
                            return (
                                <>
                                    <View style={styles.table}>
                                        <View style={styles.tableRow}>
                                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px' }}>
                                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                    <Text>{group.DIST_NAM}</Text>
                                                </View>
                                            </View>
                                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '15%', gap: '0px' }}>
                                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text>Phone</Text>
                                                </View>
                                            </View>

                                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '5%', gap: '0px', textAlign: 'center' }}>
                                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text>Type</Text>
                                                </View>
                                            </View>

                                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px', textAlign: 'center' }}>
                                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text>Email</Text>
                                                </View>
                                            </View>
                                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px', textAlign: 'center' }}>
                                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text>Site Directors / Head of Group</Text>
                                                </View>
                                            </View>
                                        </View>

                                        {group.items.map((data: any, subIndex: number) => (
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>{data?.SiteName}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '15%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>{data?.PHONE}</Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '5%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>{data?.PHONE_TYPE}</Text>
                                                    </View>
                                                </View>

                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '30%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>{data?.ScopeEmail}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px', textAlign: 'center' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>{data?.Directors}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                </>
                            );
                        })
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
        </Document >
    )
}
export default SitePhoneReport;