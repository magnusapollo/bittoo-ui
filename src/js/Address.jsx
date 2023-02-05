import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

const AddressForm = (props) => {
    const [name, setName] = useState('');
    const [line1, setLine1] = useState('');
    const [line2, setLine2] = useState('');
    const [line3, setLine3] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');

    return (
        <Stack sx={{mt: 5}} spacing={2} width={1000}>
            <TextField label="Name" required variant="outlined" defaultValue={name} onChange={(e) => { setName(e.target.value) }} />
            <TextField label="Line 1" variant="outlined" defaultValue={line1} onChange={(e) => { setLine1(e.target.value) }} />
            <TextField label="Line 2 (optional)" variant="outlined" defaultValue={line2} onChange={(e) => { setLine2(e.target.value) }} />
            <TextField label="Line 3" variant="outlined" defaultValue={line3} onChange={(e) => { setLine3(e.target.value) }} />
            <TextField label="City" variant="outlined" defaultValue={city} onChange={(e) => { setCity(e.target.value) }} />
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={statesList}
                sx={{ width: 1000 }}
                renderInput={(params) => <TextField {...params} label="State" onChange={(e) => {setState(e.target.value)}} />}
            />
            <TextField label="Zip" variant="outlined" defaultValue={zip} onChange={(e) => setZip(e.target.value)} />
            <TextField label="Country" variant="outlined" defaultValue={country} onChange={(e) => setCountry(e.target.value)} />
            <Button variant="contained" onClick={() => props.handleSubmit(name, line1, line2, line3, city, state, zip, country)}>
                Add Shipping address
            </Button>
        </Stack>
    )
};


const statesList = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
]

export default AddressForm;