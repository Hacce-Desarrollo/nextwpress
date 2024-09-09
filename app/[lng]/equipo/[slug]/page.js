import graphqlWordpress from "@/lib/graphqlWordpress";
import Content from "@/app/components/Content/Content"
import NotFound from "@/app/not-found";
import SpacerHeight from "@/app/components/misc/SpacerHeight";
import Image from "next/image";
import { mainFont, mainFontBold } from "@/styles/fonts";
import styles from "@/styles/general.scss";
import React from 'react'; 
import { TabView, TabPanel } from 'primereact/tabview';
import {languages} from '@/app/i18n/index';
import Equipo from '@/app/components/Equipo/Equipo';
import { generatePageMetadata } from '@/utils/metadata';
import parse from 'html-react-parser';


export async function generateMetadata({ params: { slug, lng }}) {
    return await generatePageMetadata( slug, lng );
}

export async function generateStaticParams() {
    let pages = [];
    for ( let lng of languages ) {
        pages = pages.concat( await graphqlWordpress.getPersonas( lng ) );
    }
    return pages;
}

export default async function Post({params: { slug, lng}}) {

    const persona = await graphqlWordpress.getPersona( slug, lng );
    const equipo  = await graphqlWordpress.getPersonas( lng );

    if( ! persona ) {

        return (
            <container>
                <row>
                    <NotFound />
                </row>
            </container>
        )

    } else {

        return (

            <main id={"main"} className={"page_content_wrap slider-gallery " + mainFont.variable + " " + mainFontBold.variable}>

                <div className={styles.mainFont}>
                
                    <div className="section w-cabecera-default">

                        <div className="container">

                            <div className="mx-auto flex items-center flex-col md:flex-row">

                                <div className="md:w-1/2 lg:w-1/2 flex-col justify-start">
                                    <Image src={ persona.featuredImage?.node?.mediaItemUrl || null } width={590} height={663} alt={ persona.featuredImage?.node?.altText || '' } className="image-gallery"/>
                                </div>

                                <div className="md:w-1/2 lg:w-1/2 flex-col justify-start">
                                    <h1 className="h1-title text-primary">{ persona.title || '' }</h1>
                                    <p className="cargo text-primary">{ persona.equipo?.cargo || '' }</p>
                                    <Content content={ persona.content || '' } lng={lng} />
                                </div>

                            </div>

                        </div>

                    </div>
                    
                    <div className="section pt-0 ps-relative">

                        <div className="container">

                            <div className="mx-auto flex items-center flex-col md:flex-row">

                                <div className="flex-col justify-start slider-gallery">

                                    <TabView className="tabs-member">

                                        { persona.equipo?.formacionAcademica && (
                                            <TabPanel header="FORMACIÓN ACADÉMICA">
                                                <div>
                                                    { parse( persona.equipo?.formacionAcademica || '' ) }
                                                </div>
                                            </TabPanel>
                                        )}

                                        { persona.equipo?.formacionEspecializada && (
                                            <TabPanel header="FORMACIÓN ESPECIALIZADA">
                                                <div>
                                                    { parse( persona.equipo?.formacionEspecializada || '' ) }
                                                </div>                                                
                                            </TabPanel>
                                        )}

                                        { persona.equipo?.experienciaProfesional && (
                                            <TabPanel header="EXPERIENCIA PROFESIONAL">
                                                <div>
                                                    { parse( persona.equipo?.experienciaProfesional || '' ) }
                                                </div>       
                                            </TabPanel>
                                        )}

                                        { persona.equipo?.afiliacion && (
                                            <TabPanel header="AFILIACIÓN">
                                                <div>
                                                    { parse( persona.equipo?.afiliacion || '' ) }
                                                </div>
                                            </TabPanel>
                                        )}

                                    </TabView>

                                </div>
                                
                            </div>

                        </div>

                    </div>

                    <div className="section bg-grey">

                        <div className="container">

                            <div className="mx-auto flex items-center flex-col md:flex-row">

                                <div className="flex-col justify-start">
                                    <h2 className="h2-title text-primary">NUESTRO EQUIPO</h2>
                                    <SpacerHeight height="30"/>
                                </div>

                            </div>

                        </div>

                        <Equipo data={equipo} lng={lng} />

                    </div>

                </div>

            </main>

        );

    }  
    
}
