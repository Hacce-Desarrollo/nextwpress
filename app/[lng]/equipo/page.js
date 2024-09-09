import graphqlWordpress from '@/lib/graphqlWordpress';
import parse from "html-react-parser";
import Image from "next/image";
import { languages } from "@/app/i18n/index";
import { mainFont, mainFontBold } from "@/styles/fonts";
import styles from '@/styles/general.scss';
import SpacerHeight from '@/app/components/misc/SpacerHeight';
import Link from 'next/link';
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import { generatePageMetadata } from '@/utils/metadata';

export async function generateMetadata({ params: { lng }}) {
    return await generatePageMetadata( "equipo", lng );
}

export async function generateStaticParams() {
    return languages.map((lng) => ({ lng }));
}

export default async function equipo({ params: { slug, lng } }) {
    const pageData = await graphqlWordpress.getPage("equipo", lng);
    const personasData = await graphqlWordpress.getPersonas(lng);

    // Ordenar personasData por fecha ascendente
    const sortedPersonasData = personasData.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
    });

    return (
        
        <div className={'pagina equipo pagina-' + slug + ' idioma-' + lng}>

            <Header lng={lng} />
            
            <main id={"main"} className={"page_content_wrap " + mainFont.variable + " " + mainFontBold.variable}>
                
                <div className={styles.mainFont}>

                    <div className={'content_equipo'}>

                        {parse(pageData.content ?? '')}

                        <div className="container">

                            <div className='slider-gallery'>

                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">

                                    {sortedPersonasData.map((team, idx) => {
                                        const img = team.imagen;

                                        return (
                                            <div key={idx} className={'item-member full-team'}>
                                                <a href={`/${lng}/equipo/${team.slug}`}>
                                                    <Image
                                                        src={img}
                                                        width={'560'}
                                                        height={'360'}
                                                        alt={team.title}
                                                        className={'member-photo'}
                                                    />
                                                    <div className={'member-name'}>{team.title}</div>
                                                    <div className={'member-cargo'}>{team.cargo}</div>
                                                </a>
                                            </div>
                                        );
                                    })}

                                </div>

                            </div>

                        </div>

                        <div className="relative section pb-0">

                            <div className="container z-index-up relative">

                                <div className="flex flex-wrap">

                                    <div className="w-full md:w-1/2">

                                        <h2 className="text-primary h2-title">{pageData.infoEquipo.tituloContacto}</h2>

                                        <div className="text-primary">
                                            { parse( pageData?.infoEquipo?.descripcionContacto || '' ) }
                                        </div>

                                        <SpacerHeight height={30} />
                                        
                                        <div className="flex justify-start btn-primary btn-arrow-right btn-custom">
                                            <Link href={pageData.infoEquipo.enlaceContacto.url}>{pageData.infoEquipo.enlaceContacto.title}</Link>
                                        </div>

                                    </div>

                                    <div className="w-full md:w-1/2"></div>

                                </div>

                                <div className="flex flex-wrap">
                                    <div className="w-full"></div>
                                </div>

                            </div>

                            <div className="google_map">
                                <iframe width="100%" height="500" src={pageData.infoEquipo.iframeMapa}></iframe>
                            </div>

                        </div>

                    </div>

                </div>

            </main>

            <Footer lng={lng} />

        </div>
        
    );
}
