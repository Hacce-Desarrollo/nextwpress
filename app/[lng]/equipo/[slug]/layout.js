import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";

export const metadata = {
    title: 'Equipo single',
    description: 'Equipo single',
}

export default function RootLayout({ children, params: { slug, lng } }) {

    return (

        <div className={'pagina pagina-' + slug + ' idioma-' + lng}>

            <Header lng={lng} />

            {children}

            <Footer lng={lng} />

        </div>
        
    )

}