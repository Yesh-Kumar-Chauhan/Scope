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

interface StaffInserviceReportProps {
    data: any;
}
const groupByDistrictSiteTypeAndTraining = (data: any[]) => {
    return data.reduce((acc: any, item: any) => {
        const key = `${item.DIST_NAM}-${item.SITE_NAM}-${item.FIRSTNAME}-${item.LASTNAME}`;
        if (!acc[key]) {
            acc[key] = {
                DIST_NAM: item.DIST_NAM,
                SITE_NAM: item.SITE_NAM,
                FIRSTNAME: item.FIRSTNAME,
                LASTNAME: item.LASTNAME,
                trainings: {}
            };
        }
        // Group by TRAINING within each staff member
        if (!acc[key].trainings[item.TRAINING]) {
            acc[key].trainings[item.TRAINING] = {
                TRAINING: item.TRAINING,
                items: []
            };
        }
        acc[key].trainings[item.TRAINING].items.push(item);
        return acc;
    }, {});
};
const calculateTotalHours = (items: any[] = []) => {
    return items.reduce((sum, item) => sum + (parseFloat(item.HOURS) || 0), 0);
};

const calculateTotalHoursForGroupByData = (groupedData: any) => {
    return Object.keys(groupedData).reduce((sum, key) => {
        const trainingItems = Object.values(groupedData[key].trainings)
            .flatMap((training: any) => training.items); // Fixed: Use Object.values to get an array of trainings
        return sum + calculateTotalHours(trainingItems);
    }, 0);
};

const calculateTotalHoursForAllData = (data: any[]) => {
    return calculateTotalHours(data);
};
const StaffInserviceReport: React.FC<StaffInserviceReportProps> = ({ data }) => {
    const todayDate = moment().format('DD-MM-YYYY');
    useEffect(() => {
        if (data) {
            console.log('data for pdf', data);
        }
    }, [data]);

    if (!data) {
        return null;
    }

    const groupedData = groupByDistrictSiteTypeAndTraining(data);
    let lastDistrictName = '';
    let lastSiteName = '';
    let lastFullName = '';

    const totalHoursForAllData = calculateTotalHoursForAllData(data);
    const totalHoursForGroupByData = calculateTotalHoursForGroupByData(groupedData);

    return (
        <Document>
            <Page size="A4" style={styles.page} orientation="portrait">
                <View>
                    <div style={styles.section}>
                        <Text style={styles.header}>Staff Inservice</Text>
                    </div>
                    {Object.keys(groupedData).length > 0 ? (
                        Object.keys(groupedData).map((key: string, index: number) => {
                            const group = groupedData[key];

                            const shouldPrintDistrictName = lastDistrictName !== group.DIST_NAM;
                            const shouldPrintSiteName = lastSiteName !== group.SITE_NAM;
                            const shouldPrintFullName = lastFullName !== `${group.FIRSTNAME} ${group.LASTNAME}`;
                            return (
                                <>
                                    {shouldPrintDistrictName && (
                                        <View style={{ width: '100%' }}>
                                            <Text style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '5px' }}>{group.DIST_NAM}</Text>
                                        </View>
                                    )}
                                    {/* {shouldPrintSiteType && (
                                        <View style={{ width: '100%', paddingLeft: '12px', marginBottom: '10px' }}>
                                            <Text style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '0px' }}></Text>
                                        </View>
                                    )} */}
                                    {shouldPrintSiteName && (
                                        <View style={{ width: '100%', paddingLeft: '12px', marginBottom: '10px' }}>
                                            <View style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '0px' }}>
                                                <Text>{group?.SITE_NAM}</Text>
                                            </View>
                                        </View>
                                    )}

                                    <View style={{ width: '100%', paddingLeft: '12px', marginBottom: '10px' }}>
                                        <View style={styles.table}>
                                            <View style={styles.tableRow}>
                                                {shouldPrintFullName && (
                                                    <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '20%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', alignItems: 'center', justifyContent: 'center' }}>
                                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', textDecoration: 'underline' }}>
                                                            <Text>{group?.FIRSTNAME} {group?.LASTNAME}</Text>
                                                        </View>
                                                    </View>
                                                )}
                                                <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '15%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                                        <Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '15%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                                        <Text>Employed</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '15%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                                        <Text>First Aid</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '15%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                                        <Text>CPR</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '15%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                                        <Text>Abuse</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <View style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: '20%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', alignItems: 'center', justifyContent: 'center' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', textDecoration: 'underline' }}>
                                                        <Text>{data[0]?.SitePos}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '20%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingRight: '15px' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', }}>
                                                        <Text>Total:{totalHoursForAllData}</Text>
                                                    </View>
                                                </View>

                                                <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '15%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                                        <Text>{data[0]?.DOEMP ? moment(data[0]?.DOEMP).format('YYYY-MM-DD') : ''}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '15%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                                        <Text>{data[0]?.FIRSTAID ? moment(data[0]?.FIRSTAID).format('YYYY-MM-DD') : ''}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '15%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                                        <Text>{data[0]?.CPR ? moment(data[0]?.CPR).format('YYYY-MM-DD') : ''}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '15%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#000', borderRightWidth: '0px', borderBottomWidth: '0px', borderTopWidth: '0px', borderLeftWidth: '0px', minHeight: '22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                    <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                                        <Text>{data[0]?.MATAPP ? moment(data[0]?.MATAPP).format('YYYY-MM-DD') : ''}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        {Object.keys(group.trainings).map((trainingKey) => {
                                            const training = group.trainings[trainingKey];
                                            const trainingTotalHours = calculateTotalHours(training.items);
                                            return (
                                                <View style={{ width: '100%', paddingLeft: '12px', marginBottom: '10px' }}>
                                                    <View style={{ width: '100%', marginBottom: '10px' }}>
                                                        <Text style={{ fontSize: '10px' }}>
                                                            {training.TRAINING}
                                                        </Text>
                                                    </View>
                                                    <View style={styles.table}>
                                                        <View style={styles.tableRow}>
                                                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#cdcdcd', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                                                    <Text>Workshop</Text>
                                                                </View>
                                                            </View>
                                                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#cdcdcd', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                                                    <Text>{trainingTotalHours}</Text>
                                                                </View>
                                                            </View>

                                                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#cdcdcd', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                                                    <Text>Date</Text>
                                                                </View>
                                                            </View>

                                                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#cdcdcd', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                                                    <Text>Topic</Text>
                                                                </View>
                                                            </View>
                                                            <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#cdcdcd', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                                                    <Text>Sponsor</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                        {training.items.map((data: any, subIndex: number) => (
                                                            <>
                                                                <View style={styles.tableRow} wrap={false}>
                                                                    <View wrap={false} style={{ flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#cdcdcd', borderRightWidth: '0px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexWrap: 'nowrap', minHeight: '30px' }}>
                                                                        <View wrap={false} style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }} >
                                                                            <Text>{data?.TRAINING}</Text>
                                                                            {/* <Text>{data?.WorkshopTypeName}</Text> */}
                                                                        </View>
                                                                    </View>
                                                                    <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', padding: '3px', borderStyle: 'solid', borderColor: '#cdcdcd', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', borderLeftWidth: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '30px' }}>
                                                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                                                            <Text>{data?.HOURS}</Text>
                                                                        </View>
                                                                    </View>

                                                                    <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '12.5%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#cdcdcd', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '30px' }}>
                                                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                                                            <Text>{data?.DATE ? moment(data?.DATE).format('YYYY-MM-DD') : ''}</Text>
                                                                        </View>
                                                                    </View>

                                                                    <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#cdcdcd', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', minHeight: '30px' }}>
                                                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                                                            <Text>{data?.TopicName}</Text>
                                                                        </View>
                                                                    </View>
                                                                    <View style={{ flexDirection: 'column', flex: '0 0 auto', width: '25%', gap: '0px', textAlign: 'center', padding: '3px', borderStyle: 'solid', borderColor: '#cdcdcd', borderRightWidth: '1px', borderBottomWidth: '1px', borderTopWidth: '1px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', minHeight: '30px' }}>
                                                                        <View style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                                                                            <Text>{data?.SPONSOR}</Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            </>
                                                        ))}
                                                    </View>

                                                </View>
                                            )
                                        })}
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
            </Page>
        </Document>
    )
}
export default StaffInserviceReport