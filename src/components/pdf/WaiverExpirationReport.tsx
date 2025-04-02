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
interface WaiverExpirationReportProps {
    data: any;
}

const groupByWaiver = (data: any[]) => {
    return data.reduce((acc: any, item: any) => {
        const key = `${item.WAIVEREXP}`;
        if (!acc[key]) {
            acc[key] = {
                WAIVEREXP: item.WAIVEREXP,
                items: []
            };
        }
        acc[key].items.push(item);
        return acc;
    }, {});
};

const WaiverExpirationReport: React.FC<WaiverExpirationReportProps> = ({ data }) => {
    const todayDate = moment().format('DD-MM-YYYY');
    useEffect(() => {
        if (data) {
            console.log('data for pdf', data);
        }
    }, [data]);

    if (!data) {
        return null;
    }
    const groupedData = groupByWaiver(data);

    return (
        <Document>
            <Page size="A4" style={styles.page} orientation="portrait">
                <View>
                    <div style={styles.section}>
                        <Text style={styles.header}>Waiver Expiration</Text>
                    </div>
                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', paddingLeft: '10px', alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: '0px' }}>
                        <View style={{ width: '50%', flex: '0 0 auto' }}>
                            <Text style={{ fontSize: '9px', color: '#000', marginTop: '2px' }}>District NumberDistrict Name</Text>
                        </View>
                        <View style={{ width: '50%', flex: '0 0 auto', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Text style={{ fontSize: '9px', color: '#000', marginTop: '2px' }}>Site Number Site Name</Text>
                        </View>
                    </View>

                    {Object.keys(groupedData).length > 0 ? (
                        Object.keys(groupedData).map((key: string, index: number) => {
                            const group = groupedData[key];
                            return (
                                <>
                                    <View style={{ display: 'flex', flexDirection: 'row', width: '40%', marginTop: '3px', paddingLeft: '0' }}>
                                        <View style={{ width: '100%', flex: '0 0 auto' }}>
                                            <Text style={{ fontSize: '12px', color: '#000', marginTop: '2px' }}>{group?.WAIVEREXP? moment(group?.WAIVEREXP).format('YYYY-MM-DD') : ''}</Text>
                                        </View>
                                    </View>
                                    {group.items.map((data: any, subIndex: number) => (
                                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', paddingLeft: '10px', alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: '5px' }}>
                                            <View style={{ width: '50%', flex: '0 0 auto' }}>
                                                <Text style={{ fontSize: '9px', color: '#000', marginTop: '2px' }}> {data?.DIST_NUM} {data?.DIST_NAM}</Text>
                                            </View>
                                            <View style={{ width: '50%', flex: '0 0 auto', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                <Text style={{ fontSize: '9px', color: '#000', marginTop: '2px' }}> {data?.SITE_NUM} {data?.SITE_NAM}</Text>
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
export default WaiverExpirationReport