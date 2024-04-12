
import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react'
interface ModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: FormData) => void;
    branch: any;
}

interface FormData {
    branchName: string;
    email: string;
    phone: string;
    fax: string;
    city: string;
    district: string;
    area: string;
    street: string;
    zipCode: string;
}
const BranchUpdateCreateModal = ({ open, onClose, onSubmit,branch }: ModalProps) => {
    const [formData, setFormData] = useState<FormData>(
        {
            branchName: branch.name,
            email: branch.email,
            phone: branch.phone,
            fax: branch.fax,
            city: branch.address,
            district: branch.address,
            area: branch.address,
            street: branch.address,
            zipCode: branch.address
        }
    );
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                
                <Typography id="modal-title" variant="h6" component="h2" sx={{
                flexGrow: 1,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-4px',
                  left: 55,
                  width: '10%',
                  height: '2px',
                  backgroundColor: 'blue',
                },}}>
                    Şube Bilgilerini Düzenle
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx=
                    {{ maxHeight: '60vh', overflow: 'auto', minHeight:'80vh' ,
                    scrollbarWidth: "none", // Hide the scrollbar for firefox
                    '&::-webkit-scrollbar': {
                        display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
                    },
                    '&-ms-overflow-style:': {
                        display: 'none', // Hide the scrollbar for IE
                    },
                    }}>
                        <Typography id="modal-description" sx={{ mt: 2 }}>
                            <Typography variant="subtitle1">Şube Adı</Typography>
                            <TextField
                                name="branchName"
                                value={formData.branchName}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                    borderColor: 'gray',
                                    borderRadius: 5,
                                    },
                                    },
                                }}
                                fullWidth
                            />
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1">Şube Mail Adresi</Typography>
                                    <TextField
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        variant="outlined"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                            borderColor: 'gray',
                                            borderRadius: 5,
                                            },
                                            },
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1">Şube Telefon No</Typography>
                                <TextField
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    variant="outlined"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                        borderColor: 'gray',
                                        borderRadius: 5,
                                        },
                                        },
                                    }}
                                    fullWidth
                                />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1">Şube Fax No</Typography>
                                <TextField
                                    name="fax"
                                    value={formData.fax}
                                    onChange={handleChange}
                                    variant="outlined"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                        borderColor: 'gray',
                                        borderRadius: 5,
                                        },
                                        },
                                    }}
                                    fullWidth
                                />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1">İl:</Typography>
                                <TextField
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    variant="outlined"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                        borderColor: 'gray',
                                        borderRadius: 5,
                                        },
                                        },
                                    }}
                                    fullWidth
                                />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1">İlçe:</Typography>
                                <TextField
                                    name="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    variant="outlined"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                        borderColor: 'gray',
                                        borderRadius: 5,
                                        },
                                        },
                                    }}
                                    fullWidth
                                />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1">Mahalle:</Typography>
                                <TextField
                                    name="area"
                                    value={formData.area}
                                    onChange={handleChange}
                                    variant="outlined"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                        borderColor: 'gray',
                                        borderRadius: 5,
                                        },
                                        },
                                    }}
                                    fullWidth
                                />
                                </Grid>
                                <Grid item xs={6}>
                                <Typography variant="subtitle1">Cadde:</Typography>
                                    <TextField
                                    name="street"
                                    value={formData.street}
                                    onChange={handleChange}
                                    variant="outlined"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                        borderColor: 'gray',
                                        borderRadius: 5,
                                        },
                                        },
                                    }}
                                    fullWidth
                                />
                                </Grid>
                                <Grid item xs={6}>
                                <Typography variant="subtitle1">Posta Kodu:</Typography>
                                    <TextField
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    variant="outlined"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                        borderColor: 'gray',
                                        borderRadius: 5,
                                        },
                                        },
                                    }}
                                    fullWidth
                                />
                                </Grid>
                            </Grid>
                        </Typography>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2, float: "right", borderRadius: "2em"}}
                        ><AddIcon/>
                            <Typography textTransform={'none'}>Oluştur</Typography>
                            

                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    )
}

export default BranchUpdateCreateModal