'use client';

import '@/styles/general.scss';
import '@/styles/globals.scss';
import '@/styles/gutenberg.scss';
import i18next from 'i18next';
import { getCurrentLanguage } from '@/app/i18n/index';
import { I18nProvider } from '@/app/i18n/I18nProvider';
import { useEffect, useState } from 'react';

export default function RooootLayout({ children }) {

    const [language, setLanguage] = useState(getCurrentLanguage());

    useEffect(() => {
    
        const handleLanguageChange = () => {
            setLanguage(getCurrentLanguage());
        };

        // Suscríbete a los cambios de idioma
        i18next.on('languageChanged', handleLanguageChange);

        return () => {
            i18next.off('languageChanged', handleLanguageChange);
        };

    }, []);

    return (
    
        <html lang={language}>
            <body>
                <I18nProvider>
                    {children}
                </I18nProvider>
            </body>
        </html>

    );

}