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
interface SiteAddressListForCCCReportProps {
    data: any;
}

const SiteAddressListForCCC: React.FC<SiteAddressListForCCCReportProps> = ({ data }) => {
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
                            return (
                                <>
                                    {group.items.map((data: any, subIndex: number) => (
                                        <View style={{ paddingLeft: '10px' }}>
                                            <Text style={{ fontSize: '15px', fontWeight: 'bold', color: '#000', marginBottom: '4px' }}>{data.COUNTY}</Text>
                                            <Text style={{ fontSize: '15px', fontWeight: 'bold', color: '#000', marginBottom: '10px' }}>{data.DIST_NAM}</Text>
                                            <Text style={{ fontSize: '12px', fontWeight: 'bold', color: '#000', textDecoration: 'underline' }}>{data.Type}</Text>
                                            <View style={{ display: 'flex', flexDirection: 'row', marginTop: '12px' }}>
                                                <Text style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', minWidth: '80px' }}>
                                                {data.PERMIT}
                                                </Text>
                                                <Text style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                                {data.SITE_NAM}
                                                </Text>
                                            </View>
                                            <Text style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', minWidth: '110px' }}>
                                            {data.ADDR1}
                                            </Text>
                                            <Text style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', minWidth: '110px' }}>
                                            {data.ADDR2}
                                            </Text>
                                            <Text style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', minWidth: '110px' }}>
                                            {data.ADDR3}
                                            </Text>
                                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                <Text style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', minWidth: '80px', marginRight: '10px' }}>
                                                    License Capacity:
                                                </Text>
                                                <Text style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', minWidth: '110px' }}>
                                                {data.CAPACTIY}
                                                </Text>
                                            </View>
                                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                <Text style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', width: '80px', textAlign: 'right', marginRight: '10px' }}>
                                                    Grade:
                                                </Text>
                                                <Text style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', minWidth: '110px' }}>
                                                {data.GRADE_LVLS}
                                                </Text>
                                            </View>
                                        </View>

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

export default SiteAddressListForCCC