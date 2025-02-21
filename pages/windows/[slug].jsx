import { useRouter } from 'next/router';
import AluminiumCasement from '@/components/windows/aluminium-casement';
import AluminiumFixed from '@/components/windows/aluminium-fixed';
import AluminiumShaped from '@/components/windows/aluminium-shaped';
import Aluminiumupvc from '@/components/windows/aluminium-upvc';

export default function DoorForm() {

    const router = useRouter();
    const { slug } = router.query;

    const componentMapping = {
        aluminiumcasement: AluminiumCasement,
        aluminiumfixed: AluminiumFixed,
        aluminiumshaped: AluminiumShaped,
        aluminiumupvc: Aluminiumupvc,

    };

    const SelectedComponent = componentMapping[slug];


    return (
        <>
            {SelectedComponent ? (<SelectedComponent />) : (<p></p>)}
        </>
    );
}
