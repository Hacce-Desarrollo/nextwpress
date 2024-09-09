import graphqlWordpress from '@/lib/graphqlWordpress';
import Link from 'next/link';
import BotonContacto from '@/public/images/floating-whatsapp.svg';
import Image from "next/image";
import { getCurrentLanguage } from '@/app/i18n';

export default async function BotonFlotante() {

    const lng = getCurrentLanguage();
    
    const menuflotante = await graphqlWordpress.getMenu( "menuFlotante-" + lng, lng );

    const menuItem = menuflotante && menuflotante.length > 0 ? menuflotante[0] : null;

    if (!menuItem) {
        return null;
    }

    const menuUri = menuItem.uri.startsWith(`/${lng}`) ? menuItem.uri : `/${lng}${menuItem.uri}`;

    return (

    <div className="boton-flotante">
        <div>
            <Link href={menuUri}>
                <Image src={BotonContacto} alt="Botón Contacto" width={76} height={76}/>
            </Link>
        </div>
    </div>
    
    );
}