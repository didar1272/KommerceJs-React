import React, {useState} from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from './FormInput'

import { commerce } from '../../lib/commerce'

const AddressForm = () => {
    const [shippingCountries, setshippingCountries] = useState([])
    const [shippingCountry, setshippingCountry] = useState('')
    const [shippingSubdivisions, setshippingSubdivisions] = useState([])
    const [shippingSubdivision, setshippingSubdivision] = useState('')
    const [shippingOptions, setshippingOptions] = useState([])
    const [shippingOption, setshippingOption] = useState('')
    const methods = useForm()
    return (
        <>
           <Typography variant='h6' gutterBottom>Shipping Address</Typography>
           <FormProvider {...methods}>
               <form onSubmit=''>
                    <Grid container spacing={3}>
                        <FormInput  name='firstName' label='First Name' required />
                        <FormInput  name='lastName' label='Lasst Name' required />
                        <FormInput  name='address' label='address' required />
                        <FormInput  name='email' label='Email' required />
                        <FormInput  name='city' label='City' required />
                        <FormInput  name='zip' label='Zip/ Postal Code' required />
                        <Grid item xs={12}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={} fullWidth onChange={}>
                                <MenuItem key={} value={}>
                                    Select Me
                                </MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel>Shipping Subdivisions</InputLabel>
                            <Select value={} fullWidth onChange={}>
                                <MenuItem key={} value={}>
                                    Select Me
                                </MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel>Shipping options</InputLabel>
                            <Select value={} fullWidth onChange={}>
                                <MenuItem key={} value={}>
                                    Select Me
                                </MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
               </form>
           </FormProvider>
        </>
    )
}

export default AddressForm
