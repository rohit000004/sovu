import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from 'next/router';

export default function AluminiumRoofLantern() {

    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, setValue, trigger, watch } = useForm({ mode: "onChange", });

    const [active, setactive] = useState(false);
    const [currentstep, setcurrentstep] = useState(1);

    const [values, setvalues] = useState({
        name: "Aluminium Roof Lantern",
        configuration: "",
        dimensions: "",
        width: "",
        height: "",
        outsidecolor: "",
        insidecolor: "",
        glass: "",
        notes: "",
    });

    useEffect(() => { setactive(validateStep(currentstep, values)); }, [values, currentstep]);

    const stepValidationRules = {
        1: ["configuration"],
        2: ["width", "height", "dimensions"],
        3: ["outsidecolor"],
        4: ["insidecolor"],
        5: ["glass"],
        6: ["notes"],
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

        if (step === 2) {
            const hasDimension = values.dimensions && values.dimensions !== "";
            const hasWidth = values.width !== "" && values.width !== null;
            const hasHeight = values.height !== "" && values.height !== null;

            if (hasDimension) return true;

            if (!hasDimension && hasWidth && hasHeight) {
                const width = parseInt(values.width, 10);
                const height = parseInt(values.height, 10);
                return width >= 1200 && width <= 3000 && height >= 800 && height <= 1600;
            }

            return false;
        }

        return stepValidationRules[step].every((field) => values[field] !== "");
    };








    // Step 1
    const [selectedpane, setselectedpane] = useState(null);
    const [selectedPaneImage, setSelectedPaneImage] = useState(null);

    const Panes = [
        { name: 'Roof Lantern 4 Pane', image: '/rooftop/aluminium-lantern/Roof Lantern 4 Pane.png' },
        { name: 'Roof Lantern 6 Pane', image: '/rooftop/aluminium-lantern/Roof Lantern 6 Pane.png' },
    ];


    const handlePaneSelect = (pane) => {
        setselectedpane(pane);
        setSelectedPaneImage(pane);

        setvalues((prev) => {
            const newValues = { ...prev, configuration: pane };
            setactive(validateStep(currentstep, newValues));
            return newValues;
        });
    };


    //Step 2

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
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");

    const handleDimensionSelect0 = (event) => {
        const selectedValue = event.target.value;
        setSelectedDimension(selectedValue);

        setvalues((prev) => {
            const newValues = { ...prev, dimensions: selectedValue };
            setactive(validateStep(currentstep, newValues));
            return newValues;
        });
    };


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

    const handleToggle = () => {
        setMadeToMeasure((prev) => !prev);
        setWidth("");
        setHeight("");
        setSelectedDimension(null);
        setvalues((prev) => {
            const newValues = { ...prev, dimensions: "", width: "", height: "" };
            setactive(validateStep(currentstep, newValues));
            return newValues;
        });
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




    // Step 3 and step 4
    const [showInside, setShowInside] = useState(true);

    const [outsidecolor, setoutsidecolor] = useState("");
    const [selectedoutsideImage, setselectedoutsideImage] = useState(null);
    const [selectColor, setselectColor] = useState(null);

    const colorOptionsoutside = {
        Anthracite: { color: "#383E42", Outsideimage: "/rooftop/aluminium-lantern/outside-anthracite.png", Insideimage: "/rooftop/aluminium-lantern/outside-anthracite.png", },
        White: { color: "#FFFFFF", Outsideimage: "/rooftop/aluminium-lantern/outside-white.png", Insideimage: "/rooftop/aluminium-lantern/inside-white.png", },
        Black: { color: "#000000", Outsideimage: "/rooftop/aluminium-lantern/outside-black.png", },
    };

    const colorOptionsinside = {
        White: { color: "#FFFFFF", Outsideimage: "/rooftop/aluminium-lantern/outside-white.png", Insideimage: "/rooftop/aluminium-lantern/inside-white.png", },
        Black: { color: "#000000", Outsideimage: "/rooftop/aluminium-lantern/outside-black.png", Insideimage: "/rooftop/aluminium-lantern/inside-black.png", },
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


    // Step 5

    const [selectglass, setselectglass] = useState(null);

    const Glass = [
        { name: 'Clear', image: '/rooftop/aluminium-lantern/clear.png', },
        { name: 'Blue Solar Control', image: '/rooftop/aluminium-lantern/clear.png', },
    ];

    const handleglass = (glass) => {
        setselectglass(glass);
        setvalues((prev) => {
            const newValues = { ...prev, glass: glass };
            setactive(validateStep(currentstep, newValues));
            return newValues;
        });
    }


    // Step 6
    const [message, setMessage] = useState("");

    const handleNotes = (event) => {
        setMessage(event.target.value);
        setvalues((prev) => {
            const newValues = { ...prev, notes: event.target.value };
            return newValues;
        });
    };

    console.log(values);


    const startstep = 1;
    const maxsteps = 5;
    const widthValue = watch("width", "");
    const heightValue = watch("height", "");



    const sections = [
        { id: 1, title: 'Configuration' },
        { id: 2, title: 'Dimensions' },
        { id: 3, title: 'Outside Colour' },
        { id: 4, title: 'Inside Colour' },
        { id: 5, title: 'Glass' },
        { id: 6, title: 'Notes' },
    ];



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

                    {(currentstep == 1 || currentstep == 2) &&
                        <>
                            <div className="flex justify-center mt-10">
                                <img src={selectedPaneImage?.image} height={300} width={450} alt="" />
                            </div>
                        </>
                    }

                    {currentstep == 3 && selectedoutsideImage == null &&
                        <>
                            <div className="flex justify-center mt-10">
                                <img src={selectedPaneImage?.image} height={300} width={450} alt="" />
                            </div>
                        </>
                    }

                    {currentstep == 3 && selectedoutsideImage != null &&
                        <>
                            <div className="flex justify-center">
                                <img src={selectedoutsideImage} className="w-[450px] h-[300px]" />
                            </div>
                        </>
                    }


                    {(currentstep == 4 || currentstep == 5 || currentstep == 6) && selectedinsideImage != null &&
                        <>
                            <div className="flex justify-center">
                                <img src={showInside ? selectedinsideImage : selectedoutsideImage} className="w-[450px] h-[300px]" />
                            </div>

                        </>
                    }

                </div>



                <div className="md:w-[65%] pt-5">


                    {(currentstep == 1) &&
                        <>
                            <div className="md:w-[800px] mx-auto">
                                <div className="font-bold text-[30px] text-center pb-5">Configuration</div>

                                <div className="flex justify-center gap-10 flex-wrap cursor-pointer px-3 md:px-0">
                                    {Panes.map((pane) => (
                                        <div key={pane.name} onClick={() => handlePaneSelect(pane)}
                                            className={`border-2 p-4 hover:bg-[#e2f4f4] ${selectedpane?.name === pane?.name ? 'border-[#016252] bg-[#e2f4f4]' : ''}`}
                                        >
                                            <img src={pane.image} height={200} width={150} className="object-contain" />
                                            <div className="text-center mt-2">{pane.name}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    }


                    {currentstep == 2 &&
                        <>
                            <div className="md:w-[800px] mx-auto">
                                <div className="font-bold text-[30px] text-center pb-5">Dimensions</div>
                                <p className="text-center pb-5">Sizes are based on external timber upstand</p>

                                <div className="flex justify-center items-center mb-5 space-x-2">
                                    <span className="text-lg font-medium">Made to Measure</span>
                                    <button onClick={handleToggle}
                                        className={`w-14 h-7 flex items-center rounded-full p-1 transition ${madeToMeasure ? "bg-blue-500" : "bg-gray-300"
                                            }`}
                                    >
                                        <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition ${madeToMeasure ? "translate-x-7" : ""
                                            }`}
                                        ></div>
                                    </button>
                                </div>


                                {!madeToMeasure && (
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
                                    </div>)}



                                {madeToMeasure && (
                                    <>
                                        <div className="flex justify-center">


                                            <div className="relative  flex flex-col items-center">

                                                <div
                                                    className="p-4 text-white font-semibold md:max-w-[416px]"
                                                    style={{ background: "#016252" }}
                                                >
                                                    <p className="text-center text-2xl mb-4">Enter Dimensions</p>
                                                    <div className="flex gap-8 max-w-96 mb-4">

                                                        <div className="flex flex-col items-center">
                                                            <label htmlFor="width" className="text-xl">Width</label>

                                                            <input id="width" type="number"
                                                                {...register("width", {
                                                                    required: "Width is required",
                                                                    min: { value: 1200, message: "Width must be at least 1200", },
                                                                    max: { value: 3000, message: "Width must not exceed 3000", },
                                                                })}
                                                                placeholder="1200 - 3000"
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
                                                                    min: { value: 800, message: "Height must be at least 800", },
                                                                    max: { value: 1600, message: "Height must not exceed 1600", },
                                                                })}
                                                                placeholder="800 - 1600"
                                                                onChange={handleChange1}
                                                                className={`p-2 border rounded-md w-full mt-1 text-black outline-none ${errors.height ? "border-red-500" : "border-gray-300"
                                                                    }`}
                                                            />

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </>
                                )}
                            </div>
                        </>
                    }



                    {currentstep == 3 &&
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


                    {currentstep == 4 &&
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



                    {currentstep === 5 &&
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


                    {currentstep === 6 &&
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