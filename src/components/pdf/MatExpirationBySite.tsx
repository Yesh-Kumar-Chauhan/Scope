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
interface MatExpirationBySiteProps {
    data: any;
}

const groupByDistrictSiteTypeAndSiteName = (data: any[]) => {
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


const MatExpirationBySite: React.FC<MatExpirationBySiteProps> = ({ data }) => {
    const todayDate = moment().format('DD-MM-YYYY');
    useEffect(() => {
        if (data) {
            console.log('data for pdf', data);
        }
    }, [data]);

    if (!data) {
        return null;
    }
    const groupedData = groupByDistrictSiteTypeAndSiteName(data);
    let lastDistrictName = '';
    return (
        <Document>
            <Page size="A4" style={styles.page} orientation="landscape">
                <View>
                    <div style={styles.section}>
                        <Text style={styles.header}>Mat Expiration by Site</Text>
                    </div>

                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text>Mat Start</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '1px', borderTopWidth: '0', borderLeftWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text>Mat Expire</Text>
                                </View>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px', textAlign: 'center' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '1px', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text>Name</Text>
                                </View>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '50%', gap: '0px', textAlign: 'center' }}>
                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '1px', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text>Position</Text>
                                </View>
                            </View>
                        </View>
                        {Object.keys(groupedData).length > 0 ? (
                            Object.keys(groupedData).map((key: string, index: number) => {
                                const group = groupedData[key];

                                // Check if DIST_NAM has changed
                                const shouldPrintDistrictName = lastDistrictName !== group.DIST_NAM;
                                if (shouldPrintDistrictName) {
                                    lastDistrictName = group.DIST_NAM; // Update last printed DIST_NAM
                                }
                                return (
                                    <>
                                        {/* <View style={styles.tableRow}> */}
                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '100%', gap: '0px' }}>
                                            {shouldPrintDistrictName && (
                                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                    <Text>{group.DIST_NAM}</Text>
                                                </View>
                                            )}
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '100%', gap: '0px' }}>
                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>

                                                <View style={{ paddingLeft: '10px' }}>
                                                    <Text>{group?.SITE_NAM}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        {group.items.map((data: any, subIndex: number) => (
                                            <View key={subIndex}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '100%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <View style={{ paddingLeft: '10px' }}>
                                                            <Text>Multi-Site Director:{data?.Directors}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px' }}>
                                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                            <Text>{data?.MatStart ? moment(data?.MatStart).format('YYYY-MM-DD') : ''}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px' }}>
                                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '1px', borderTopWidth: '0', borderLeftWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                            <Text>{data?.MATDATE ? moment(data?.MATDATE).format('YYYY-MM-DD') : ''}</Text>
                                                        </View>
                                                    </View>

                                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px', textAlign: 'center' }}>
                                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '1px', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                            <Text>{data?.FIRSTNAME}, {data?.LASTNAME}</Text>
                                                        </View>
                                                    </View>

                                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '50%', gap: '0px', textAlign: 'center' }}>
                                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '1px', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                            <Text>{data?.SitePos}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        ))}
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

                    </View>
                </View>
                <Text style={styles.dateText} fixed>{todayDate}</Text>
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `Page ${pageNumber} of ${totalPages}`
                )} fixed />
            </Page>
        </Document>
    )
}
export default MatExpirationBySite