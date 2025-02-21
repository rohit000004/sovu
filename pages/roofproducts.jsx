import Link from "next/link";

export default function Rooftops() {
    return (

        <>

            <div className="ml-5 mt-5"><Link href="/">Back To All Products</Link></div>

            <div className="max-w-[1100px] mx-auto p-5">


                <div className="flex flex-wrap gap-[60px] justify-center mt-[70px]">



                    <div className="hover:scale-110 transition-transform cursor-pointer">
                        <Link href="/roof/aluminiumrooflantern">
                            <div className="text-center pb-3">Aluminium Roof Lantern</div>
                            <div><img src="/rooftop/lantern.webp" height={220} width={220} alt="" /></div>
                        </Link>
                    </div>



                    <div className="hover:scale-110 transition-transform cursor-pointer">
                        <Link href="/roof/aluminiumflatroof">
                            <div className="text-center pb-3">Aluminium Flat Roof Light</div>
                            <div><img src="/rooftop/rooflight.webp" height={220} width={220} alt="" /></div>
                        </Link>
                    </div>



                </div>


            </div>
        </>
    );
}
