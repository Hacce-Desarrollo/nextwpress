import graphqlWordpress from "@/lib/graphqlWordpress";
import Content from "@/app/components/Content/Content";
import { mainFont, mainFontBold } from "@/styles/fonts";
import styles from '@/styles/general.scss';
import { languages } from "@/app/i18n/index";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import Equipo from "@/app/components/Equipo/Equipo";
import SpacerHeight from "@/app/components/misc/SpacerHeight";
import Image from "next/image";
import Link from "next/link";
import parse from 'html-react-parser';
import { generatePageMetadata } from "@/utils/metadata";
import SliderGallery from "../components/SliderGallery/SliderGallery";

export async function generateMetadata({ params: { lng, uri }}) {
    const page = lng === 'es' ? 'inicio' : lng === 'en' ? 'home' : 'default-page';
    return await generatePageMetadata( page, lng );
}

export async function generateStaticParams() {
    const paths = languages.map((lng) => ({ lng }))
    return paths
}

export default async function Home({ params: { lng } }) {
    const page          = await graphqlWordpress.getPage( "inicio", lng );
    const equipo        = await graphqlWordpress.getPersonas( lng );
    const sliderGallery = await page?.sliderGallery || null;

    if( ! page ) {
        return null;
    }

    return (

    <div className={'pagina pagina-inicio idioma-' + lng}>

        <Header lng={lng} />

        <div className={`${mainFont.variable} ${mainFontBold.variable}`}>

            <Content content={page.content} className={styles.mainFont} lng={lng} />

            {equipo && (
            <div className="section pt-0">
                <div className="team-container slider-gallery">
                    <div className="container">
                        <div className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-3 wp-block-columns-is-layout-flex">
                            <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" >
                                <h2 className="wp-block-heading h2-title text-primary md:text-left text-center">{ page.infoInicio?.tituloNuestroEquipo || '' }</h2>
                                <div className="text-primary md:text-left text-center">
                                    { parse( page?.infoInicio?.descripcionNuestroEquipo || '' ) }
                                </div>
                                <SpacerHeight height="46" />
                            </div>
                            <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" ></div>
                        </div>
                    </div>
                    <Equipo data={equipo} lng={lng} />
                </div>
            </div>
            )}

            { ( sliderGallery && sliderGallery.slider_gallery ) && (
                <SliderGallery data={sliderGallery} lng={lng} />
            )}

            <div className="wp-block-hacce-wrapper cta-blue">

                <div className="wp-block-cover text-center">

                    <span aria-hidden="true" className="wp-block-cover__background has-background-dim"></span>

                    <Image src={ page.infoInicio?.imagenDelFondo?.node?.mediaItemUrl || '' } width={900} height={417} alt={ page.infoInicio?.imagenDelFondo?.node?.altText || '' } className="wp-block-cover__image-background" />

                    <div className="wp-block-cover__inner-container is-layout-constrained wp-block-cover-is-layout-constrained">

                        <div className="wp-block-group double-img is-nowrap is-layout-flex wp-container-core-group-is-layout-1 wp-block-group-is-layout-flex">

                            <figure className="wp-block-image">
                                <Image src={ page.infoInicio?.imagen1?.node?.mediaItemUrl || '' } width={509} height={79} alt={ page.infoInicio?.imagen2?.node?.altText || '' } className="wp-image-165" />
                            </figure>

                        </div>

                        <SpacerHeight height="40" />

                        <div className="has-text-align-center">
                            { parse( page?.infoInicio?.textoCta || '' ) }
                        </div>

                        <SpacerHeight height="28" />

                        <div className="wp-block-buttons btn-custom btn-white is-content-justification-center is-layout-flex wp-container-core-buttons-is-layout-2 wp-block-buttons-is-layout-flex">
                            <div className="wp-block-button">
                                { page.infoInicio?.enlace?.url ? (
                                <Link href={ page.infoInicio.enlace.url || '' } passHref>
                                    { page.infoInicio?.enlace?.title || '' }
                                </Link>
                                ) : null }
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            { page.infoInicio?.descripcionContacto ? (
            <div className="section">
                <div className="slider-gallery">
                    <div className="container">
                        <div className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-3 wp-block-columns-is-layout-flex">
                            <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" >
                                <h2 className="wp-block-heading h2-title text-primary md:text-left text-center">{ page.infoInicio?.tituloContacto || '' }</h2>
                                <div className="text-primary md:text-left text-center">
                                    { parse( page.infoInicio?.descripcionContacto || '' )}
                                </div>
                                <SpacerHeight height="34" />
                                <div className="wp-block-buttons btn-primary btn-arrow-right btn-custom is-content-justification-left is-layout-flex wp-container-core-buttons-is-layout-3 wp-block-buttons-is-layout-flex md:text-left text-center">
                                    <div className="wp-block-button">
                                        { page.infoInicio?.enlaceContacto?.url ? (
                                        <Link href={ page.infoInicio.enlaceContacto.url || '' } passHref>
                                            { page.infoInicio?.enlaceContacto?.title || '' }
                                        </Link>
                                        ): null }
                                    </div>
                                </div>
                            </div>
                            <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" ></div>
                        </div>
                    </div>
                </div>                
            </div>            
            ) : 
            <SpacerHeight height="200" /> 
            }
            
        </div>

        <Footer lng={lng} />
        
    </div>

    );
}