import graphqlWordpress from '@/lib/graphqlWordpress';
import parse from "html-react-parser";
import Image from "next/image";
import { languages } from "@/app/i18n/config";
import { mainFont, mainFontBold } from "@/styles/fonts";
import styles from '@/styles/general.scss';
import FormContact from '@/app/components/Forms/FormContact';
import iconoLocalizacion from '@/public/images/icono-localizacion.svg';
import iconoTelefono from '@/public/images/icono-telefono.svg';
import iconoEmail from '@/public/images/icono-email.svg';
import Link from 'next/link';
import { TabView, TabPanel } from 'primereact/tabview';
import { generatePageMetadata } from '@/utils/metadata';


export async function generateMetadata( { params: { lng } } ) {
    return await generatePageMetadata( "contacto", lng );
}

export async function generateStaticParams() {
    return languages.map( (lng) => ( { lng } ) );
}

export default async function equipo({ params: { lng } }) {
    const pageData = await graphqlWordpress.getPage( "contacto", lng );
    const footer = await graphqlWordpress.getACF_footer();

    // Traducciones para funciones asíncronas
    let labels = [];
    labels['request_info'] = 'Quiero información';
    switch (lng) {        
        case 'en':
            labels['request_info'] = 'Request info';
            break;    
        default:
            break;
    }

    if( ! pageData ) {
        return null;
    }

    return (
        <>
            <main id={"main"} className={ "page_content_wrap contact_page " + mainFont.variable + " " + mainFontBold.variable }>

                <div className={styles.mainFont}>

                    { parse( pageData.content ?? '' ) }

                    <div className="section pt-0 ps-relative">

                        <div className="bloque-cta cta-right">

                            <div className="container">

                                <div className="cta-info bg-blue text-white">

                                    <Image
                                        src={ pageData.infoContacto?.imagenLogo?.node?.mediaItemUrl || '' }
                                        alt={ pageData.infoContacto?.imagenLogo?.node?.altText || '' }
                                        width={142}
                                        height={65}
                                    />

                                    <h2 className="h2-title">{ pageData.infoContacto?.tituloDelBloque || '' }</h2>

                                    <div className="contenido">

                                        <TabView className="tabs-forms">

                                            <TabPanel header={ labels['request_info'] }>
                                                <FormContact lng={lng} />
                                            </TabPanel>

                                        </TabView>

                                    </div>

                                </div>

                                <div className="block-contact-info">

                                    <div className="contact-info-item">

                                        <Image
                                            src={iconoLocalizacion}
                                            alt='Icon'
                                            width={35}
                                            height={50}
                                        />

                                        <span>{ footer?.generales?.opcionesGenerales?.direccion || '' }</span>

                                    </div>

                                    <div className="contact-info-item">

                                        <Image
                                            src={iconoTelefono}
                                            alt='Icon'
                                            width={35}
                                            height={50}
                                        />

                                        <span>{ footer?.generales?.opcionesGenerales?.telefono || '' }</span>

                                    </div>

                                    <div className="contact-info-item">

                                        <Image
                                            src={iconoEmail}
                                            alt='Icon'
                                            width={35}
                                            height={50}
                                        />

                                        <span>
                                            <Link href={ 'mailto:' + footer?.generales?.opcionesGenerales?.email || '' }>
                                                { footer?.generales?.opcionesGenerales?.email || '' }
                                            </Link>
                                        </span>

                                    </div>

                                </div>
                            </div>

                            <div className="img-fondo fondo-form" style={{ backgroundImage: `url(${ pageData.infoContacto?.imagenFondo?.node?.mediaItemUrl || '' })` }} >

                                <Image
                                    className="img-mobile"  
                                    src={ pageData.infoContacto?.imagenFondo?.node?.mediaItemUrl || '' }
                                    alt={ pageData.infoContacto?.imagenFondo?.node?.altText || '' }
                                    width={768}
                                    height={406}
                                />

                            </div>                            

                        </div>

                    </div>

                </div>

            </main>

        </>

    )

}
