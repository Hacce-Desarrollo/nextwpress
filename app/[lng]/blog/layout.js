import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";

export const metadata = {
    title: 'Hacce Soluciones TIC',
    description: 'Hacce Soluciones TIC',
}

export default function RootLayout({ children, params: { slug, lng } }) {

    return (

        <div className={'blog blog-archivo idioma-' + lng}>

            <Header lng={lng} />

            {children}
            
            <Footer lng={lng} />

        </div>

    )

}