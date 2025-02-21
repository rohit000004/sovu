import Link from "next/link";

export default function Windows() {
    return (

        <>

            <div className="ml-5 mt-5"><Link href="/">Back To All Products</Link></div>

            <div className="max-w-[1100px] mx-auto p-5">



                <div className="flex flex-wrap gap-[60px] justify-center mt-[70px]">

                    <div className="hover:scale-110 transition-transform cursor-pointer">
                        <Link href="/windows/aluminiumcasement">
                            <div className="text-center pb-3">Aluminium Casement Window</div>
                            <div><img src="/windows/casement.webp" height={220} width={220} alt="" /></div>
                        </Link>
                    </div>



                    <div className="hover:scale-110 transition-transform cursor-pointer">
                        <Link href="/windows/aluminiumfixed">
                            <div className="text-center pb-3">Aluminium Fixed Window</div>
                            <div><img src="/windows/fixed.webp" height={220} width={220} alt="" /></div>
                        </Link>
                    </div>



                    <div className="hover:scale-110 transition-transform cursor-pointer">
                        <Link href="/windows/aluminiumshaped">
                            <div className="text-center pb-3">Aluminium Shaped Window</div>
                            <div><img src="/windows/shaped.webp" height={220} width={220} alt="" /></div>
                        </Link>
                    </div>


                    <div className="hover:scale-110 transition-transform cursor-pointer">
                        <Link href="/windows/aluminiumupvc">
                            <div className="text-center pb-3">Aluminium UPVC Window</div>
                            <div><img src="/windows/upvc.webp" height={220} width={220} alt="" /></div>
                        </Link>
                    </div>

                </div>


            </div>
        </>
    );
}
