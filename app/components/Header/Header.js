import MainMenu from '@/app/components/Header/MainMenu';
import MainMenuMobile from './MainMenuMobile';
import graphqlWordpress from '@/lib/graphqlWordpress';
import { getCurrentLanguage } from '@/app/i18n';

export default async function Header() {

    const lng = getCurrentLanguage();

    const menuppal = await graphqlWordpress.getMenu( "menuPrincipal-" + lng, lng );
    const logo     = await graphqlWordpress.getLogo();

    const renderMenus = menuppal && logo;

    return (

        <header>

            { renderMenus ? (

                <>
                
                    <MainMenu menuppal={menuppal} logo={logo} lng={lng} />

                    <MainMenuMobile menuppal={menuppal} logo={logo} logoMenu={logo} />

                </>
            
            ) : null }

        </header>

    )

}