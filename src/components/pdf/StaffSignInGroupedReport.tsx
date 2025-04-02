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
interface StaffSignInGroupedReportProps {
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

const StaffSignInGroupedReport: React.FC<StaffSignInGroupedReportProps> = ({ data }) => {
    const todayDate = moment().format('DD-MM-YYYY');
    useEffect(() => {
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
                        <Text style={styles.header}>Staff Sign In</Text>
                    </div>
                    <View style={{ display: 'flex', flexDirection: 'row', width: '40%' }}>
                        <View style={{ width: '40%', flex: '0 0 auto' }}>

                        </View>
                        <View style={{ width: '60%', flex: '0 0 auto', display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                            <Text style={{ fontSize: '12px', color: '#000', marginTop: '2px', marginRight: '10px' }}>Today's Date:</Text>
                            <View style={{ width: '110px', height: '1px', backgroundColor: '#000' }}></View>
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
                                    {shouldPrintDistrictName && (
                                    <View style={{ display: 'flex', flexDirection: 'row', width: '40%', marginTop: '8px' }}>
                                        <View style={{ width: '100%', flex: '0 0 auto' }}>
                                            <Text style={{ fontSize: '14px', color: '#000', marginTop: '2px' }}>{group.DIST_NAM}</Text>
                                        </View>
                                    </View>
                                     )}
                                    <View style={{ display: 'flex', flexDirection: 'row', width: '40%', marginTop: '8px', paddingLeft: '10px' }}>
                                        <View style={{ width: '100%', flex: '0 0 auto' }}>
                                            <Text style={{ fontSize: '12px', color: '#000', marginTop: '2px' }}>{group.SITE_NAM}</Text>
                                        </View>
                                    </View>
                                    {group.items.map((data: any, subIndex: number) => (
                                        <View style={{ display: 'flex', flexDirection: 'row', width: '40%', paddingLeft: '10px', alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: '5px' }}>
                                            <View style={{ width: '50%', flex: '0 0 auto' }}>
                                                <Text style={{ fontSize: '10px', color: '#000', marginTop: '2px' }}>{data?.FIRSTNAME}, {data?.LASTNAME}</Text>
                                            </View>
                                            <View style={{ width: '50%', flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <View style={{ width: '110px', height: '1px', backgroundColor: '#000' }}></View>
                                            </View>
                                        </View>
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
export default StaffSignInGroupedReport