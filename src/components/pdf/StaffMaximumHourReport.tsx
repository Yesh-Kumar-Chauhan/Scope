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
interface StaffMaximumHourReportProps {
    data: any;
}
const groupByDistrictSiteTypeAndSiteName = (data: any[]) => {
    return data.reduce((acc: any, item: any) => {
        const key = `${item.DIST_NAM}-${item.SiteType}-${item.SITE_NAM}`;
        if (!acc[key]) {
            acc[key] = {
                DIST_NAM: item.DIST_NAM,
                SiteType: item.SiteType,
                SITE_NAM: item.SITE_NAM,
                items: []
            };
        }
        acc[key].items.push(item);
        return acc;
    }, {});
};

const getSiteTypeLabel = (siteType: number) => {
    switch (siteType) {
        case 1: return "Before School Programs";
        case 2: return "During School Programs";
        case 3: return "After School Programs";
        default: return "";
    }
};
const StaffMaximumHourReport: React.FC<StaffMaximumHourReportProps> = ({ data }) => {
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
    let lastSiteType = -1;
    return (
        <Document>
            <Page size="A4" style={styles.page} orientation="landscape">
                <View>
                    <div style={styles.section}>
                        <Text style={styles.header}>Staff Maximum Hours</Text>
                    </div>
                    {Object.keys(groupedData).length > 0 ? (
                        Object.keys(groupedData).map((key: string, index: number) => {
                            const group = groupedData[key];

                            // Check if DIST_NAM has changed
                            const shouldPrintDistrictName = lastDistrictName !== group.DIST_NAM;
                            if (shouldPrintDistrictName) {
                                lastDistrictName = group.DIST_NAM; // Update last printed DIST_NAM
                            }
                            const shouldPrintSiteType = lastSiteType !== group.SiteType;
                            if (shouldPrintSiteType) {
                                lastSiteType = group.SiteType;
                            }
                            return (
                                <>
                                    <View style={{ marginBottom: '0px', marginTop: '0px' }}>
                                        {shouldPrintDistrictName && (
                                            <Text style={{ fontSize: '12px', color: '#000', marginBottom: '2px' }}>{group.DIST_NAM}</Text>
                                        )}
                                        {shouldPrintSiteType && (
                                            <Text style={{ fontSize: '12px', color: '#000' }}>{getSiteTypeLabel(group.SiteType)}</Text>
                                        )}
                                    </View>

                                    <View style={{ display: 'flex', flexDirection: 'row', width: '40%', paddingLeft: '10px' }}>
                                        <View style={{ width: '50%', flex: '0 0 auto' }}>
                                            <Text style={{ fontSize: '12px', color: '#000', marginTop: '2px' }}>{group?.SITE_NAM}</Text>
                                        </View>
                                        <View style={{ width: '50%', flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontSize: '12px', color: '#000', marginTop: '2px' }}>Max</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', width: '40%', paddingLeft: '10px' }}>
                                        <View style={{ width: '100%', flex: '0 0 auto' }}>
                                            <Text style={{ fontSize: '11px', color: '#000', marginTop: '2px' }}>Multi-Site Director:{data[0]?.Directors}</Text>
                                        </View>
                                    </View>
                                    {group.items.map((data: any, subIndex: number) => (
                                        <>
                                            <View style={{ display: 'flex', flexDirection: 'row', width: '40%', paddingLeft: '10px' }}>
                                                <View style={{ width: '50%', flex: '0 0 auto' }}>
                                                    <Text style={{ fontSize: '11px', color: '#000', marginTop: '2px' }}>{data?.FIRSTNAME} {data?.LASTNAME}</Text>
                                                </View>
                                                <View style={{ width: '50%', flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text style={{ fontSize: '11px', color: '#000', marginTop: '2px' }}>{data?.MaxHours}</Text>
                                                </View>
                                            </View>
                                        </>
                                    ))}
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
export default StaffMaximumHourReport