import parse from 'html-react-parser';
import graphqlWordpress from "@/lib/graphqlWordpress";
import { mainFont, mainFontBold } from "@/styles/fonts";
import styles from '@/styles/general.scss';
import {languages} from '@/app/i18n/config';
import { generatePageMetadata } from '@/utils/metadata';
import SliderGallery from "@/app/components/SliderGallery/SliderGallery";

export async function generateMetadata({ params: { slug, lng }}) {
    return await generatePageMetadata( slug, lng );
}

export async function generateStaticParams() {
    let pages = [];
    const excludedPages = ['blog', 'contacto', 'equipo'];

    for (let lng of languages) {
        const allPages = await graphqlWordpress.getPages(lng);
        const filteredPages = allPages.filter(page => !excludedPages.includes(page.slug));
        pages = pages.concat(filteredPages);
    }    
    return pages;
}



export default async function Page({params: { slug, lng }}) {

    const pageData = await graphqlWordpress.getPage( slug, lng ) || null;
    const sliderGallery = pageData?.sliderGallery || null;    

    if ( pageData ) {

        return (
            <>
                <main id={"main"} className={"page_content_wrap " + mainFont.variable + " " + mainFontBold.variable}>

                    <div className={styles.mainFont}>

                        { parse( pageData.content ?? '' ) }

                        { ( sliderGallery && sliderGallery.slider_gallery ) && ( 
                            <SliderGallery data={sliderGallery} lng={lng} /> 
                        )}
                        
                    </div>

                </main> 
            </>
        )

    } else {

        return (
            <>
                <main>
                    Esta página no existe!!!
                </main>
            </>
        )

    }
}

