import React from 'react'
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
interface SiteAddressListProps {
    data: any;
    // setReportData: (data: any) => void;
}

const SiteAddressList: React.FC<SiteAddressListProps> = ({ data }) => {
    const todayDate = moment().format('DD-MM-YYYY');
    const groupByDistrictSiteTypeAndSiteName = (data: any[]) => {
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
    const groupedData = groupByDistrictSiteTypeAndSiteName(data);
    return (
        <Document>
            <Page size="A4" style={styles.page} orientation="landscape">
                <View>
                    <div style={styles.section}>
                        <Text style={styles.header}>Site Address List</Text>
                    </div>
                    {Object.keys(groupedData).length > 0 ? (
                        Object.keys(groupedData).map((key: string, index: number) => {
                            const group = groupedData[key];
                            return (<>
                                {group.items.map((data: any, subIndex: number) => (
                                    <>
                                        <View style={{ paddingLeft: '5px' }}>
                                            <Text style={{ fontSize: '15px', fontWeight: 'normal', marginBottom: '3px' }}>{data.COUNTY}</Text>
                                        </View>
                                        <View style={{ paddingLeft: '5px' }}>
                                            <Text style={{ fontSize: '15px', fontWeight: 'normal' }}>{data.DIST_NAM}</Text>
                                        </View>
                                        <View style={{ paddingLeft: '10px', marginTop: '10px' }}>
                                            <Text style={{ fontSize: '13px', fontWeight: 'normal', marginBottom: '3px', textDecoration: 'underline' }}>{data.type}</Text>
                                        </View>
                                        <View style={{ paddingLeft: '15px', marginTop: '5px' }}>
                                            <Text style={{ fontSize: '10px', fontWeight: 'normal', marginBottom: '3px' }}>{data.SITE_NUM} {data.SITE_NAM}
                                            </Text>
                                            <Text style={{ fontSize: '10px', fontWeight: 'normal', marginBottom: '3px' }}>{data.ADDR1}</Text>
                                            <Text style={{ fontSize: '10px', fontWeight: 'normal', marginBottom: '3px' }}>{data.ADDR2}</Text>
                                            <Text style={{ fontSize: '10px', fontWeight: 'normal', marginBottom: '3px' }}>{data.ADDR3}</Text>
                                            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                                                <Text style={{ fontSize: '10px', fontWeight: 'normal', marginBottom: '3px', minWidth: '85px' }}>
                                                    School phone:
                                                </Text>
                                                <Text style={{ fontSize: '10px', fontWeight: 'normal', marginBottom: '3px' }}>
                                                    {data.SCHFONE}
                                                </Text>
                                            </View>
                                            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                                                <Text style={{ fontSize: '10px', fontWeight: 'normal', marginBottom: '3px', minWidth: '85px' }}>
                                                    Program phone:
                                                </Text>
                                                <Text style={{ fontSize: '10px', fontWeight: 'normal', marginBottom: '3px' }}>
                                                    {data.PHONE}
                                                </Text>
                                            </View>
                                            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                                                <Text style={{ fontSize: '10px', fontWeight: 'normal', marginBottom: '3px', minWidth: '85px' }}>
                                                    Start time:
                                                </Text>
                                                <Text style={{ fontSize: '10px', fontWeight: 'normal', marginBottom: '3px' }}>
                                                    {data.START_TIME}
                                                </Text>
                                            </View>
                                        </View>
                                    </>
                                ))
                                }
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

export default SiteAddressList