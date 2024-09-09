'use client'

import { useEffect, useState } from "react";
import Link from 'next/link';
import parse from 'html-react-parser';
import Image from 'next/image';
import iconoOpen from '@/public/images/icon-mobile-open.svg';
import iconoClose from '@/public/images/icon-mobile-close.svg';
import { defaultLanguage } from "@/app/i18n/config";
import LanguageSwitcher from '../misc/LanguageSwitcher';

export default function MainMenuMobile(props) {
    const { menuppal, logo: { header: { opcionesHeader: { logo: { node: { mediaItemUrl: logo } } } } }, logoMenu: { header: { opcionesHeader: { logoMenu: { node: { mediaItemUrl: logoMenu } } } } } } = props;
    const [currentPath, setCurrentPath] = useState("");
    const [active, setActive] = useState(false);

    useEffect(() => {
        setCurrentPath(window.location.pathname + "/");
    }, []);

    useEffect(() => {
        document.body.classList.toggle("menu-open", active);
    }, [active]);

    const handleClick = () => {
        setActive(!active);
    };

    const renderMenuItems = (items) => {
        return items.map((menuItem, index) => {
            const currentLink = menuItem.uri;
            const isActive = currentPath === currentLink;
            const activeClass = isActive ? 'item-active' : '';
            const hasChildItems = menuItem.childItems && menuItem.childItems.nodes.length > 0;

            return (
                <div key={index} className={`menu-item ${menuItem.cssClasses} ${activeClass}`}>
                    <Link href={`/${defaultLanguage}${menuItem.uri}`} onClick={handleClick}>
                        <span className={menuItem.cssClasses}>{parse(menuItem.label)}</span>
                    </Link>
                    {hasChildItems && (
                        <div className="submenu">
                            {renderMenuItems(menuItem.childItems.nodes)}
                        </div>
                    )}
                </div>
            );
        });
    };

    return (
        <div id="nav-mobile">
            <div className="main-menu">

                <Image
                    src={logo}
                    alt="Logo"
                    width={80}
                    height={50}
                    className='logo-mobile'
                />

                <button
                    id="togglemenumobile"
                    className='inline-flex p-1 rounded text-black ml-auto outline-none'
                    title="Open/close menu"
                    onClick={handleClick}
                >
                    <div id="btnhamgurgerclose">
                        <Image
                            src={iconoOpen}
                            alt="Icono Menú Open"
                            width={38}
                            height={14}
                        />
                    </div>

                    <div id="btnhamgurgeropen" className="relative">
                        <Image
                            src={iconoClose}
                            alt="Icono Menú Close"
                            width={21}
                            height={21}
                        />
                    </div>
                </button>

                <div id="menumobile" className={`${active ? 'active' : ''}`}>
                    <Image
                        src={logoMenu}
                        alt="Logo Menu"
                        width={85}
                        height={38}
                        className='logo-menu'
                    />

                    {renderMenuItems(menuppal)}

                    <div className="lang-switcher uppercase">
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>
        </div>
    );
}
