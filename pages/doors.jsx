import Link from "next/link";

export default function Doors() {
    return (

        <>

            <div className="ml-5 mt-5"><Link href="/">Back To All Products</Link></div>

            <div className="max-w-[1100px] mx-auto p-5">



                <div className="flex flex-wrap gap-[60px] justify-center mt-[70px]">

                    <div className="hover:scale-110 transition-transform cursor-pointer">
                        <Link href="/doors/bifold">
                            <div className="text-center pb-3">Aluminium Bifold</div>
                            <div><img src="/doors/bifold.webp" height={220} width={220} alt="" /></div>
                        </Link>
                    </div>



                    <div className="hover:scale-110 transition-transform cursor-pointer">
                        <Link href="/doors/french">
                            <div className="text-center pb-3">Aluminium French Doors</div>
                            <div><img src="/doors/french.webp" height={220} width={220} alt="" /></div>
                        </Link>
                    </div>



                    <div className="hover:scale-110 transition-transform cursor-pointer">
                        <Link href="/doors/patio">
                            <div className="text-center pb-3">Aluminium Patio</div>
                            <div><img src="/doors/patio.webp" height={220} width={220} alt="" /></div>
                        </Link>
                    </div>


                    <div className="hover:scale-110 transition-transform cursor-pointer">
                        <Link href="/doors/single">
                            <div className="text-center pb-3">Aluminium Single Door</div>
                            <div><img src="/doors/single.webp" height={220} width={220} alt="" /></div>
                        </Link>
                    </div>

                </div>


            </div>
        </>
    );
}
