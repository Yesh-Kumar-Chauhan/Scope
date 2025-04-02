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

interface SiteSpaceProps {
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

const SiteSpace: React.FC<SiteSpaceProps> = ({ data }) => {
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
            <Page size="A4" style={styles.page} orientation="portrait">
                <View>
                    <div style={styles.section}>
                        <Text style={styles.header}>Site Space</Text>
                    </div>
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
                                    {shouldPrintDistrictName && (
                                        <View style={{ paddingLeft: '5px' }}>
                                            <Text style={{ fontSize: '10px', fontWeight: 'normal', marginBottom: '3px' }}>{group.DIST_NAM}</Text>
                                        </View>
                                    )}
                                    <View style={{ paddingLeft: '10px', borderStyle: 'solid', borderColor: '#000', borderBottomWidth: '1px' }}>
                                        <Text style={{ fontSize: '10px', fontWeight: 'normal', marginBottom: '0px' }}>{group.SITE_NAM}</Text>
                                        <View style={{
                                            width: '100%',
                                            borderStyle: 'solid',
                                            borderBottomWidth: 0,
                                            borderColor: '#cdcdcd',
                                            paddingBottom: '3px',
                                            paddingTop: '0px',
                                            margin: 'auto',
                                            height: 'auto'
                                        }}>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '35%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>Location</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '15%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>Capacity</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '35%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>Additional Location</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '15%', gap: '0px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text>Capacity</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            {group.items.map((data: any, subIndex: number) => (
                                                <>
                                                    <View style={styles.tableRow}>
                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '35%', gap: '0px' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                <Text>{data?.ROOM_NO}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '15%', gap: '0px' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                <Text>{data?.CAP1}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '35%', gap: '0px' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                <Text>{data?.ADDLOC}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '15%', gap: '0px' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                <Text>{data?.ASCAP1}</Text>
                                                            </View>
                                                        </View>
                                                    </View>

                                                    <View style={styles.tableRow}>
                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '35%', gap: '0px' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                <Text>{data?.ROOM_NO2}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '15%', gap: '0px' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                <Text>{data?.CAP2}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '35%', gap: '0px' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                <Text>{data?.ADDLOC2}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '15%', gap: '0px' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                <Text>{data?.ASCAP2}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View style={styles.tableRow}>
                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '35%', gap: '0px' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                <Text>{data?.ROOM_NO3}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '15%', gap: '0px' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                <Text>{data?.CAP3}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '35%', gap: '0px' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                <Text>{data?.ADDLOC3}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '15%', gap: '0px' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                <Text>{data?.ASCAP3}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View style={styles.tableRow}>
                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '35%', gap: '0px' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                <Text>{data?.ROOM_NO4}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '15%', gap: '0px' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                <Text>{data?.CAP4}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '35%', gap: '0px' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                <Text>{data?.ADDLOC4}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '15%', gap: '0px' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                <Text>{data?.ASCAP4}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </> 
                                            ))}
                                        </View>
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
                </View >
                <Text style={styles.dateText} fixed>{todayDate}</Text>
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `Page ${pageNumber} of ${totalPages}`
                )} fixed />
            </Page >
        </Document >
    )
}
export default SiteSpace