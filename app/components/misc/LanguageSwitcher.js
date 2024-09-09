'use client';

import { useEffect, useState } from 'react';
import { getCurrentLanguage, getLanguageList } from '@/app/i18n/index';
import CustomDropdown from '@/app/components/misc/CustomDropdown';

export default function LanguageSwitcher({ handleMenuToggle = () => {} }) {
    const [currentLanguage, setCurrentLanguage] = useState('');
    const [languageList, setLanguageList] = useState([]);
    const [mounted, setMounted] = useState(false);

    const currentLng = getCurrentLanguage();    

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentLanguage(currentLng);
            setLanguageList(getLanguageList());
            setMounted(true);

            //console.log(currentLng);
        }
    }, [currentLng]);

    const handleChangeLanguage = (event) => {
        const selectedLanguage = event.target.value;
        localStorage.setItem('selectedLanguage', selectedLanguage);

        const currentPath = window.location.pathname;
        let newPath = `/${selectedLanguage}`;

        if (currentPath !== `/${currentLanguage}`) {
            newPath += currentPath.substring(`/${currentLanguage}`.length);
        }

        window.location.href = newPath;
        handleMenuToggle();
    };

    if ( ! mounted ) {
        return null;
    }

    return (

        <div className={`language-switcher flex items-start justify-start mylanguages`}>

            <CustomDropdown
                currentLanguage={currentLanguage}
                languageList={languageList}
                handleChangeLanguage={handleChangeLanguage}
            />

        </div>

    );

}