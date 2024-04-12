import { Avatar, Box, Grid, Typography } from '@mui/material'
import React from 'react'
import BranchIcon from './icons';
function randomColor() {
    let hex = Math.floor(Math.random() * 0xFFFFFF);
    let color = "#" + hex.toString(16);
  
    return color;
  }

export const BranchDetailTable = ({branchData}:any) => {
  return (
    <Box sx={{backgroundColor:"white", margin:1, borderRadius:4, padding:3}}>
            <Typography variant="caption" gutterBottom>
                Şube Detayları
            </Typography>
            <Box sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                
            }} >
                <Avatar
                    variant="square"
                    sx={{
                        backgroundColor: randomColor(),
                        width: 55,
                        height: 55,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 4,
                        mr: 2,
                        marginBottom: 2,
                    }}
                >
                    <BranchIcon fontSize='large' />
                </Avatar>
                <Typography variant="h4" gutterBottom textAlign={'center'}>
                    {branchData.name}
                </Typography>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Box >
                        <Box display="flex" alignItems="center" mb={1}>
                                <Avatar sx={{marginRight:2, borderRadius:4}} variant='square' />
                                <Box display="flex" alignItems="left" flexDirection={"column"} mb={1}>
                                    <Typography variant="body1" ml={1}>
                                        Aktif Personel Sayısı
                                    </Typography>
                                    <Typography variant="h5" fontWeight="bold">
                                    {branchData.activePersonelCount}
                                    </Typography>
                                </Box>
                            </Box>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box>
                        <Box display="flex" alignItems="center" mb={1}>
                                <Avatar sx={{marginRight:2, borderRadius:4}} variant='square' />
                                <Box display="flex" alignItems="left" flexDirection={"column"} mb={1}>
                                    <Typography variant="body1" ml={1}>
                                        Aktif Departman Sayısı
                                    </Typography>
                                    <Typography variant="h5" fontWeight="bold">
                                    {branchData.activeDepartmentCount}
                                    </Typography>
                                </Box>
                            </Box>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box>
                        <Box display="flex" alignItems="center" mb={1}>
                                <Avatar sx={{marginRight:2, borderRadius:4}} variant='square' />
                                <Box display="flex" alignItems="left" flexDirection={"column"} mb={1}>
                                    <Typography variant="body1" ml={1}>
                                        Aktif Ekip Sayısı
                                    </Typography>
                                    <Typography variant="h5" fontWeight="bold">
                                    {branchData.activeTeamCount}
                                    </Typography>
                                </Box>
                            </Box>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box>
                        <Box display="flex" alignItems="center" mb={1}>
                                <Avatar sx={{marginRight:2, borderRadius:4}} variant='square' />
                                <Box display="flex" alignItems="left" flexDirection={"column"} mb={1}>
                                    <Typography variant="body1" ml={1}>
                                        Aktif Proje Sayısı
                                    </Typography>
                                    <Typography variant="h5" fontWeight="bold">
                                    {branchData.activeProjectCount}
                                    </Typography>
                                </Box>
                            </Box>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box>
                        <Box display="flex" alignItems="center" mb={1}>
                                <Avatar sx={{marginRight:2, borderRadius:4}} variant='square' />
                                <Box display="flex" alignItems="left" flexDirection={"column"} mb={1}>
                                    <Typography variant="body1" ml={1}>
                                        Tamamlanan Proje Sayısı
                                    </Typography>
                                    <Typography variant="h5" fontWeight="bold">
                                    {branchData.completedProjectCount}
                                    </Typography>
                                </Box>
                            </Box>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box>
                        <Box display="flex" alignItems="center" mb={1}>
                                <Avatar sx={{marginRight:2, borderRadius:4}} variant='square' />
                                <Box display="flex" alignItems="left" flexDirection={"column"} mb={1}>
                                    <Typography variant="body1" ml={1}>
                                        Aktif Araç Sayısı
                                    </Typography>
                                    <Typography variant="h5" fontWeight="bold">
                                    {branchData.activeVehicleCount}
                                    </Typography>
                                </Box>
                            </Box>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box>
                        <Box display="flex" alignItems="center" mb={1}>
                                <Avatar sx={{marginRight:2, borderRadius:4}} variant='square' />
                                <Box display="flex" alignItems="left" flexDirection={"column"} mb={1}>
                                    <Typography variant="body1" ml={1}>
                                        Demirbaş Sayısı
                                    </Typography>
                                    <Typography variant="h5" fontWeight="bold">
                                    {branchData.fixtureCount}
                                    </Typography>
                                </Box>
                            </Box>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{maxHeight:115}}>
                        <Box display="flex" alignItems="center" mb={1}>
                                <Avatar sx={{marginRight:2, borderRadius:4}} variant='square' />
                                <Box display="flex" alignItems="left" flexDirection={"column"} mb={1}>
                                    <Typography variant="body1" ml={1}>
                                        Gerçekleşen Etkinlik Sayısı
                                    </Typography>
                                    <Typography variant="h5" fontWeight="bold">
                                    {branchData.eventCount}
                                    </Typography>
                                </Box>
                            </Box>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box>
                            <Box display="flex" alignItems="center" mb={1}>
                                <Avatar sx={{marginRight:2, borderRadius:4}} variant='square' />
                                <Box display="flex" alignItems="left" flexDirection={"column"} mb={1}>
                                    <Typography variant="body1" ml={1}>
                                        Müşteri Sayısı
                                    </Typography>
                                    <Typography variant="h5" fontWeight="bold">
                                    {branchData.customerCount}
                                    </Typography>
                                </Box>
                            </Box>
                    </Box>
                </Grid>
            </Grid>    
            </Box>
  )
}
