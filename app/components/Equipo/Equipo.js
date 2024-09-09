'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Carousel } from 'primereact/carousel';

export default function BasicDemo({ data, lng }) {
    const [personas, setPersonas] = useState([]);

    useEffect(() => {
        // Ordenar de más antiguo a más nuevo (dateA - dateB)
        const sortedData = [...data].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB; // Ordenar de más antiguo a más nuevo
        });

        const mappedData = sortedData.map((team) => ({
            name: team.title,
            cargo: team.cargo,
            link: team.uri,
            imagen: team.imagen,
            date: team.date,
        }));

        setPersonas(mappedData);
    }, [data]);

    const personaTemplate = (persona) => {

        const linkWithLang = lng === 'es' ? `/${lng}${persona.link}` : `${persona.link}`;

        return (
            <div className="item-member">
                <Link href={linkWithLang} passHref>
                    <Image src={persona.imagen} width={590} height={663} alt={persona.name} className="member-photo" />
                    <div className="member-name">{persona.name}</div>
                    <div className="member-cargo">{persona.cargo}</div>
                </Link>
            </div>
        );
    };

    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 4,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    return (
        <div className="card card-carousel">
            <Carousel value={personas} numVisible={4} numScroll={1} responsiveOptions={responsiveOptions} itemTemplate={personaTemplate} circular />
        </div>
    );
}
