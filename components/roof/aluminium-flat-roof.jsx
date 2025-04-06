import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from 'next/router';


export default function AluminiumFlatRoof() {

    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, setValue, trigger, watch } = useForm({ mode: "onChange", });

    const [active, setactive] = useState(false);
    const [currentstep, setcurrentstep] = useState(1);

    const [values, setvalues] = useState({
        name: "Aluminium Flat Roof",
        dimensions: "",
        outsidecolor: "",
        insidecolor: "",
        glass: "",
        notes: "",
    });

    useEffect(() => { setactive(validateStep(currentstep, values)); }, [values, currentstep]);

    const stepValidationRules = {
        1: ["dimensions"],
        2: ["outsidecolor"],
        3: ["insidecolor"],
        4: ["glass"],

    };

    const nextStep = () => {
        if (validateStep(currentstep, values)) {
            setcurrentstep((prev) => prev + 1);
        }
    };

    const prevStep = () => {
        setcurrentstep((prev) => {
            const newStep = prev - 1;
            setactive(validateStep(newStep, values));
            return newStep;
        });
    };


    const validateStep = (step, values) => {
        if (!stepValidationRules[step]) return true;

        return stepValidationRules[step].every((field) => values[field] !== "");
    };





    //Step 1
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");

    const dimensions = [
        { label: "Select Dimension", value: "" },
        { label: "1500 x 1000 mm", value: "1500 x 1000" },
        { label: "2000 x 1000 mm", value: "2000 x 1000" },
        { label: "2000 x 1500 mm", value: "2000 x 1500" },
        { label: "2500 x 1000 mm", value: "2500 x 1000" },
        { label: "2500 x 1500 mm", value: "2500 x 1500" },
        { label: "2500 x 2000 mm", value: "2500 x 2000" },
        { label: "3000 x 1000 mm", value: "3000 x 1000" },
        { label: "3000 x 1500 mm", value: "3000 x 1500" },
        { label: "3000 x 2000 mm", value: "3000 x 2000" },
    ];

    const [selectedDimension, setSelectedDimension] = useState("");
    const [madeToMeasure, setMadeToMeasure] = useState(false);
    const handleDimensionSelect = (event) => {
        const selectedValue = event.target.value;
        setSelectedDimension(selectedValue);

        if (selectedValue) {
            const [dimWidth, dimHeight] = selectedValue.split(" x ");
            setWidth(dimWidth);
            setHeight(dimHeight);
        } else {
            setWidth("");
            setHeight("");
        }

        setvalues((prev) => {
            const newValues = { ...prev, dimensions: selectedValue, width, height };
            setactive(validateStep(currentstep, newValues));
            return newValues;
        });
    };







    // Step 2 and step 3
    const [showInside, setShowInside] = useState(true);

    const [outsidecolor, setoutsidecolor] = useState("");
    const [selectedoutsideImage, setselectedoutsideImage] = useState(null);
    const [selectColor, setselectColor] = useState(null);

    const colorOptionsoutside = {
        Anthracite: { color: "#383E42", Outsideimage: "/rooftop/flatroof/flatroofimg.png", Insideimage: "/rooftop/flatroof/flatroofimg.png", },
    };

    const colorOptionsinside = {
        Anthracite: { color: "#383E42", Outsideimage: "/rooftop/flatroof/flatroofimg.png", Insideimage: "/rooftop/flatroof/flatroofimg.png", },
    };


    const handleoutsideColorChange = (name) => {
        setoutsidecolor(name);
        setselectedoutsideImage(colorOptionsoutside[name].Outsideimage);


        setvalues((prev) => {
            const newValues = { ...prev, outsidecolor: name };
            setactive(validateStep(currentstep, newValues));
            return newValues;
        });
        setselectColor(colorOptionsoutside[name].color);
    };


    const [insidecolor, setinsidecolor] = useState("");
    const [selectedinsideImage, setselectedinsideImage] = useState(null);

    const handleinsideColorChange = (name) => {
        setinsidecolor(name);
        setselectedinsideImage(colorOptionsinside[name].Insideimage);

        setvalues((prev) => {
            const newValues = { ...prev, insidecolor: name };
            setactive(validateStep(currentstep, newValues));
            return newValues;
        });
        setselectColor(colorOptionsoutside[name].color);
    };


    // Step 4

    const [selectglass, setselectglass] = useState(null);

    const Glass = [
        { name: 'Clear', image: '/rooftop/aluminium-lantern/clear.png', },
        // { name: 'Blue Solar Control', image: '/rooftop/aluminium-lantern/clear.png', },
    ];

    const handleglass = (glass) => {
        setselectglass(glass);
        setvalues((prev) => {
            const newValues = { ...prev, glass: glass };
            setactive(validateStep(currentstep, newValues));
            return newValues;
        });
    }


    // Step 5
    const [message, setMessage] = useState("");

    const handleNotes = (event) => {
        setMessage(event.target.value);
        setvalues((prev) => {
            const newValues = { ...prev, notes: event.target.value };
            return newValues;
        });
    };

    console.log(values);

    const sections = [
        { id: 1, title: 'Dimensions' },
        { id: 2, title: 'Outside Colour' },
        { id: 3, title: 'Inside Colour' },
        { id: 4, title: 'Glass' },
        { id: 5, title: 'Notes' },
    ];



    const startstep = 1;
    const maxsteps = 4;
    const widthValue = watch("width", "");
    const heightValue = watch("height", "");


    const handleSubmitLast = () => {
        const formattedValues = Object.fromEntries(
            Object.entries(values).map(([key, value]) => {
                if (typeof value === 'object' && value !== null) {
                    return [key, JSON.stringify(value)];
                }
                return [key, value];
            })
        );

        router.push({
            pathname: '/receipt',
            query: formattedValues,
        });
    };



    return (
        <>
            <div className="flex justify-center pt-2">
                <Link href="/">Back To All Products</Link>
            </div>



            <div className="flex md:justify-end justify-center md:mr-[100px] md:pt-0 pt-3">
                <div className="flex gap-10 border border-gray-500 py-1.5 px-3 rounded-lg">
                    <div className="flex gap-5">
                        <div className="font-bold">Width</div>
                        <div>{width} mm</div>
                    </div>
                    <div className="flex gap-5">
                        <div className="font-bold">Height</div>
                        <div>{height} mm</div>
                    </div>
                </div>
            </div>



            <div className="md:w-[500px] md:ml-[50%] my-[2%]">
                <div className="flex  justify-between px-5">
                    <div className="md:w-[250px]">
                        {currentstep >= startstep + 1 && <button className="bg-[black] text-white font-bold py-2 px-3 rounded-md hover:scale-105 transition-transform text-sm active:translate-y-1" onClick={prevStep}> {`< PREVIOUS`}</button>}
                    </div>

                    <div className="md:w-[250px]  md:pl-[25%]">
                        {currentstep <= maxsteps && active && <button className="bg-[black] text-white font-bold py-2 px-3 rounded-md hover:scale-105 transition-transform text-sm tracking-wider active:translate-y-1" onClick={nextStep}>{`NEXT >`}</button>}
                    </div>
                </div>
            </div>





            <div className="flex md:flex-row flex-col-reverse gap-5">

                <div className="md:w-[35%]">

                    {(currentstep == 1 || currentstep == 2 || currentstep == 3 || currentstep == 4 || currentstep == 5) &&
                        <>
                            <div className="flex justify-center mt-10">
                                <img src="/rooftop/flatroof/flatroofimg.png" height={300} width={450} alt="" />
                            </div>
                        </>
                    }

                </div>



                <div className="md:w-[65%] pt-5">


                    {currentstep == 1 &&
                        <>
                            <div className="md:w-[800px] mx-auto">
                                <div className="font-bold text-[30px] text-center pb-5">Dimensions</div>
                                <p className="text-center pb-5">Sizes are based on external timber upstand</p>




                                <div className="flex justify-center gap-10 flex-wrap cursor-pointer px-3 md:px-0">

                                    <select id="dimension" value={selectedDimension} onChange={handleDimensionSelect}
                                        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                                    >
                                        {dimensions.map((dim) => (
                                            <option key={dim.value} value={dim.value}>
                                                {dim.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>


                            </div>
                        </>
                    }



                    {currentstep == 2 &&
                        <div className="md:w-[800px] mx-auto">

                            <div className="font-bold text-[30px] text-center pb-5">External Color</div>

                            <div className="flex flex-wrap justify-center gap-10 cursor-pointer px-2 md:px-0">

                                {Object.entries(colorOptionsoutside).map(([name, { color }]) => (
                                    <div key={name} className={`p-3 rounded-md border border-[#dfdede] hover:bg-[#e2f4f4] 
                            ${outsidecolor === name ? "border-[#016252] bg-[#e2f4f4]" : " border-[#949596]"}
                        `} onClick={() => handleoutsideColorChange(name)} >

                                        <div className="md:w-[200px] md:h-[150px] w-[130px] h-[100px]" style={{ backgroundColor: color }} ></div>
                                        <div className="text-center pt-2 pb-1">{name}</div>
                                    </div>
                                ))}

                            </div>

                        </div>
                    }


                    {currentstep == 3 &&
                        <div className="md:w-[500px] mx-auto">

                            <div className="font-bold text-[30px] text-center pb-5">Internal Color</div>

                            <div className="flex flex-wrap justify-center gap-10 cursor-pointer px-2 md:px-0">

                                {Object.entries(colorOptionsinside).map(([name, { color, image }]) => (
                                    <div key={name} className={`p-3 rounded-md border border-[#dfdede] hover:bg-[#e2f4f4] 
                            ${insidecolor === name ? "border-[#016252] bg-[#e2f4f4]" : " border-[#949596]"}
                        `} onClick={() => handleinsideColorChange(name)} >

                                        <div className="md:w-[200px] md:h-[150px] w-[130px] h-[100px]" style={{ backgroundColor: color }} ></div>
                                        <div className="text-center pt-2 pb-1">{name}</div>
                                    </div>
                                ))}

                            </div>

                        </div>
                    }



                    {currentstep === 4 &&
                        <>
                            <div className="md:w-[800px] mx-auto mb-[100px]">
                                <div className="font-bold text-[30px] text-center pb-5">Glass</div>

                                <div className="flex justify-center gap-10 flex-wrap cursor-pointer px-3 md:px-0">

                                    <>
                                        {Glass.map((glass) => (
                                            <div key={glass.name} onClick={() => handleglass(glass)}
                                                className={`border-2 p-4 hover:bg-[#e2f4f4] ${(selectglass?.name === glass.name)
                                                    ? "border-[#016252] bg-[#e2f4f4]" : ""}`}
                                            >
                                                <img src={glass.image} height="150" width="150" className="object-contain" />
                                                <div className="text-center mt-2">{glass.name}</div>
                                            </div>
                                        ))}
                                    </>


                                </div>
                            </div>
                        </>
                    }


                    {currentstep === 5 &&
                        <>
                            <div className="font-bold text-[30px] text-center pb-5">Notes</div>

                            <div className="md:w-[500px] mx-auto text-center px-3">

                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                                <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 " placeholder="Write your thoughts here..."
                                    value={message}
                                    onChange={handleNotes}></textarea>

                                <button onClick={handleSubmitLast} className="py-2.5 px-2 text-sm bg-black text-white font-bold  hover:scale-105 transition-transform rounded-md mt-5">Submit</button>

                            </div>
                        </>
                    }


                </div>



                <div className="fixed bottom-0 w-full bg-white shadow-md overflow-x-auto scrollbar-hide">
                    <div className="flex overflow-x-auto scrollbar-hide">
                        {sections.map((section) => (
                            <div
                                key={section.id}
                                className={`font-bold px-5 pt-2 pb-3 text-[12.8px] whitespace-nowrap
                    ${section.id <= currentstep ? "bg-[#016252] text-white" : "text-[#016252]"}
                    ${section.id === currentstep ? "rounded-tr-lg rounded-br-lg" : ""}
                `}
                            >
                                {section.id}) {section.title}
                            </div>
                        ))}
                    </div>
                </div>



            </div>



        </>
    )

}