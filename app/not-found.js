import { mainFont, mainFontBold } from "@/styles/fonts"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import { getCurrentLanguage } from "./i18n"


export default function NotFound() {

	const currentLng = getCurrentLanguage();
    
  	return (
    
		<div className={'pagina pagina-404 idioma-' + currentLng}>

        	<Header lng={currentLng} />

			<div className={`${mainFont.variable} ${mainFontBold.variable}`}>

				<container>

					<row>

						<div className="content-404">
							
							<h1>404 - Page Not Found</h1>
							
						</div>

					</row>

				</container>

			</div>

			<Footer lng={currentLng} />

		</div>
					
	)

}