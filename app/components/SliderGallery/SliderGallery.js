"use client";

import Image from 'next/image';
import { Carousel } from 'primereact/carousel';
import parse from 'html-react-parser';
import SpacerHeight from '../misc/SpacerHeight';
import { useEffect, useState } from 'react';


export default function SliderGallery(props) {

    const elementID_target = 'sliderGalleryTarget'; // Debemos crear un div con este ID en el content de Wordpress
    const elementID_source = 'sliderGallerySource'; // Es nuestro componente a sustituir

    const [isVisible, setIsVisible] = useState( false );

    useEffect(() => {
        
        // Reemplaza el elemento target con el elemento source
        const replaceTargetWithSource = () => {
            const element_target = document.querySelector( '#' + elementID_target ) || null;            
            if ( element_target ) {
                const parent = element_target.parentNode || null;
                if ( parent ) {
                    const element_source = document.querySelector( '#' + elementID_source ) || null;
                    if( element_source && element_source.getAttribute( 'data-replace' ) == "true" ) {
                        parent.replaceChild( element_source, element_target );
                    }
                }
            }
            setIsVisible( true );
        };

        replaceTargetWithSource();        

    }, [] );



    const galleryTemplate = (item) => {
        return (         
            <div className="item-gallery">
                <Image src={item.imagen} width={590} height={663} alt={item.name} className="member-photo"/>
            </div>
        );
    };

    const responsiveOptions = [
        { breakpoint: '1400px', numVisible: 3, numScroll: 1 },
        { breakpoint: '1199px', numVisible: 3, numScroll: 1 },
        { breakpoint: '767px',  numVisible: 2, numScroll: 1 },
        { breakpoint: '575px',  numVisible: 1, numScroll: 1 }
    ];
    const gallery = props.data?.slider_gallery?.nodes || null;
    const images = [];

    if( gallery ) {

        gallery.map ((item, index) => (
            images.push({
                imagen: item.mediaItemUrl,
            })
        ));
        
    }

    return (

        <>

            <div id={elementID_source} className={`section pt-0 ${isVisible ? '' : 'hidden'}`} data-replace="true">

                <div className="slider-gallery">

                    <div className="container">

                        <div className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-3 wp-block-columns-is-layout-flex">

                            <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" >

                                <h2 className="wp-block-heading h2-title text-primary md:text-left text-center">
                                    { parse( props.data.slider_title || '' ) }
                                </h2>

                                <div className="text-primary md:text-left text-center">
                                    { parse( props.data.slider_description || '' ) }
                                </div>

                                <SpacerHeight height="46" />

                            </div>

                            <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow"></div>

                        </div>

                    </div>

                    <div className="card card-carousel">
                        <Carousel value={images} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions} autoplayInterval={5000} itemTemplate={galleryTemplate} circular />            
                    </div>

                </div>

            </div>

        </>
        
    )
}
