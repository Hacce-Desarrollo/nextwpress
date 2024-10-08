'use client'

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import React, { useEffect, useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import SpacerHeight from "@/app/components/misc/SpacerHeight";
import { useTranslation } from 'react-i18next';

export default function FormContact(props) {

    const { t, i18n } = useTranslation();

    useEffect(() => {
        
        const handleLanguageChange = (lng) => {
            //console.log('Lang changed to:', lng);
        };
    
        i18n.on('languageChanged', handleLanguageChange);
    
        return () => {
          i18n.off('languageChanged', handleLanguageChange);
        };
      }, [i18n]);
    
      useEffect(() => {
            //console.log('Lenguaje actual:', i18n.language);
            //console.log('Traducción para "name_label":', t('name_label'));
      }, [i18n, t]);

    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        legalcheck: false,
    });

    const handleSubmit = async ( event ) => {
        document.getElementById( 'responseText' ).classList.add( 'hidden' );
        event.preventDefault();

        if ( ! formData.name || ! formData.email ) {
            document.getElementById( 'responseText' ).innerHTML = t( "Please fill in all required fields" );
            document.getElementById( 'responseText' ).classList.remove( 'hidden' );
            return;
        }

        try {

            const response = await fetch( process.env.BASE_URL + process.env.ENDPOINT_SEND_FORM, {
                method: "POST",
                body: JSON.stringify( formData ),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if ( response.ok ) {
                const responseData = await response.json();
                document.getElementById( 'responseText' ).innerHTML = t( "The email was sent successfully" );
                document.getElementById( 'responseText' ).classList.remove( 'hidden' );
                setFormData({
                    name: "",
                    surname: "",
                    email: "",
                    phone: "",
                    legalcheck: false,
                });
            } else {
                document.getElementById( 'responseText' ).innerHTML = t( "Error submitting the form" );
                document.getElementById( 'responseText' ).classList.remove( 'hidden' );
            }
        } catch (error) {
            document.getElementById( 'responseText' ).innerHTML = t( "Error submitting the form" );
            document.getElementById( 'responseText' ).classList.remove( 'hidden' );
        }
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    

    return (

        <div className="form-haccenext relative">

            <div className="innerform">

                <SpacerHeight height="10" />

                <form action="/" method="post" onSubmit={handleSubmit}>

                    <div className="p-float-label mb-3">

                        <InputText
                            id="floatingInput1"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder={ t( "name_form_label" ) }
                        />

                        <label htmlFor="floatingInput1">{ t( "name_form_label" ) }</label>

                    </div>

                    <div className="p-float-label mb-3">

                        <InputText
                            id="floatingInput1"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            required
                            placeholder={ t( "surname_form_label" ) }
                        />

                        <label htmlFor="floatingInput1">{ t( "surname_form_label" ) }</label>

                    </div>

                    <div className="p-float-label mb-3">

                        <InputText
                            id="floatingInput2"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder={ t( "email_form_label" ) }
                        />

                        <label htmlFor="floatingInput2">{ t( "email_form_label" ) }</label>

                    </div>

                    <div className="p-float-label mb-3">

                        <InputText
                            id="floatingInput3"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={ t( "phone_form_label" ) }
                        />

                        <label htmlFor="floatingInput3">{ t( "phone_form_label" ) }</label>

                    </div>

                    <div className="form-check mt-4">

                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexCheckDefault"
                            name="legalcheck"
                            checked={formData.check}
                            onChange={handleChange}
                            required
                        />

                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            { t( "I have read and accept the " ) }
                            <a href={`/${props.lng}/aviso-legal/`} className='underline'>{ t( "Legal advice" ) }</a>
                            { t(" and the ") }
                            <a href={`/${props.lng}/politica-de-privacidad/`} className='underline'>{ t( "Privacy policy" ) }</a>.
                        </label>

                    </div>

                    <div className="flex items-center justify-starts">

                        <Button
                            type="submit"
                            className="btnsubmit btn-custom btn-white"
                            label={ t( "Submit" ) }
                        />

                    </div>

                </form>

            </div>

            <div id="responseText" className="hidden w-full bg-[#FFF] py-2 text-center text-[18px] text-[#020940] border border-solid border-1 border-[#020940]"></div>

        </div>

    );
}