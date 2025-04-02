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

interface StaffScheduleBlankReportProps {
    data: any;
}
const groupByDistrictSiteTypeAndSiteName = (data: any[]) => {
    return data.reduce((acc: any, item: any) => {
        const districtKey = `${item.DIST_NAM}-${item.SiteType}`;
        if (!acc[districtKey]) {
            acc[districtKey] = {
                DIST_NAM: item.DIST_NAM,
                SiteType: item.SiteType,
                sites: {}
            };
        }

        const siteKey = item.SiteName;
        if (!acc[districtKey].sites[siteKey]) {
            acc[districtKey].sites[siteKey] = {
                SiteName: item.SiteName,
                items: []
            };
        }

        acc[districtKey].sites[siteKey].items.push(item);
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
const StaffScheduleBlankReport: React.FC<StaffScheduleBlankReportProps> = ({ data }) => {
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
            <Page size="A4" style={styles.page} orientation="portrait">
                <View>
                    <div style={styles.section}>
                        <Text style={styles.header}>Staff Schedule</Text>
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
                                <View key={index}>
                                    {shouldPrintDistrictName && (
                                        <View style={{ width: '100%' }}>
                                            <Text style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '5px' }}>{group.DIST_NAM}</Text>
                                        </View>
                                    )}
                                    {shouldPrintSiteType && (
                                        <View style={{ width: '100%' }}>
                                            <Text style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '5px' }}>{getSiteTypeLabel(group.SiteType)}</Text>
                                        </View>
                                    )}
                                    {Object.keys(group.sites).map((siteKey: string, siteIndex: number) => {
                                        const siteGroup = group.sites[siteKey];
                                        return (
                                            <View style={{ width: '100%', paddingLeft: '10px' }}>
                                                <View style={styles.table}>
                                                    <View style={styles.tableRow} wrap={false}>
                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '20%', gap: '0px' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                                <Text>{siteGroup.SiteName}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '35%', gap: '0px' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <Text>Multi-Site Director:{data?.Directors}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '10%', gap: '0px' }}></View>
                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '10%', gap: '0px' }}></View>
                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '10%', gap: '0px' }}></View>
                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '10%', gap: '0px' }}></View>
                                                    </View>
                                                    <View style={styles.tableRow} wrap={false}>
                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '20%', gap: '0px' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                <Text></Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '20%', gap: '0px' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', borderLeftWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <Text>Position</Text>
                                                            </View>
                                                        </View>

                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', textAlign: 'center' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <Text>Monday</Text>
                                                            </View>
                                                        </View>

                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', textAlign: 'center' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <Text>Tuesday</Text>
                                                            </View>
                                                        </View>

                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', textAlign: 'center' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <Text>Wednesday</Text>
                                                            </View>
                                                        </View>

                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', textAlign: 'center' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <Text>Thursday</Text>
                                                            </View>
                                                        </View>

                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', textAlign: 'center' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <Text>Friday</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    {siteGroup.items.map((data: any, subIndex: number) => (
                                                        <View key={subIndex}>
                                                            <View style={styles.tableRow} wrap={false}>
                                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '20%', gap: '0px' }}>
                                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                        <Text>{data?.FirstName}, {data?.LastName}</Text>
                                                                    </View>
                                                                </View>
                                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '20%', gap: '0px' }}>
                                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', borderLeftWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <Text>{data?.SitePos}</Text>
                                                                    </View>
                                                                </View>

                                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', textAlign: 'center' }}>
                                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                                    </View>
                                                                </View>

                                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', textAlign: 'center' }}>
                                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                                    </View>
                                                                </View>

                                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', textAlign: 'center' }}>
                                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                                    </View>
                                                                </View>

                                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', textAlign: 'center' }}>
                                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                                    </View>
                                                                </View>

                                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', textAlign: 'center' }}>
                                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    ))}

                                                    <View style={styles.tableRow} wrap={false}>
                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '20%', gap: '0px' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                            </View>
                                                        </View>
                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '20%', gap: '0px' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', borderLeftWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                            </View>
                                                        </View>

                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', textAlign: 'center' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                            </View>
                                                        </View>

                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', textAlign: 'center' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                            </View>
                                                        </View>

                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', textAlign: 'center' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                            </View>
                                                        </View>

                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', textAlign: 'center' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                            </View>
                                                        </View>

                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', textAlign: 'center' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View style={styles.tableRow} wrap={false}>
                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '20%', gap: '0px' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                            </View>
                                                        </View>
                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '20%', gap: '0px' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', borderLeftWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                            </View>
                                                        </View>

                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', textAlign: 'center' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                            </View>
                                                        </View>

                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', textAlign: 'center' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                            </View>
                                                        </View>

                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', textAlign: 'center' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                            </View>
                                                        </View>

                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', textAlign: 'center' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                            </View>
                                                        </View>

                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', textAlign: 'center' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View style={styles.tableRow} wrap={false}>
                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '20%', gap: '0px' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                            </View>
                                                        </View>
                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '20%', gap: '0px' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', borderLeftWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                            </View>
                                                        </View>

                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', textAlign: 'center' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                            </View>
                                                        </View>

                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', textAlign: 'center' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                            </View>
                                                        </View>

                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', textAlign: 'center' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                            </View>
                                                        </View>

                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', textAlign: 'center' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                            </View>
                                                        </View>

                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', textAlign: 'center' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View style={styles.tableRow} wrap={false}>
                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '20%', gap: '0px' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                            </View>
                                                        </View>
                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '20%', gap: '0px' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', borderLeftWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                            </View>
                                                        </View>

                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', textAlign: 'center' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                            </View>
                                                        </View>

                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', textAlign: 'center' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                            </View>
                                                        </View>

                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', textAlign: 'center' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                            </View>
                                                        </View>

                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', textAlign: 'center' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                            </View>
                                                        </View>

                                                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '12%', gap: '0px', textAlign: 'center' }}>
                                                            <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0', borderBottomWidth: '0', borderTopWidth: '0', minHeight: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <View style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    })}
                                </View>
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
export default StaffScheduleBlankReport