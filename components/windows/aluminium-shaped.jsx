import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

export default function AluminiumShaped() {

    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, setValue, trigger, watch } = useForm({ mode: "onChange", });

    const [active, setactive] = useState(false);
    const [currentstep, setcurrentstep] = useState(1);

    const [values, setvalues] = useState({
        name: "Aluminium Shaped Window",
        width: "",
        height: "",
        outsidecolor: "",
        insidecolor: "",
        cill: "",
        glass: "",
        addons: "",
        astragals: "",
        notes: "",
    });

    useEffect(() => { setactive(validateStep(currentstep, values)); }, [values, currentstep]);

    const stepValidationRules = {
        1: ["width", "height"],
        2: ["configuration"],
        3: ["upstandheight"],
        4: ["outsidecolor"],
        5: ["insidecolor"],
        6: ["cill"],
        7: ["glass"],

        // 10: ["extras"],
        // 11: ["addons"],


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

        if (step === 1) {
            const width = parseInt(values.width, 10);
            const height = parseInt(values.height, 10);
            if (width >= 400 && width <= 5000 && height >= 250 && height <= 3036) {
                return true;
            } else {
                return false;
            }
        }

        if (step === 3) {
            const height = parseInt(values.upstandheight, 10);
            if (height >= 0 && height <= 500) {
                return true;
            } else {
                return false;
            }
        }



        return stepValidationRules[step].every((field) => values[field] !== "");
    };


    const handleChange1 = (e) => {
        const { name, value } = e.target;
        setValue(name, value);
        trigger(name);

        setvalues((prev) => {
            const newValues = { ...prev, [name]: value };
            setactive(validateStep(currentstep, newValues));
            return newValues;
        });
    };


    // Step 2
    const [selectedConf, setSelectedConf] = useState(null);
    const [displayImage, setDisplayImage] = useState(null);
    const [isOutside, setIsOutside] = useState(true); // Toggle state for outside/inside image

    const Conf = [
        { name: 'Gable', image: '/windows/shaped/gable.png', outsideimg: "/windows/shaped/gable-outside.png", insideimg: "/windows/shaped/gable-inside.png" },
        { name: 'Shaped Left', image: '/windows/shaped/shaped-left.png', outsideimg: "/windows/shaped/shaped-left-outside.png", insideimg: "/windows/shaped/shaped-left-inside.png" },
        { name: 'Shaped Right', image: '/windows/shaped/shaped-right.png', outsideimg: "/windows/shaped/shaped-right-outside.png", insideimg: "/windows/shaped/shaped-right-inside.png" },
        { name: 'Gable Upstand', image: '/windows/shaped/gable-upstand.png', outsideimg: "/windows/shaped/gable-upstand-outside.png", insideimg: "/windows/shaped/gable-upstand-inside.png" },
    ];

    const handleConfSelect = (conf) => {
        setSelectedConf(conf);
        setDisplayImage(conf.outsideimg); // Default to outside image
        setIsOutside(true); // Reset toggle to outside image

        setvalues((prev) => {
            const newValues = { ...prev, configuration: conf.name }; // Store only the name
            setactive(validateStep(currentstep, newValues));
            return newValues;
        });
    };

    // Toggle between inside and outside image
    const toggleImage = () => {
        if (selectedConf) {
            setIsOutside(!isOutside);
            setDisplayImage(isOutside ? selectedConf.insideimg : selectedConf.outsideimg);
        }
    };


    //    Step 3
    const handleupstandHeight = (e) => {
        const { name, value } = e.target;
        setValue(name, value);
        trigger(name);

        setvalues((prev) => {
            const newValues = { ...prev, upstandheight: value };
            setactive(validateStep(currentstep, newValues));
            return newValues;
        });
    };


    // Step 4 & 5
    const [showInside, setShowInside] = useState(true);

    const [outsidecolor, setoutsidecolor] = useState("");
    const [selectedoutsideImage, setselectedoutsideImage] = useState(null);
    const [selectColor, setselectColor] = useState(null);
    const [insidecolor, setinsidecolor] = useState("");
    const [selectedinsideImage, setselectedinsideImage] = useState(null);

    const colorOptionsoutside = {
        Anthracite: { color: "#383E42", Outsideimage: "/windows/shaped/anthracite-outside.png", Insideimage: "/windows/shaped/anthracite-inside.png", },
        White: { color: "#FFFFFF", Outsideimage: "/windows/shaped/white-outside.png", Insideimage: "/windows/shaped/white-inside.png", },
        Black: { color: "#000000", Outsideimage: "/windows/shaped/black-outside.png", Insideimage: "/windows/shaped/black-inside.png", },
    };

    const colorOptionsinside = {
        White: { color: "#FFFFFF", Outsideimage: "/windows/shaped/white-outside.png", Insideimage: "/windows/shaped/white-inside.png", },
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


    // Step 7
    const [selectedCill, setselectedCill] = useState(null);

    const Cill = [
        { name: 'No Cill', image: '/doors/bifold/no.png', h: "90", w: "90" },
        { name: '90 mm', image: '/doors/bifold/90mm.png', h: "150", w: "150" },
        { name: '150 mm', image: '/doors/bifold/150mm.png', h: "150", w: "150" },
        { name: '190 mm', image: '/doors/bifold/190mm.png', h: "150", w: "150" },
        { name: '230 mm', image: '/doors/bifold/230mm.png', h: "150", w: "150" },
        { name: 'Integrated Cill', image: '/doors/bifold/integrated.png', h: "150", w: "150" },
    ];


    const handleCillSelect = (cill) => {
        setselectedCill(cill);
        setvalues((prev) => {
            const newValues = { ...prev, cill: cill };
            setactive(validateStep(currentstep, newValues));
            return newValues;
        });
    };




    // Step 9
    const [selectglass, setselectglass] = useState(null);

    // const Glass = [
    //     { name: 'Standard Low E 1.2 u-value', image: '/doors/bifold/standard.png', },
    //     { name: 'Ultra Low E 1.0 u-value', image: '/doors/bifold/low-e.png', },
    //     { name: 'Solar control 1.2 u-value', image: '/doors/bifold/solar-control.png', },
    // ];

    const Glass = [
        { name: 'Unglazed', image: '/doors/bifold/standard.png', },
        { name: 'Standard Low E 1.2 u-value', image: '/doors/bifold/no-blind-glass/unglazed.png', },
        { name: 'Ultra Low E 1.0 u-value', image: '/doors/bifold/no-blind-glass/low-e.png', },
        { name: 'Laminated 6.8mm 1.2 u-value', image: '/doors/bifold/no-blind-glass/laminated.png', },
        { name: 'Laminated 6.4mm 1.2 u-value', image: '/doors/bifold/no-blind-glass/laminated.png', },
        { name: 'Satin Decor 1.2 u-value', image: '/doors/bifold/no-blind-glass/satin-decor.png', },
        { name: 'Solar control 1.2 u-value', image: '/doors/bifold/no-blind-glass/solar-control.png', },
        { name: 'Triple Glazed 1.0 u-value', image: '/doors/bifold/no-blind-glass/triple-glazed.png', },
    ]

    const handleglass = (glass) => {
        setselectglass(glass);
        setvalues((prev) => {
            const newValues = { ...prev, glass: glass };
            setactive(validateStep(currentstep, newValues));
            return newValues;
        });
    }





    // Step 11
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [trickleVents, setTrickleVents] = useState("0");

    const handleCheckboxChangestep10 = (option) => {
        setSelectedOptions((prev) => {
            let updatedOptions = [...prev];

            if (prev.includes(option)) {
                updatedOptions = prev.filter(item => item !== option);
            } else {
                updatedOptions.push(option);

                // Ensure "Corner Post" & "Moving Corner Post" toggle each other
                if (option === "Corner Post") {
                    updatedOptions = updatedOptions.filter(item => item !== "Moving Corner Post");
                } else if (option === "Moving Corner Post") {
                    updatedOptions = updatedOptions.filter(item => item !== "Corner Post");
                }
            }

            setvalues((prev) => {
                const newValues = { ...prev, extras: updatedOptions };
                return newValues;
            });

            return updatedOptions;
        });
    };


    const handleTrickleVentsChange = (e) => {
        const selectedValue = e.target.value;

        setvalues((prev) => {
            const newValues = { ...prev, trickleVents: selectedValue };
            return newValues;
        });
    };


    // Step 12
    const [lrt, setlrt] = useState({ Left: 0, Top: 0, Right: 0 });

    const handleChange = (label, value) => {
        setlrt((prev) => ({ ...prev, [label]: value }));



        setvalues((prev) => {
            const newValues = {
                ...prev,
                addons: { ...prev.addons, [label]: `${value}mm` }
            };
            setactive(validateStep(currentstep, newValues));
            return newValues;
        });

    };



    // Step 13

    const [astragals, setastragals] = useState({
        horizontalAstragals: 0,
        verticalAstragals: 0,
        horizontalTransform: 0,
        verticalTransform: 0,
    });

    const handleAstragalChange = (label, value) => {
        setvalues((prev) => ({
            ...prev,
            astragal: {
                ...prev.astragal,
                [label]: Number(value), // Convert to number for consistency
            },
        }));
    };





    // Step 14
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
        { id: 2, title: 'configuration' },
        { id: 3, title: 'upstand' },
        { id: 4, title: 'Outside Colour' },
        { id: 5, title: 'Inside Colour' },
        { id: 6, title: 'Cill' },
        { id: 7, title: 'Glass' },
        { id: 8, title: 'Addons' },
        { id: 9, title: 'Bars' },
        { id: 10, title: 'Notes' },
    ];

    const startstep = 1;
    const maxsteps = 9;
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
                        <div>{widthValue} mm</div>
                    </div>
                    <div className="flex gap-5">
                        <div className="font-bold">Height</div>
                        <div>{heightValue} mm</div>
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

                    {(currentstep == 2 || currentstep == 3) &&
                        <>
                            <div className="flex justify-center">
                                {/* <img src={selectedoutsideImage} className="w-[100px] h-[350px]" /> */}
                                {selectedConf && (
                                    <div className="mt-4 text-center">
                                        <img src={displayImage} alt="Selected Window" className="w-64 h-64 object-contain mx-auto" />
                                        <button
                                            onClick={toggleImage}
                                            className="mt-2 px-4 py-2 bg-[#016252] text-white rounded-lg"
                                        >
                                            {isOutside ? "View Inside Image" : "View Outside Image"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    }

                    {currentstep == 4 && selectedoutsideImage != null &&
                        <>
                            <div className="flex justify-center">
                                <img src={showInside ? selectedoutsideImage : selectedinsideImage} className="w-[300px] h-[200px]" />
                            </div>
                        </>
                    }



                    {currentstep == 5 && selectedinsideImage != null &&
                        <>
                            <div className="flex justify-center">
                                <img src={showInside ? selectedinsideImage : selectedoutsideImage} className="w-[300px] h-[200px]" />
                            </div>

                            <div className="flex justify-center mt-5">
                                <button
                                    className="mt-3 px-4 py-2 bg-[#016252] text-white rounded-md"
                                    onClick={() => setShowInside(!showInside)}
                                >
                                    {showInside ? "Show Outside Color" : "Show Inside Color"}
                                </button>
                            </div>
                        </>
                    }


                    {/* {(currentstep == 4 || currentstep == 5 || currentstep == 6 || currentstep == 7 || currentstep == 8 || currentstep == 9 || currentstep == 10) && selectNoBlind && (
                        <div className="mt-5 flex flex-col items-center">
                            <img src={showInside ? selectedinsideImage : selectedoutsideImage}
                                className="w-[150px] h-[350px]"
                            />
                            <button
                                className="mt-3 px-4 py-2 bg-[#016252] text-white rounded-md"
                                onClick={() => setShowInside(!showInside)}
                            >
                                {showInside ? "Show Outside Color" : "Show Inside Color"}
                            </button>
                        </div>
                    )} */}



                    {/* {(currentstep == 4 || currentstep == 5 || currentstep == 6 || currentstep == 7 || currentstep == 8 || currentstep == 9 || currentstep == 10) && selectBlind && (
                        <div className="overflow-hidden fixed left-[10%]">
                            <div className="mt-5 flex flex-col items-center">

                                <div className="">
                                    <img src={showInside ? selectedinsideImage : selectedoutsideImage}
                                        className="w-[150px] h-[350px]"
                                    />
                                </div>
                                <div className="w-[135px] h-[220px] absolute top-[28px] left-[18px] opacity-70" style={{ backgroundColor: blindcolor ? blindcolor.color : 'green' }}></div>

                                <button
                                    className="mt-3 px-4 py-2 bg-[#016252] text-white rounded-md"
                                    onClick={() => setShowInside(!showInside)}
                                >
                                    {showInside ? "Show Outside Color" : "Show Inside Color"}
                                </button>
                            </div>
                        </div>
                    )} */}




                </div>





                <div className="md:w-[65%] pt-5">

                    {currentstep == 1 &&
                        <div className="relative w-full md:max-w-[660px] md:h-80 flex flex-col items-center mt-[1%]">
                            <div className="hidden md:block md:absolute top-0 right-0 z-10 mr-[100px]">
                                <img alt="Dimensions" height={200} width={250} loading="lazy" src="/windows/casement.webp" />
                            </div>
                            <div
                                className="p-4 text-white font-semibold md:max-w-[416px] z-30 md:absolute md:top-28 left-0"
                                style={{ background: "#016252" }}
                            >
                                <p className="text-center text-2xl mb-4">Enter Dimensions</p>
                                <div className="flex gap-8 max-w-96 mb-4">

                                    <div className="flex flex-col items-center">
                                        <label htmlFor="width" className="text-xl">Width</label>

                                        <input id="width" type="number"
                                            {...register("width", {
                                                required: "Width is required",
                                                min: { value: 400, message: "Width must be at least 400", },
                                                max: { value: 5000, message: "Width must not exceed 5000", },
                                            })}
                                            placeholder="400 - 5000"
                                            onChange={handleChange1}
                                            className={`p-2 border rounded-md w-full mt-1 text-black outline-none ${errors.width ? "border-red-500" : "border-gray-300"
                                                }`}
                                        />
                                    </div>


                                    <div className="flex flex-col items-center">
                                        <label htmlFor="height" className="text-xl"> Height</label>
                                        <input id="height" type="number"
                                            {...register("height", {
                                                required: "Height is required",
                                                min: { value: 250, message: "Height must be at least 250", },
                                                max: { value: 3036, message: "Height must not exceed 3036", },
                                            })}
                                            placeholder="250 - 3036"
                                            onChange={handleChange1}
                                            className={`p-2 border rounded-md w-full mt-1 text-black outline-none ${errors.height ? "border-red-500" : "border-gray-300"
                                                }`}
                                        />

                                    </div>
                                </div>

                            </div>
                        </div>
                    }


                    {currentstep == 2 &&
                        <div className="md:w-[800px] mx-auto">

                            <div className="font-bold text-[30px] text-center pb-5">Configuration</div>

                            <div className="flex flex-wrap justify-center gap-10 cursor-pointer px-2 md:px-0">

                                {Conf.map((conf) => (
                                    <div
                                        key={conf.name}
                                        className={`border rounded-lg p-2 ${selectedConf?.name === conf.name ? "border-[#016252] bg-[#e2f4f4]" : ""}`}
                                        onClick={() => handleConfSelect(conf)}
                                    >
                                        <img src={conf.image} alt={conf.name} className="w-32 h-32 object-contain" />
                                        <div className="text-center mt-2">{conf.name}</div>
                                    </div>
                                ))}

                            </div>

                        </div>
                    }


                    {currentstep == 3 &&
                        <>
                            <div className="md:w-[800px] mx-auto">

                                <div className="font-bold text-[30px] text-center pb-5">Upstand Height</div>

                                <div className="flex flex-wrap justify-center gap-10 cursor-pointer px-2 md:px-0">

                                    <input id="UpstandHeight" type="number"
                                        {...register("UpstandHeight", {
                                            required: "UpstandHeight is required",
                                            min: { value: 0, message: "UpstandHeight must be at least 0", },
                                            max: { value: 500, message: "UpstandHeight must not exceed 500", },
                                        })}
                                        placeholder="0 - 500mm"
                                        onChange={handleupstandHeight}
                                        className={`p-2 w-[200px] border rounded-md mt-1 text-black outline-none ${errors.UpstandHeight ? "border-red-500" : "border-gray-300"
                                            }`}
                                    />

                                </div>

                            </div>
                        </>
                    }


                    {currentstep == 4 &&
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


                    {currentstep == 5 &&
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


                    {currentstep === 6 &&
                        <div className="md:w-[800px] mx-auto">
                            <div className="font-bold text-[30px] text-center pb-5">Cill</div>

                            <div className="flex justify-center gap-10 flex-wrap cursor-pointer px-3 md:px-0">
                                {Cill.map((cill) => (
                                    <div key={cill.name} onClick={() => handleCillSelect(cill.name)}
                                        className={`border-2 p-4 hover:bg-[#e2f4f4] ${selectedCill === cill?.name ? 'border-[#016252] bg-[#e2f4f4]' : ''}`}
                                    >
                                        <img src={cill.image} height={cill.h} width={cill.w} className="object-contain" />
                                        <div className="text-center mt-2">{cill.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }


                    {currentstep === 7 &&
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


                    {currentstep === 8 &&
                        <>
                            <div className="font-bold text-[30px] text-center pb-5">AddOns</div>

                            <div className="md:w-[500px] mx-auto text-center bg-[whitesmoke] mb-[100px]">

                                <div className="flex justify-center ">
                                    <div className="h-[200px] w-[100px] flex justify-center items-center">{lrt.Left}mm</div>

                                    <div className="h-[300px] w-[200px]">
                                        <div>{lrt.Top}mm</div>

                                        <div className="flex justify-center">
                                            {lrt.Left >= 20 && <div className="h-[305px] w-[6px]" style={{ backgroundColor: selectColor }}></div>}
                                            {lrt.Left == 38 && <div className="h-[305px] w-[6px]" style={{ backgroundColor: selectColor }}></div>}
                                            <div>
                                                {lrt.Top >= 20 && <div className="h-[5px]" style={{ backgroundColor: selectColor }}></div>}
                                                {lrt.Top == 38 && <div className="h-[5px]" style={{ backgroundColor: selectColor }}></div>}
                                                <img src={showInside ? selectedinsideImage : selectedoutsideImage} className="w-[200px] h-[300px]" />
                                            </div>
                                            {lrt.Right >= 20 && <div className="h-[305px] w-[6px]" style={{ backgroundColor: selectColor }}></div>}
                                            {lrt.Right == 38 && <div className="h-[305px] w-[6px]" style={{ backgroundColor: selectColor }}></div>}
                                        </div>


                                    </div>

                                    <div className="h-[200px] w-[100px] flex justify-center items-center">{lrt.Right}mm</div>

                                </div>

                                <div className="flex space-x-4 justify-center mt-10">
                                    {["Left", "Top", "Right"].map((label) => (
                                        <div key={label} className="flex flex-col items-center">
                                            <label className="mb-1 text-sm font-medium">{label}</label>
                                            <select
                                                className="border rounded-md p-2 cursor-pointer"
                                                value={lrt[label]}
                                                onChange={(e) => handleChange(label, e.target.value)}
                                            >
                                                <option value="0">0</option>
                                                <option value="20">20</option>
                                                <option value="38">38</option>
                                            </select>
                                        </div>
                                    ))}
                                </div>

                                {/* <p className="text-red-500 py-3">Top Addon required for trickle vents (38mm may be required)</p> */}

                            </div>
                        </>
                    }

                    {currentstep === 9 &&
                        <>
                            <div className="font-bold text-[30px] text-center pb-5">Astragal/Transform Bars</div>

                            {/* {selectBlind &&
                                <div className="text-center text-red-500 pb-5">Pane cannot fit blinds, remove the blinds or change the number of transom bars</div>
                            } */}

                            <div className="md:w-[500px] mx-auto text-center">
                                <div className="flex flex-col gap-4">
                                    {[
                                        { label: "Horizontal Astragals", key: "horizontalAstragals" },
                                        { label: "Vertical Astragals", key: "verticalAstragals" },
                                        { label: "Horizontal Transform", key: "horizontalTransform" },
                                        { label: "Vertical Transform", key: "verticalTransform" },
                                    ].map(({ label, key }) => (
                                        <div key={key} className="flex flex-col items-center">
                                            <label className="mb-1 text-sm font-medium">{label}</label>
                                            <select
                                                className="border rounded-md p-2  w-[100px] cursor-pointer"
                                                value={values[key]}
                                                onChange={(e) => handleAstragalChange(key, e.target.value)}
                                            >
                                                {[0, 1, 2, 3, 4, 5].map((num) => (
                                                    <option key={num} value={num}>
                                                        {num}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    }


                    {currentstep === 10 &&
                        <>
                            <div className="font-bold text-[30px] text-center pb-5">Notes</div>

                            <div className="md:w-[500px] mx-auto text-center px-3">

                                <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                                <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 " placeholder="Write your thoughts here..."
                                    value={message}
                                    onChange={handleNotes}></textarea>

                                <button onClick={handleSubmitLast} className="py-2.5 px-2 text-sm bg-black text-white font-bold  hover:scale-105 transition-transform rounded-md mt-5">Submit</button>

                            </div>
                        </>
                    }


                </div>

            </div >




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





        </>
    );
}
