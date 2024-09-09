import Link from "next/link";
import Image from "next/image";

export default function CardPost( { blogItem, lng } ) {

    const date = new Date( blogItem.date );

    const formattedDate = date.toLocaleDateString(lng, {
        day:   '2-digit',
        month: '2-digit',
        year:  'numeric'
    });

    return (

        <div key={ blogItem.uri } className={ 'blog_item_wrap' }>

            <Link href={ '/' + lng + '/blog/' + blogItem.slug }
                  target={ blogItem.target ?? '_self' }
                  title={ blogItem.title }
                  className={ "block" }>

                <Image
                    src={ blogItem.featuredImage?.node?.mediaItemUrl || '' }
                    alt={ blogItem.featuredImage?.node?.altText || '' }
                    width="590"
                    height="660"
                    className="img_blog"
                 />

                <span className="blog_item_date">
                    { formattedDate }
                </span>

                <h3>
                    { blogItem.title }
                </h3>

            </Link>

        </div>

    )

}