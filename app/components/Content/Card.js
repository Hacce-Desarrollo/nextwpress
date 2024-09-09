'use client'

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import parse from 'html-react-parser';


const Card = ({content,title,slug,imageAlt,imageLink,date}) => {
    return (
        <Link href={`/blog/${slug}`}>
            <div className="card-blog">
                <Image src={imageLink} width={500} height={500} alt={imageAlt}/>
                <div className='date'>{date}</div>
                <h2 className='h3-title'>{title}</h2>
                <div className='leermas'>Leer más</div>
            </div>
        </Link>
    )
}
     
export default Card;
