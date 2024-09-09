'use client';

import React, { useEffect, useState, useCallback  } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import parse from 'html-react-parser';
import { defaultLanguage } from "@/app/i18n/config";
import LanguageSwitcher from '../misc/LanguageSwitcher';


export default function MainMenu({ menuppal, logo: mainLogo, lng = defaultLanguage }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [currentPath, setCurrentPath] = useState("");

    const logo = mainLogo.header?.opcionesHeader?.logo?.node?.mediaItemUrl || null;

    // Función para agregar el prefijo del idioma a la URL, evitando duplicaciones
    const addLangPrefix = useCallback( (uri) => {
        const langPrefix = `/${lng}`;
        return uri.startsWith(langPrefix) ? uri : `${langPrefix}${uri}`;
    }, [lng] );

    useEffect(() => {
        setCurrentPath(addLangPrefix(window.location.pathname));
    }, [addLangPrefix]);

    useEffect(() => {

        function handleScroll() {
            const scrolled = window.scrollY > 0;
            setIsScrolled(scrolled);
        }

        window.addEventListener( 'scroll', handleScroll );

        return () => {
            window.removeEventListener( 'scroll', handleScroll );
        };

    }, []);

    const renderMenuItems = (items) => {

        return items.map((menuItem, index) => {
            const currentLink = addLangPrefix( menuItem.uri );
            const isActive = currentPath === currentLink;
            const activeClass = isActive ? 'item-active' : '';
            const hasChildItems = menuItem.childItems && menuItem.childItems.nodes.length > 0;
    
            return (

                <div key={index} className={`menu-item ${menuItem.cssClasses} ${activeClass}`}>

                    <Link href={currentLink}>
                        <span className={menuItem.cssClasses}>{ parse( menuItem.label ) }</span>
                    </Link>

                    { hasChildItems && (

                        <div className="submenu">
                            { renderMenuItems(menuItem.childItems.nodes.map( subItem => ( {
                                ...subItem,
                                uri: addLangPrefix( subItem.uri )
                            } ) ) ) }
                        </div>

                    )}

                </div>

            );

        });

    };
    

    return (

        <div id="nav-header" className={isScrolled ? 'scrolled' : ''}>

            { logo && (
            
            <Link href={`/${lng}/`} className="logo-ppal">

                <Image
                    src={logo}
                    alt="Logo"
                    width={113}
                    height={47}
                />

            </Link>

            ) }

            <div className="main-menu flex flex-col md:flex-row">

                { renderMenuItems( menuppal ) }

                <div className="lang-switcher uppercase">
                    <LanguageSwitcher />
                </div>

            </div>

        </div>

    );
    
}
