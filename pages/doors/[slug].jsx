import { useRouter } from 'next/router';
import Bifold from '@/components/doors/bifold';
import French from '@/components/doors/french';
import Patio from '@/components/doors/patio';
import Single from '@/components/doors/single'

export default function DoorForm() {

    const router = useRouter();
    const { slug } = router.query;

    const componentMapping = {
        bifold: Bifold,
        french: French,
        patio: Patio,
        single: Single
    };

    const SelectedComponent = componentMapping[slug];


    return (
        <>
            {SelectedComponent ? (<SelectedComponent />) : (<p></p>)}
        </>
    );
}
