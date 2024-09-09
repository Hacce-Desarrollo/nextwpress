import React, { createContext, useEffect, useState } from 'react';
import { initI18next } from './index';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import { getCurrentLanguage } from './index';

const I18nContext = createContext();

export const I18nProvider = ({ children }) => {
  
    const [i18nInitialized, setI18nInitialized] = useState(false);
    const currentLanguage = getCurrentLanguage();

    useEffect(() => {
        const setupI18n = async () => {
            try {
                await initI18next( currentLanguage );
                setI18nInitialized( true );
            } catch ( error ) {
                console.error( 'Error al inicializar i18next:', error );
            }
        };

        setupI18n();

    }, [currentLanguage] );

    if ( ! i18nInitialized ) {
        return <div>Loading...</div>;
    }

    return (
        <I18nextProvider i18n={i18next}>
            {children}
        </I18nextProvider>
    );
    
};