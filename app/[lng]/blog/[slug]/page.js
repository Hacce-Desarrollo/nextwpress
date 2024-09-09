import graphqlWordpress from "@/lib/graphqlWordpress";
import Content from "@/app/components/Content/Content"
import NotFound from "@/app/not-found";
import SpacerHeight from "@/app/components/misc/SpacerHeight";
import Image from "next/image";
import { mainFont, mainFontBold } from "@/styles/fonts";
import styles from "@/styles/general.scss";
import {languages} from '@/app/i18n/index';
import { generatePageMetadata } from '@/utils/metadata';


export async function generateMetadata({ params: { slug, lng }} ) {
    return await generatePageMetadata( slug, lng );
}

export async function generateStaticParams() {
    let posts = [];
    for ( let lng of languages ) {
        posts = posts.concat( await graphqlWordpress.getPostsPaths( lng ) );
    }
    return posts;
}

export default async function Page({ params: {uri, slug} }) {

    const post = await graphqlWordpress.getPost( slug );

    if( ! post ) {

        return (
        <>
            <container>
                <row>
                    <NotFound />
                </row>
            </container>
        </>
        )

    } else {

        const formattedDate = new Date( post.date ).toLocaleDateString( 'es-ES', {
            day:   'numeric',
            month: 'long',
            year:  'numeric'
        });

        return (

        <>
            <main id={"main"} className={"page_content_wrap blog-single " + mainFont.variable + " " + mainFontBold.variable}>

                <div className={styles.mainFont}>

                    <div class="fixed-post-image" style={{backgroundImage:`url(${post.featuredImage?.node?.mediaItemUrl || null})`}}></div>

                    {/*<Image src={ post.featuredImage?.node?.mediaItemUrl || null } width={1920} height={800} alt={ post.featuredImage?.node?.altText || '' } />*/}

                    <div className="container">

                        <div class="post-content-single">

                            <div className="row">

                                <h1 className="wp-block-heading h1-title text-primary">{ post.title }</h1>

                                <div class="date">{ formattedDate }</div>

                                <Content content={ post.content } />

                            </div>

                        </div>

                    </div>

                    <SpacerHeight height="100" />

                </div>

            </main>

        </>

        );

    }  
    
}
