import { useRouter } from 'next/router';
import AluminiumRoofLantern from '@/components/roof/aluminium-roof-lantern';
import AluminiumFlatRoof from '@/components/roof/aluminium-flat-roof';

export default function DoorForm() {

    const router = useRouter();
    const { slug } = router.query;

    const componentMapping = {
        aluminiumrooflantern: AluminiumRoofLantern,
        aluminiumflatroof: AluminiumFlatRoof

    };

    const SelectedComponent = componentMapping[slug];


    return (
        <>
            {SelectedComponent ? (<SelectedComponent />) : (<p></p>)}
        </>
    );
}
