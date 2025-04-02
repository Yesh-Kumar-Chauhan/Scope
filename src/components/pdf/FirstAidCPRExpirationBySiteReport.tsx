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

interface FirstAidCPRExpirationBySiteReportProps {
    data: any;
}

const groupByDistrictAndSiteType = (data: any[]) => {
    return data.reduce((acc: any, item: any) => {
        const key = `${item.DIST_NAM}-${item.SITE_NAM}`;
        if (!acc[key]) {
            acc[key] = {
                DIST_NAM: item.DIST_NAM,
                SITE_NAM: item.SITE_NAM,
                items: []
            };
        }
        acc[key].items.push(item);
        return acc;
    }, {});
};

const FirstAidCPRExpirationBySiteReport: React.FC<FirstAidCPRExpirationBySiteReportProps> = ({ data }) => {
    const todayDate = moment().format('DD-MM-YYYY');useEffect(() => {
        if (data) {
            console.log('data for pdf', data);
        }
    }, [data]);

    if (!data) {
        return null;
    }
    const groupedData = groupByDistrictAndSiteType(data);
    let lastDistrictName = '';
    return (
        <Document>
            <Page size="A4" style={styles.page} orientation="landscape">
                <View>
                    <div style={styles.section}>
                        <Text style={styles.header}>First Aid/CPR Expiration by Site</Text>
                    </div>
                    {Object.keys(groupedData).length > 0 ? (
                        Object.keys(groupedData).map((key: string, index: number) => {
                            const group = groupedData[key];

                            // Check if DIST_NAM has changed
                            const shouldPrintDistrictName = lastDistrictName !== group.DIST_NAM;
                            if (shouldPrintDistrictName) {
                                lastDistrictName = group.DIST_NAM; 
                            }
                            return (
                                <>
                                    {shouldPrintDistrictName && (
                                        <View style={{ width: '100%' }}>
                                            <Text style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '5px' }}>{group.DIST_NAM}</Text>
                                        </View>
                                    )}
                                    <View style={{ width: '100%', paddingLeft: '10px' }}>
                                        <Text style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '5px' }}>{group?.SITE_NAM}</Text>
                                        <Text style={{ fontSize: '9px', fontWeight: 'bold', marginBottom: '5px' }}>Multi-Site Director:{data[0]?.Directors}</Text>
                                    </View>
                                    <View style={styles.table}>
                                        <View style={styles.tableRow}>
                                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '10%', gap: '0px' }}>
                                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                    <Text>First Aid</Text>
                                                </View>
                                            </View>
                                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '10%', gap: '0px' }}>
                                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                    <Text>CPR</Text>
                                                </View>
                                            </View>

                                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '10%', gap: '0px', textAlign: 'center' }}>
                                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                    <Text>Mat Training</Text>
                                                </View>
                                            </View>

                                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '10%', gap: '0px', textAlign: 'center' }}>
                                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text>Child Abuse</Text>
                                                </View>
                                            </View>
                                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '35%', gap: '0px', textAlign: 'center' }}>
                                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text>Name</Text>
                                                </View>
                                            </View>
                                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px', textAlign: 'center' }}>
                                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text>Position</Text>
                                                </View>
                                            </View>
                                        </View>
                                        {group.items.map((data: any, subIndex: number) => (
                                            <View key={subIndex}>
                                                <View style={styles.tableRow}>
                                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '10%', gap: '0px' }}>
                                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                            <Text>{data?.FIRSTAID ? moment(data?.FIRSTAID).format('YYYY-MM-DD') : ''}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '10%', gap: '0px' }}>
                                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                            <Text>{data?.CPR ? moment(data?.CPR).format('YYYY-MM-DD') : ''}</Text>
                                                        </View>
                                                    </View>

                                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '10%', gap: '0px', textAlign: 'center' }}>
                                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                            <Text>{data?.MATDATE ? moment(data?.MATDATE).format('YYYY-MM-DD') : ''}</Text>
                                                        </View>
                                                    </View>

                                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '10%', gap: '0px', textAlign: 'center' }}>
                                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <Text>{data?.MATAPP ? moment(data?.MATAPP).format('YYYY-MM-DD') : ''}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '35%', gap: '0px', textAlign: 'center' }}>
                                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                            <Text>{data?.FIRSTNAME} {data?.LASTNAME}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px', textAlign: 'center' }}>
                                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                            <Text>{data?.SitePos}</Text>
                                                        </View>
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
        </Document>
    )
}
export default FirstAidCPRExpirationBySiteReport