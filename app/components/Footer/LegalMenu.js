import React from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import { defaultLanguage } from "@/app/i18n/config";

export default async function LegalMenu({ menulegal, lng = defaultLanguage }) {

    const addLangPrefix = (uri) => {
        return uri.startsWith(`/${lng}`) ? uri : `/${lng}${uri}`;
    };

    return (
        <div id="legal-menu" className="text-right">
            <div className="legal-menu flex flex-row">
                {menulegal.map((menuItem, index) => (
                    <div key={index} className='menu-item'>
                        <Link href={addLangPrefix(menuItem.uri)}>{parse(menuItem.label)}</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}