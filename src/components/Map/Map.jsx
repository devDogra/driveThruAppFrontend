import React from 'react'
import Box from '@mui/material/Box';
import Iframe from 'react-iframe';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Map(props) {
    const [mapUrl, setMapUrl] = useState("");

    useEffect(() => {
        setTimeout(() => {
            setMapUrl(props.url);
        }, 500)
    }, [])

    const defaultCSS = "border: 1px solid black"
    return (
    <Box>
        <Iframe 
            width={props.width || 425}
            height={props.height || 350}
            url={mapUrl}
            style={props.css || defaultCSS}>
        </Iframe>
    </Box>
    )
}
