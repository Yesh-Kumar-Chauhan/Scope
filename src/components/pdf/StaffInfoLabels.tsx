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
interface StaffInfoLabelsReportProps {
    data: any;
}

const StaffInfoLabels: React.FC<StaffInfoLabelsReportProps> = ({ data }) => {
    const todayDate = moment().format('DD-MM-YYYY');
    const siteInfoLabel = data[0];
    console.log("dStaffInfoLabelsReportPropsata",data)
    return (
        <Document>
           <Page size="A4" style={styles.page} orientation="landscape">
                <View style={{ padding: '40px' }}>
                    <Text style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>Name: {siteInfoLabel.Firstname} {siteInfoLabel.Lastname}</Text>
                    <Text style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>Site: {siteInfoLabel.Site}</Text>
                    <Text style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>DOH:{siteInfoLabel.DOEMP ? moment(siteInfoLabel.DOEMP).format('YYYY-MM-DD') : ''}</Text>
                    <Text style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>Title:{siteInfoLabel.Title}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', minWidth: '110px' }}>
                            Medical: {siteInfoLabel.Medical ? moment(siteInfoLabel.Medical).format('YYYY-MM-DD') : ''}
                        </Text>
                        <Text style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', marginLeft: '20px' }}>
                            CBC: {siteInfoLabel.CBC?siteInfoLabel.CBC:''}
                        </Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', minWidth: '110px' }}>
                            CPR/FA: -{siteInfoLabel.CPR ? moment(siteInfoLabel.CPR).format('YYYY-MM-DD') : ''}
                        </Text>
                        <Text style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', marginLeft: '20px' }}>
                            MAT: -{siteInfoLabel.MATExpires ? moment(siteInfoLabel.MATExpires).format('YYYY-MM-DD') : ''}
                        </Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', minWidth: '110px' }}>
                            Left Alone:{siteInfoLabel.AloneWithChildren ? siteInfoLabel.AloneWithChildren : ''}
                        </Text>
                        <Text style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', marginLeft: '20px' }}>
                            Child Abuse: {siteInfoLabel.ChildAbuse ? moment(siteInfoLabel.ChildAbuse).format('YYYY-MM-DD') : ''}
                        </Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', minWidth: '110px' }}>
                            ACES: {siteInfoLabel.ACES ? moment(siteInfoLabel.ACES).format('YYYY-MM-DD') : ''}
                        </Text>
                        <Text style={{ fontSize: '10px', fontWeight: 'bold', color: '#000', marginLeft: '20px' }}>
                            E. Law: {siteInfoLabel.ELaw ? moment(siteInfoLabel.ELaw).format('YYYY-MM-DD') : ''}
                        </Text>
                    </View>
                </View>
                <Text style={styles.dateText} fixed>{todayDate}</Text>
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `Page ${pageNumber} of ${totalPages}`
                )} fixed />
            </Page>

        </Document >
    )
}

export default StaffInfoLabels