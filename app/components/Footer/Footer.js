import Image from "next/image";
import graphqlWordpress from "@/lib/graphqlWordpress";
import SpacerHeight from "../misc/SpacerHeight";
import LegalMenu from "./LegalMenu";
import Link from "next/link";
import BotonFlotante from "../misc/BotonFlotante";
import Breadcrumb from "@/utils/breadcrumbs";
import { getCurrentLanguage } from "@/app/i18n";


export default async function Footer() {

    const lng = getCurrentLanguage();

    const footer = await graphqlWordpress.getACF_footer();
    const menulegal = await graphqlWordpress.getMenu( "Legal-" + lng, lng);

    let logoFooter_src   = footer?.footer?.opcionesFooter?.logoFooter?.node?.mediaItemUrl ?? null;
    let logoFooter_alt   = footer?.footer?.opcionesFooter?.logoFooter?.node?.altText ?? '';
    let logoCalidad_src  = footer?.footer?.opcionesFooter?.logoCalidad?.node?.mediaItemUrl ?? null;
    let logoCalidad_alt  = footer?.footer?.opcionesFooter?.logoCalidad?.node?.altText ?? '';
    let footerInfo_dir   = footer?.generales?.opcionesGenerales?.direccion ?? null;
    let footerInfo_tel   = footer?.generales?.opcionesGenerales?.telefono ?? null;
    let footerInfo_mail  = footer?.generales?.opcionesGenerales?.email ?? null;
    let footerInfo_legal = footer?.footer?.opcionesFooter?.textoFooter ?? null;


    return (

        <>

            <footer id="footer" className="footer">

                <div className="wrapper-footer-widgets">

                    <div className="container">

                        <div className="mx-auto flex md:items-center items-start flex-col md:flex-row">

                            <div className="md:w-1/2 lg:w-1/2 flex-col justify-start">

                                { logoFooter_src && (
                                <Link href={ "/" + lng }>
                                    <Image src={logoFooter_src} alt={logoFooter_alt} width={135} height={61} />
                                </Link>
                                )}
                                
                                <SpacerHeight height="20" />

                                <div className="footer-contact-info">

                                    <p>{footerInfo_dir}</p>

                                    <p>
                                        { footerInfo_tel ? ( <Link href={"tel:" + footerInfo_tel.replace(/\s+/g, '')}>{footerInfo_tel}</Link> ) : null } 
                                        {" | "}
                                        { footerInfo_mail ? ( <Link href={"mailto:" + footerInfo_mail.replace(/\s+/g, '')}>{footerInfo_mail}</Link> ) : null }
                                    </p>

                                </div>

                            </div>

                            <div className="md:w-1/2 lg:w-1/2 flex justify-end md:justify-end flex-col items-end">

                                {logoCalidad_src && <Image className="md:mt-0 mt-[40px]" src={logoCalidad_src} alt={logoCalidad_alt} width={76} height={103} />}

                            </div>

                        </div>

                    </div>

                </div>

                <div className="wrapper-footer-colophon">

                    <div className="container">

                        <div className="mx-auto flex md:items-center items-start flex-col md:flex-row lg:flex-row">

                            <div className="md:w-1/2 lg:w-1/2 flex md:justify-start lg:justify-start md:mb-0 lg:mb-0">

                                <span className='text-legal'>{footerInfo_legal}</span>

                            </div>

                            <div className="md:w-1/2 lg:w-1/2 flex justify-end md:justify-center lg:justify-end text-legal flex-col items-end md:mt-0 mt-[30px]">

                                { menulegal && ( <LegalMenu lng={lng} menulegal={menulegal} /> ) }

                            </div>

                        </div>

                    </div>

                </div>

            </footer>

            <BotonFlotante lng={lng} />

            <Breadcrumb base_url={process.env.CMS_BASE} lng={lng} />

        </>
        
    )
}