// utils/metadata.js

import graphqlWordpress from '@/lib/graphqlWordpress';

export async function generatePageMetadata( slug, lng ) {

    const pageData = await graphqlWordpress.getPage( slug, lng );

    if( ! pageData ) {
        return null;
    }

    return {
        title: pageData.seo?.title || '',
        description: pageData.seo?.metaDesc || '',
        openGraph: {
            title: pageData.seo?.opengraphTitle || '',
            description: pageData.seo?.opengraphDescription || '',
            url: pageData.link || '',
            siteName: pageData.seo?.opengraphSiteName || '',
            images: [
                {
                    url: pageData.seo?.opengraphImage?.sourceUrl || '',
                    width: pageData.seo?.opengraphImage?.mediaDetails?.width || '',
                    height: pageData.seo?.opengraphImage?.mediaDetails?.height || '',
                }
            ],
            type: pageData.seo?.opengraphType || '',
        },
        robots: {
            index: pageData.seo?.metaRobotsNoindex || '',
            follow: pageData.seo?.metaRobotsNofollow || '',
        }
    };

}