import graphqlWordpress from "@/lib/graphqlWordpress";
import Content from "@/app/components/Content/Content";
import { mainFont, mainFontBold } from "@/styles/fonts";
import styles from "@/styles/general.scss";
import { languages } from "@/app/i18n/index";
import CardPost from "@/app/components/cardPost/CardPost";
import { generatePageMetadata } from '@/utils/metadata';
import SpacerHeight from "@/app/components/misc/SpacerHeight";


export async function generateMetadata({ params: { lng }}) {
    return await generatePageMetadata( "blog", lng );
}

export async function generateStaticParams() {
    return languages.map( (lng) => ( { lng } ) );
}

export default async function Blog({ params: { lng } }) {

    const pageData = await graphqlWordpress.getPage( "blog", lng );
    const postsData = await graphqlWordpress.getPosts();

    if( ! postsData ) {
        return null;
    }

    return (

        <>

            <main id={"main"} className={"page_content_wrap " + mainFont.variable + " " + mainFontBold.variable}>

                <div className={styles.mainFont}>

                    <Content content={pageData?.content || null} className={styles.mainFont} lng={lng} />

                    <div className={'blog_list'}>

                        <div className={'container mx-auto'}>

                            <div className={'grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3'}>

                                { postsData.map( ( blogItem, idx ) => {

                                    return ( 
                                        <CardPost key={blogItem.slug} blogItem={blogItem} lng={lng} />
                                    ) } )

                                }

                            </div>

                        </div>

                    </div>

                    <SpacerHeight height="75" />

                </div>

            </main>

        </>

    )

}