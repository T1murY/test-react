import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Avatar, Card, CardContent } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { BranchDetailTable } from './branchDetailTable';
import BranchInfo from './branchInfo';
import BranchDetailEarning from './branchDetailEarning';
import SalesChart from './branchSalesChart';

interface BranchDetailsParams {
    id: string;
    [key: string]: string | undefined;
}

const BranchDetails: React.FC = () => {
    const { id } = useParams<BranchDetailsParams>();
    console.log('Branch ID:', id);
    const branch = {
        id: '1234',
        name: 'Merkez Şube',
        createdOn: '20.08.2024',
        email: 'merkez@company.com',
        phone: '7777777',
        fax: '7777777',
        address: 'Alanya/ANTALYA, Atatürk Caddesi'
    };

    // Replace this with your logic to fetch the branch data based on the id
    const branchData = {
        name: 'SARIBASLAR MOBILYA ANTALYA SUBESI',
        activePersonelCount: 25,
        activeDepartmentCount: 31,
        activeTeamCount: 14,
        activeProjectCount: 5,
        completedProjectCount: 10,
        activeVehicleCount: 3,
        fixtureCount: 2,
        eventCount: 1,
        customerCount: 5,
        adultAuditCount: 1000,
        adultAuditAmount: 12000,
        childAuditCount: 200,
        childAuditAmount: 200,
        email: 'saribilgisayar@sarigroup.com',
        phone: '+90 242 462 8800',
        address: '1. Agusto Vilayeti, Aksu / ANTALYA, Cumhuriyet Mahallesi, Atatürk Caddesi',
        stats: [8, 12, 9, 7, 11, 13, 10],
        recentActivities: [
            { name: 'Devon Williamson', role: 'Team Lead', avatar: 'https://i.pravatar.cc/150?img=1' },
            { name: 'Dainee Wilson', role: 'Frontend Developer', avatar: 'https://i.pravatar.cc/150?img=2' },
            { name: 'Judith Black', role: 'Backend Developer', avatar: 'https://i.pravatar.cc/150?img=3' },
        ],
    };

    return (
        <Box>
            <Grid container margin={2} padding={2}>
                <Grid item xs={9}>
                    <Grid item xs={12}>
                        <BranchDetailTable branchData={branchData} />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <BranchDetailEarning title="Yıllık Gelir" amount={12000} yearly />
                            </Grid>
                            <Grid item xs={4}>
                                <BranchDetailEarning title="Yıllık Gelir" amount={12000} yearly />
                            </Grid>
                            <Grid item xs={4}>
                                <BranchDetailEarning title="Yıllık Gelir" amount={12000} yearly />
                            </Grid>
                            <Grid item xs={4}>
                                <BranchDetailEarning title="Yıllık Gelir" amount={12000} yearly />
                            </Grid>
                            <Grid item xs={4}>
                                <BranchDetailEarning title="Yıllık Gelir" amount={12000} yearly />
                            </Grid>
                            <Grid item xs={4}>
                                <BranchDetailEarning title="Yıllık Gelir" amount={12000} yearly />
                            </Grid>
                        </Grid>

                    </Grid>

                    <Grid item xs={12} marginTop={1}>
                        <Grid container spacing={2}>
                            <Grid item xs={7}>
                                <Card sx={{ borderRadius: 4 }}>
                                    <CardContent>
                                        <Typography variant="body1" gutterBottom>
                                            Statistics
                                        </Typography>
                                        <LineChart
                                            sx={{
                                                '& .MuiAreaElement-series-1': {
                                                    fill: "rgba(255, 0, 0, 0.2)",
                                                },
                                                '& .MuiAreaElement-series-2': {
                                                    fill: "rgba(0, 0, 255, 0.2)",
                                                },
                                            }}
                                            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                                            series={[
                                                { id: 1, curve: "linear", data: [0, 5, 2, 6, 3, 9.3], color: "rgb(255, 0, 0)", area: true },
                                                { id: 2, curve: "linear", data: [6, 3, 7, 9.5, 4, 2], area: true },
                                            ]}
                                            height={300}
                                            margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
                                            grid={{ vertical: true, horizontal: true }}
                                        />
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={5}>
                                <Box>
                                    <Card sx={{ borderRadius: 4 }}>
                                        <CardContent >
                                            <Typography variant="body1" gutterBottom>
                                                Son Hesap Hareketleri
                                            </Typography>
                                            <Box display="flex" alignItems="center" flexDirection={'column'}>
                                                {branchData.recentActivities.map((activity, index) => (
                                                    <Box key={index} display="flex" alignItems="center" m={2}>
                                                        <Avatar src={activity.avatar} />
                                                        <Box ml={1}>
                                                            <Typography variant="body2">{activity.name}</Typography>
                                                            <Typography variant="body2" color="textSecondary">
                                                                {activity.role}
                                                            </Typography>
                                                        </Box>
                                                        <Box mx={2}>
                                                            <Typography variant="body2" color="green">
                                                                +$500
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary">
                                                                Payment
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                ))}
                                            </Box>
                                        </CardContent>
                                    </Card>

                                </Box>

                            </Grid>

                        </Grid>



                    </Grid>


                </Grid>
                <Grid item xs={3}>
                    <BranchInfo branch={branch} />
                    <SalesChart />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={6}>

                </Grid>
                <Grid item xs={6}>

                </Grid>
            </Grid>
        </Box>
    );
};

export default BranchDetails;