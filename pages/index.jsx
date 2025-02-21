import Link from "next/link";

export default function Home() {
  return (

    <div className="max-w-[1000px] mx-auto p-5">

      <div className="flex flex-wrap gap-[80px] justify-center mt-[70px]">

        <div className="hover:scale-110 transition-transform cursor-pointer">
          <Link href="/doors">
            <div className="text-center pb-3">Doors</div>
            <div><img src="/home/doors.webp" height={220} width={220} alt="" /></div>
          </Link>
        </div>



        <div className="hover:scale-110 transition-transform cursor-pointer">
          <Link href="/windows">
            <div className="text-center pb-3">Windows</div>
            <div><img src="/home/window.webp" height={220} width={220} alt="" /></div>
          </Link>
        </div>



        <div className="hover:scale-110 transition-transform cursor-pointer">
          <Link href="/roofproducts">
            <div className="text-center pb-3">Roof Products</div>
            <div><img src="/home/rooflight.webp" height={220} width={220} alt="" /></div>
          </Link>
        </div>

      </div>


    </div>
  );
}
