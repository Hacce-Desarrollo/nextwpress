// utils/breadcrumbs.js
// Encuentra el enlace "Inicio" y cambia su href a "/"
"use client";

import { useEffect } from 'react';


const Breadcrumb = ({ base_url, lng }) => {

    useEffect( () => {
        
        const breadcrumbLink = document.querySelector( '.yoast-breadcrumbs a[href="' + base_url + '/"]' );

        if ( breadcrumbLink ) {
            breadcrumbLink.setAttribute( 'href', `/${lng}/` );
        }

    }, [base_url, lng] );
  
};

export default Breadcrumb;