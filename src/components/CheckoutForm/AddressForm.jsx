import React, {useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from './FormInput'

import { commerce } from '../../lib/commerce'

const AddressForm = ({ checkoutToken }) => {
    const [shippingCountries, setshippingCountries] = useState([])
    const [shippingCountry, setshippingCountry] = useState('')
    const [shippingSubdivisions, setshippingSubdivisions] = useState([])
    const [shippingSubdivision, setshippingSubdivision] = useState('')
    const [shippingOptions, setshippingOptions] = useState([])
    const [shippingOption, setshippingOption] = useState('')
    const methods = useForm()

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name}))
    console.log(countries)
    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)

        setshippingCountries(countries)
        setshippingCountry(Object.keys(countries)[0])
    } 

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
        
    }, [])
    return (
        <>
           <Typography variant='h6' gutterBottom>Shipping Address</Typography>
           <FormProvider {...methods}>
               <form onSubmit=''>
                    <Grid container spacing={3}>
                        <FormInput  name='firstName' label='First Name' required />
                        <FormInput  name='lastName' label='Last Name' required />
                        <FormInput  name='address' label='address' required />
                        <FormInput  name='email' label='Email' required />
                        <FormInput  name='city' label='City' required />
                        <FormInput  name='zip' label='Zip/ Postal Code' required />
                        <Grid item xs={12}>
                            <InputLabel>Shipping Country</InputLabel>
                                <Select value={shippingCountry} fullWidth onChange={(e) => setshippingCountry(e.target.value)}>
                                    {countries.map((country) => (
                                        <MenuItem key={country.id} value={country.id}>
                                            {country.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                        </Grid>
                        {/* <Grid item xs={12}>
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
                        </Grid> */}
                    </Grid>
               </form>
           </FormProvider>
        </>
    )
}

export default AddressForm
