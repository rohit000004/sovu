import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

export default function French() {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, setValue, trigger, watch } = useForm({ mode: "onChange", });

    const [active, setactive] = useState(false);
    const [currentstep, setcurrentstep] = useState(1);

    const [values, setvalues] = useState({
        name: "Aluminium French Door",
        width: "",
        height: "",
        handle: "",
        outsidecolor: "",
        insidecolor: "",
        cill: "",
        insideHandle: "",
        outsideHandle: "",
        blind: "",
        blindcolor: "",
        glass: "",
        threshold: "",
        thresholdPrice: "",
        outerramp: "",
        innerramp: "",
        extras: "",
        trickleVents: "",
        addons: "",
        astragals: "",
        notes: "",
    });

    useEffect(() => { setactive(validateStep(currentstep, values)); }, [values, currentstep]);

    const stepValidationRules = {
        1: ["width", "height"],
        2: ["handle"],
        3: ["outsidecolor"],
        4: ["insidecolor"],
        5: ["cill"],
        6: ["handle"],


        // 8: ["blind"],
        // 9: ["glass"],
        // 10: ["threshold"],


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
            if (width >= 700 && width <= 2476 && height >= 500 && height <= 3036) {
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



    const [step2ViewInside, setStep2ViewInside] = useState("View Inside");
    const [selectedHandleSide, setSelectedHandleSide] = useState("");
    const [selectMyImg, setSelectMyImg] = useState(null);
    const [handleOptions, setHandleOptions] = useState({ openIn: false, openOut: false });

    // Image mapping for inside and outside views
    const myImg = {
        Left: {
            inside: "/doors/french/inside-black-left-handle.png",
            outside: "/doors/french/outside-black-left-handle.png",
        },
        Right: {
            inside: "/doors/french/inside-black-right-handle.png",
            outside: "/doors/french/outside-black-right-handle.png",
        }
    };

    // Toggle between inside and outside views
    const toggleView = () => {
        setStep2ViewInside((prev) => (prev === "View Inside" ? "View Outside" : "View Inside"));
    };

    const handleImgChangeS2 = (event) => {
        const selectedSide = event.target.value;
        setSelectedHandleSide(selectedSide);
        setSelectMyImg(myImg[selectedSide]);

        // Compute new values
        const newValues = (prev) => ({
            ...prev,
            handle: {
                ...prev.handle,
                side: selectedSide,
                openIn: handleOptions.openIn,
                openOut: handleOptions.openOut,
            }
        });


        setvalues((prev) => {
            const updatedValues = newValues(prev);
            setactive(validateStep(currentstep, updatedValues)); // Validate after updating values
            return updatedValues;
        });
    };


    // Handle checkbox change
    const handleCheckboxs2 = (event) => {
        const { name } = event.target;

        setHandleOptions({
            openIn: name === "openIn",
            openOut: name === "openOut"
        });

        setvalues((prevValues) => ({
            ...prevValues,
            handle: {
                ...prevValues.handle,
                side: selectedHandleSide,
                openIn: name === "openIn",
                openOut: name === "openOut",
            }
        }));
    };



    // Step 3 & 4

    const [showInside, setShowInside] = useState(true);  // Toggle inside/outside
    const [outsidecolor, setoutsidecolor] = useState("");
    const [insidecolor, setinsidecolor] = useState("");
    const [selectedoutsideImage, setselectedoutsideImage] = useState(null);
    const [selectedinsideImage, setselectedinsideImage] = useState(null);
    const [selectColor, setselectColor] = useState(null);

    const colorOptionsoutside = {
        Anthracite: { color: "#383E42", outside: "/doors/french/outside-anthracite-left-handle.png", inside: "/doors/french/inside-anthracite-right-handle.png" },
        White: { color: "#FFFFFF", outside: "/doors/french/outside-white-left-handle.png", inside: "/doors/french/inside-white-right-handle.png" },
        Black: { color: "#000000", outside: "/doors/french/outside-black-left-handle.png", inside: "/doors/french/inside-black-right-handle.png" },
    };

    const colorOptionsinside = {
        Anthracite: { color: "#383E42", outside: "/doors/french/outside-anthracite-left-handle.png", inside: "/doors/french/inside-anthracite-right-handle.png" },
        White: { color: "#FFFFFF", outside: "/doors/french/outside-white-left-handle.png", inside: "/doors/french/inside-white-right-handle.png" },
        Black: { color: "#000000", outside: "/doors/french/outside-black-left-handle.png", inside: "/doors/french/inside-black-right-handle.png" },
    };


    const handleoutsideColorChange = (name) => {
        setoutsidecolor(name);
        console.log(name);

        setselectedoutsideImage(colorOptionsoutside[name].outside);
        setselectColor(true);
        setvalues((prev) => {
            const newValues = { ...prev, outsidecolor: name };
            setactive(validateStep(currentstep, newValues));
            return newValues;
        });
    };


    const handleinsideColorChange = (name) => {
        setinsidecolor(name);
        setselectedinsideImage(colorOptionsinside[name].inside);  // Only set inside image

        setvalues((prev) => {
            const newValues = { ...prev, insidecolor: name };
            setactive(validateStep(currentstep, newValues));
            return newValues;
        });
    };

    // ✅ Toggle View Inside / Outside
    const toggleView2 = () => {
        setShowInside((prev) => !prev);
    };



    // Step 6
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



    // Step 7

    const [selectedDualHandle, setSelectedDualHandle] = useState(null);
    const [selectedHandle, setSelectedHandle] = useState(null);
    const [selectedOutsideHandle, setSelectedOutsideHandle] = useState(null);
    const [selectedInsideHandle, setSelectedInsideHandle] = useState(null);
    const [isDualSelected, setIsDualSelected] = useState(false);

    const Handles = [
        { name: 'Black', image: '/doors/bifold/black.png', },
        { name: 'White', image: '/doors/bifold/white.png', },
        { name: 'Grey', image: '/doors/bifold/grey.png', },
        { name: 'Chrome', image: '/doors/bifold/chrome.png', },
        { name: 'Stainless Steel', image: '/doors/bifold/stainless.png', },
        { name: 'Dual Color', image: '/doors/bifold/dual.png', },
    ];

    const handleColors = [
        { name: 'Black', image: '/doors/bifold/black.png', },
        { name: 'White', image: '/doors/bifold/white.png', },
        { name: 'Grey', image: '/doors/bifold/grey.png', },
        { name: 'Chrome', image: '/doors/bifold/chrome.png', },
        { name: 'Stainless Steel', image: '/doors/bifold/stainless.png', },
    ];





    const handleSingleHandleSelect = (handle) => {
        setSelectedHandle(handle);
        setIsDualSelected(false);
        setSelectedOutsideHandle(null);
        setSelectedInsideHandle(null);
        setvalues((prev) => {
            const newValues = { ...prev, handle: handle };
            delete newValues.outsideHandle; // Remove dual handle data if previously selected
            delete newValues.insideHandle;
            setactive(validateStep(currentstep, newValues));
            return newValues;
        });
    };

    const handleDualHandleSelect = () => {
        setIsDualSelected(true);
        setSelectedHandle(null);
        setSelectedOutsideHandle(null);
        setSelectedInsideHandle(null);

        setvalues((prev) => {
            const newValues = { ...prev };
            delete newValues.handle; // Remove single handle data
            setactive(validateStep(currentstep, newValues));
            return newValues;
        });
    };

    const handleOutsideHandleSelect = (handle) => {
        setSelectedOutsideHandle(handle);
        setvalues((prev) => {
            const newValues = { ...prev, outsideHandle: handle };
            setactive(validateStep(currentstep, newValues));
            return newValues;
        });
    };

    const handleInsideHandleSelect = (handle) => {
        setSelectedInsideHandle(handle);
        setvalues((prev) => {
            const newValues = { ...prev, insideHandle: handle };
            setactive(validateStep(currentstep, newValues));
            return newValues;
        });
    };



    // Step 8
    const [selectBlind, setselectBlind] = useState(null);
    const [selectNoBlind, setselectNoBlind] = useState(null);
    const [selectedBlind, setselectedBlind] = useState(null);
    const [blindcolor, setblindcolor] = useState(null);

    const Blinds = [
        { name: 'Blinds in Glass', image: '/doors/bifold/blinds.png', },
        { name: 'No Blinds', image: '/doors/bifold/no-blinds.png', },
    ];


    const BlindsColor = [
        { name: 'S102 White', color: `#FFFFFF`, },
        { name: 'S106 Yellow', color: `#F9E7A7`, },
        { name: 'Agate Grey S120', color: `#B3B3B1`, },
        { name: 'S125 Beige', color: `#EFDCD1`, },
        { name: 'S130 Green', color: `#C9DFD2`, },
        { name: 'S142 Light Blue', color: `#D5EDF7`, },
        { name: 'S149 Cream', color: `#F9F0E5`, },
        { name: 'S155 Light Grey', color: `#EBEBEB`, },
        { name: 'S156 Metallic Silver', color: `#BDBDBD`, },
        { name: 'S157 Silver', color: `#E0E0E0`, },
        { name: 'Slate Grey S158', color: `#6A6F6D`, },
        { name: 'S159 Anthracite', color: `#676767`, },
        { name: 'Dual Color S159/S102', color: `#676767`, },
        { name: 'B160 Black', color: `#000000`, },
    ];

    const HandleNoBlind = (blind) => {
        setselectNoBlind(true);
        setselectBlind(false);
        setselectedBlind(blind);
        setvalues((prev) => {
            const newValues = { ...prev, blind: blind };
            setactive(validateStep(currentstep, newValues));
            return newValues;
        });
    }

    const handleBlind = (blind) => {
        setselectBlind(true);
        setselectNoBlind(false);
        setselectedBlind(blind);
        setvalues((prev) => {
            const newValues = { ...prev, blind: blind };
            setactive(validateStep(currentstep, newValues));
            return newValues;
        });
    };


    const handleBlindColor = (blind) => {
        setblindcolor(blind);
        setvalues((prev) => {
            const newValues = { ...prev, blindcolor: blind };
            setactive(validateStep(currentstep, newValues));
            return newValues;
        });
    }


    // Step 9
    const [selectglass, setselectglass] = useState(null);

    const Glass = [
        { name: 'Standard Low E 1.2 u-value', image: '/doors/bifold/standard.png', },
        { name: 'Ultra Low E 1.0 u-value', image: '/doors/bifold/low-e.png', },
        { name: 'Solar control 1.2 u-value', image: '/doors/bifold/solar-control.png', },
    ];

    const NoBlindGlass = [
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


    // Step 10
    const [selectthreshold, setselectthreshold] = useState(null);
    const [showinputs, setshowinputs] = useState(null);
    const [outerRamp, setOuterRamp] = useState(false);
    const [innerRamp, setInnerRamp] = useState(false);

    const Threshold = [
        { name: 'Low 20mm', image: '/doors/bifold/low.png', },
        { name: 'Low w/ Rebate 40mm', image: '/doors/bifold/low-with-rebate.png', },
        { name: 'Standard 55mm', image: '/doors/bifold/threshold.png', },
    ];

    const handleThreshold = (threshold) => {
        setselectthreshold(threshold);
        if (threshold.name == "Low 20mm" || threshold.name == "Low w/ Rebate 40mm") {
            setshowinputs(true);
        }
        else {
            setshowinputs(false);
        }

        setvalues((prev) => {
            const newValues = { ...prev, threshold: threshold };
            setactive(validateStep(currentstep, newValues));
            return newValues;
        });
    }

    const handleRampcheck = (ramp, checked) => {
        setvalues((prev) => {
            const newValues = {
                ...prev,
                outerramp: ramp === "Outer Ramp" ? (checked ? "outerRamp" : "") : prev.outerramp,
                innerramp: ramp === "Inner Ramp" ? (checked ? "innerRamp" : "") : prev.innerramp
            };

            if (JSON.stringify(prev) !== JSON.stringify(newValues)) {
                setactive(validateStep(currentstep, newValues));
            }

            return newValues;
        });
        if (ramp === "Outer Ramp") setOuterRamp(checked);
        if (ramp === "Inner Ramp") setInnerRamp(checked);
    };



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

        // Update trickleVents in values
        setvalues((prev) => ({
            ...prev,
            trickleVents: selectedValue,
        }));

        // Also update the state for UI binding
        setTrickleVents(selectedValue);
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
        console.log(lrt);
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
        { id: 2, title: 'Panels' },
        { id: 3, title: 'Outside Colour' },
        { id: 4, title: 'Inside Colour' },
        { id: 5, title: 'Cill' },
        { id: 6, title: 'Handles' },
        { id: 7, title: 'Blinds' },
        { id: 8, title: 'Glass' },
        { id: 9, title: 'Threshold' },
        { id: 10, title: 'Extras' },
        { id: 11, title: 'Addons' },
        { id: 12, title: 'Bars' },
        { id: 13, title: 'Notes' },
    ];

    const startstep = 1;
    const maxsteps = 13;
    const widthValue = watch("width", "");
    const heightValue = watch("height", "");






    const handleSubmitLast = () => {
        const formattedValues = Object.fromEntries(
            Object.entries(values).map(([key, value]) => {
                if (typeof value === 'object' && value !== null) {
                    return [key, JSON.stringify(value)]; // Convert objects/arrays to strings
                }
                return [key, value];
            })
        );

        router.push({
            pathname: '/receipt',
            query: formattedValues, // Pass formatted values as query parameters
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
                    {(currentstep == 2) &&
                        <>
                            <div className="flex justify-center mt-10">
                                {selectMyImg && (
                                    <img
                                        src={step2ViewInside === "View Inside" ? selectMyImg.inside : selectMyImg.outside}
                                        height={200}
                                        width={100}
                                    />
                                )}
                            </div>


                            <div className="flex justify-center">
                                {selectMyImg && (<button
                                    className="px-2 py-1 mt-2 bg-[#63b2c4] hover:scale-105 transition-transform active:translate-y-1 text-white rounded-sm"
                                    onClick={toggleView}
                                >
                                    {step2ViewInside}
                                </button>)}
                            </div>
                        </>
                    }



                    {currentstep === 3 && selectColor && (
                        <>
                            <div className="flex justify-center mt-10">
                                <img
                                    src={showInside ? selectedoutsideImage : selectedoutsideImage}  // It's always using the same image, needs a fix.
                                    height={200}
                                    width={100}
                                />
                            </div>
                        </>
                    )}

                    {currentstep === 4 && selectedinsideImage && (
                        <>
                            <div className="flex justify-center mt-10">
                                <img
                                    src={showInside ? selectedinsideImage : selectedoutsideImage}  // Show inside or outside for step 4
                                    height={200}
                                    width={100}
                                />
                            </div>

                            <div className="flex justify-center">
                                <button
                                    className="px-2 py-1 mt-2 bg-[#63b2c4] hover:scale-105 transition-transform active:translate-y-1 text-white rounded-sm"
                                    onClick={toggleView2}
                                >
                                    {showInside ? "View Outside" : "View Inside"}
                                </button>
                            </div>
                        </>
                    )}


                    {(currentstep == 5 || currentstep == 6) && selectedinsideImage && selectedoutsideImage && (
                        <div className="mt-5 flex flex-col items-center">
                            <img src={showInside ? selectedinsideImage : selectedoutsideImage}
                                className="w-[100px] h-[350px] "
                            />
                            <button
                                className="mt-3 px-4 py-2 bg-[#63b2c4] text-white rounded-md"
                                onClick={() => setShowInside(!showInside)}
                            >
                                {showInside ? "Show Outside Color" : "Show Inside Color"}
                            </button>
                        </div>
                    )}




                    {(currentstep == 7 || currentstep == 8 || currentstep == 9 || currentstep == 10 || currentstep == 11 || currentstep == 12 || currentstep == 13) && selectNoBlind && (
                        <div className="mt-5 flex flex-col items-center">
                            <img src={showInside ? selectedinsideImage : selectedoutsideImage}
                                className="w-[150px] h-[350px]"
                            />
                            <button
                                className="mt-3 px-4 py-2 bg-[#63b2c4] text-white rounded-md"
                                onClick={() => setShowInside(!showInside)}
                            >
                                {showInside ? "Show Outside Color" : "Show Inside Color"}
                            </button>
                        </div>
                    )}





                    {(currentstep == 7 || currentstep == 8 || currentstep == 9 || currentstep == 10 || currentstep == 11 || currentstep == 12 || currentstep == 13) && selectBlind && (
                        <div className="overflow-hidden fixed left-[10%]">
                            <div className="mt-5 flex flex-col items-center">
                                <div className="">
                                    <img src={showInside ? selectedinsideImage : selectedoutsideImage}
                                        className="w-[150px] h-[350px]"
                                    />
                                </div>

                                <div className="w-[47px] h-[220px] absolute top-[38px] left-[91px]  opacity-70 " style={{ backgroundColor: blindcolor ? blindcolor.color : 'green' }}></div>
                                <div className="w-[47px] h-[220px] absolute top-[38px] left-[28px] opacity-70" style={{ backgroundColor: blindcolor ? blindcolor.color : 'green' }}></div>

                                <button
                                    className="mt-3 px-4 py-2 bg-[#63b2c4] text-white rounded-md"
                                    onClick={() => setShowInside(!showInside)}
                                >
                                    {showInside ? "Show Outside Color" : "Show Inside Color"}
                                </button>
                            </div>
                        </div>
                    )}




                </div>





                <div className="md:w-[65%] pt-5">

                    {currentstep == 1 &&
                        <div className="relative w-full md:max-w-[660px] md:h-80 flex flex-col items-center mt-[1%]">
                            <div className="hidden md:block md:absolute top-0 right-0 z-10 mr-[100px]">
                                <img alt="Dimensions" height={200} width={250} loading="lazy" src="/doors/french.webp" />
                            </div>
                            <div
                                className="p-4 text-white font-semibold md:max-w-[416px] z-30 md:absolute md:top-28 left-0"
                                style={{ background: "rgb(99, 178, 196)" }}
                            >
                                <p className="text-center text-2xl mb-4">Enter Dimensions</p>
                                <div className="flex gap-8 max-w-96 mb-4">

                                    <div className="flex flex-col items-center">
                                        <label htmlFor="width" className="text-xl">Width</label>

                                        <input id="width" type="number"
                                            {...register("width", {
                                                required: "Width is required",
                                                min: { value: 700, message: "Width must be at least 700", },
                                                max: { value: 2476, message: "Width must not exceed 2476", },
                                            })}
                                            placeholder="700-2476"
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
                                                min: { value: 500, message: "Height must be at least 500", },
                                                max: { value: 3063, message: "Height must not exceed 3063", },
                                            })}
                                            placeholder="500 - 3063"
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
                        <>
                            <div className="text-[30px] text-center font-bold pb-3">Master Handle</div>
                            <div className="flex justify-center">
                                <select
                                    className="border rounded-md p-2 w-[150px]"
                                    value={selectedHandleSide}
                                    onChange={handleImgChangeS2}
                                >
                                    <option value="">Select Handle Side</option>
                                    <option value="Left">Left</option>
                                    <option value="Right">Right</option>
                                </select>

                            </div>

                            <div className="flex justify-center gap-[80px]">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" name="openIn" checked={handleOptions.openIn} onChange={handleCheckboxs2} />
                                    Open In
                                </label>

                                <label className="flex items-center gap-2">
                                    <input type="checkbox" name="openOut" checked={handleOptions.openOut} onChange={handleCheckboxs2} />
                                    Open Out
                                </label>
                            </div>


                        </>
                    }




                    {currentstep == 3 &&
                        <div className="md:w-[700px] mx-auto">

                            <div className="font-bold text-[30px] text-center pb-5">External Color</div>

                            <div className="flex flex-wrap justify-center gap-10 cursor-pointer px-2 md:px-0">

                                {Object.entries(colorOptionsoutside).map(([name, { color }]) => (
                                    <div key={name} className={`p-3 rounded-md border border-[#dfdede] hover:bg-[#e2f4f4] 
                            ${outsidecolor === name ? "border-[#63b2c4] bg-[#e2f4f4]" : " border-[#949596]"}
                        `} onClick={() => handleoutsideColorChange(name)} >

                                        <div className="md:w-[180px] md:h-[145px] w-[130px] h-[100px]" style={{ backgroundColor: color }} ></div>
                                        <div className="text-center pt-2 pb-1">{name}</div>
                                    </div>
                                ))}

                            </div>

                        </div>
                    }


                    {currentstep == 4 &&
                        <div className="md:w-[700px] mx-auto">

                            <div className="font-bold text-[30px] text-center pb-5">Internal Color</div>

                            <div className="flex flex-wrap justify-center gap-10 cursor-pointer px-2 md:px-0">

                                {Object.entries(colorOptionsinside).map(([name, { color, image }]) => (
                                    <div key={name} className={`p-3 rounded-md border border-[#dfdede] hover:bg-[#e2f4f4] 
                            ${insidecolor === name ? "border-[#63b2c4] bg-[#e2f4f4]" : " border-[#949596]"}
                        `} onClick={() => handleinsideColorChange(name)} >

                                        <div className="md:w-[170px] md:h-[150px] w-[130px] h-[100px]" style={{ backgroundColor: color }} ></div>
                                        <div className="text-center pt-2 pb-1">{name}</div>
                                    </div>
                                ))}

                            </div>

                        </div>
                    }


                    {currentstep === 5 &&
                        <div className="md:w-[800px] mx-auto">
                            <div className="font-bold text-[30px] text-center pb-5">Cill</div>

                            <div className="flex justify-center gap-10 flex-wrap cursor-pointer px-3 md:px-0">
                                {Cill.map((cill) => (
                                    <div key={cill.name} onClick={() => handleCillSelect(cill.name)}
                                        className={`border-2 p-4 hover:bg-[#e2f4f4] ${selectedCill === cill?.name ? 'border-[#63b2c4] bg-[#e2f4f4]' : ''}`}
                                    >
                                        <img src={cill.image} height={cill.h} width={cill.w} className="object-contain" />
                                        <div className="text-center mt-2">{cill.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }


                    {currentstep === 6 &&
                        <div className="md:w-[800px] mx-auto">
                            <div className="font-bold text-[30px] text-center pb-5">Choose Dual Handle</div>


                            <div className="flex justify-center gap-10 flex-wrap cursor-pointer">
                                {Handles.map((handle) => (
                                    <div key={handle.name}
                                        onClick={() => handle.name === "Dual Color" ? handleDualHandleSelect()
                                            : handleSingleHandleSelect(handle)
                                        }
                                        className={`border-2 p-4 hover:bg-[#e2f4f4] ${(selectedHandle?.name === handle.name || (isDualSelected && handle.name === "Dual Color"))
                                            ? "border-[#63b2c4] bg-[#e2f4f4]"
                                            : ""
                                            }`}
                                    >
                                        <img src={handle.image} height="100" width="100" className="object-contain" />
                                        <div className="text-center mt-2">{handle.name}</div>
                                    </div>
                                ))}
                            </div>

                            {/* If Dual Handle is selected, show inside and outside handle options */}
                            {isDualSelected && (
                                <>
                                    {/* Choose Outside Handle */}
                                    <div className="font-bold text-[30px] text-center pb-5 pt-10">Choose Outside Handle</div>
                                    <div className="flex justify-center gap-10 flex-wrap cursor-pointer">
                                        {handleColors.map((color) => (
                                            <div
                                                key={color.name}
                                                onClick={() => handleOutsideHandleSelect(color)}
                                                className={`border-2 p-4 hover:bg-[#e2f4f4] ${selectedOutsideHandle?.name === color.name ? "border-[#63b2c4] bg-[#e2f4f4]" : ""
                                                    }`}
                                            >
                                                <img src={color.image} height="100" width="100" className="object-contain" />
                                                <div className="text-center mt-2">{color.name}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Choose Inside Handle */}
                                    <div className="font-bold text-[30px] text-center pb-5 pt-10">Choose Inside Handle</div>
                                    <div className="flex justify-center gap-10 flex-wrap cursor-pointer">
                                        {handleColors.map((color) => (
                                            <div
                                                key={color.name}
                                                onClick={() => handleInsideHandleSelect(color)}
                                                className={`border-2 p-4 hover:bg-[#e2f4f4] ${selectedInsideHandle?.name === color.name ? "border-[#63b2c4] bg-[#e2f4f4]" : ""
                                                    }`}
                                            >
                                                <img src={color.image} height="100" width="100" className="object-contain" />
                                                <div className="text-center mt-2">{color.name}</div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}




                        </div>
                    }


                    {currentstep === 7 &&
                        <>
                            <div className="md:w-[800px] mx-auto">
                                <div className="font-bold text-[30px] text-center pb-5">Blinds</div>


                                <div className="flex justify-center gap-10 flex-wrap cursor-pointer">
                                    {Blinds.map((blind) => (
                                        <div key={blind.name}
                                            onClick={() => blind.name === "No Blinds" ? HandleNoBlind(blind)
                                                : handleBlind(blind)
                                            }
                                            className={`border-2 p-4 hover:bg-[#e2f4f4] ${(selectedBlind?.name === blind.name || (HandleNoBlind && blind.name === "No Blind"))
                                                ? "border-[#63b2c4] bg-[#e2f4f4]"
                                                : ""
                                                }`}
                                        >
                                            <img src={blind.image} height="150" width="150" className="object-contain" />
                                            <div className="text-center mt-2">{blind.name}</div>
                                        </div>
                                    ))}
                                </div>


                                {selectBlind && (
                                    <>
                                        {/* Choose Color Of Blind */}
                                        <div className="font-bold text-[30px] text-center pb-5 pt-10">Choose Blind Color</div>
                                        <div className="flex justify-center gap-10 flex-wrap cursor-pointer mb-16">
                                            {BlindsColor.map((color) => (
                                                <div key={color.name} onClick={() => handleBlindColor(color)}
                                                    className={`border-2 p-4 hover:bg-[#e2f4f4] ${blindcolor?.name === color.name ? "border-[#63b2c4] bg-[#e2f4f4]" : ""
                                                        }`}
                                                >

                                                    <div className="w-[200px] h-[150px]" style={{ backgroundColor: color.color }} ></div>
                                                    <div className="text-center pt-2 pb-1">{color.name}</div>
                                                </div>
                                            ))}
                                        </div>

                                    </>
                                )}


                            </div>
                        </>
                    }

                    {currentstep === 8 &&
                        <>
                            <div className="md:w-[800px] mx-auto">
                                <div className="font-bold text-[30px] text-center pb-5">Glass</div>

                                <div className="flex justify-center gap-10 flex-wrap cursor-pointer px-3 md:px-0">

                                    {selectBlind &&
                                        <>
                                            {Glass.map((glass) => (
                                                <div key={glass.name} onClick={() => handleglass(glass)}
                                                    className={`border-2 p-4 hover:bg-[#e2f4f4] ${(selectglass?.name === glass.name)
                                                        ? "border-[#63b2c4] bg-[#e2f4f4]" : ""}`}
                                                >
                                                    <img src={glass.image} height="150" width="150" className="object-contain" />
                                                    <div className="text-center mt-2">{glass.name}</div>
                                                </div>
                                            ))}
                                        </>}



                                    {selectNoBlind &&
                                        <>
                                            {NoBlindGlass.map((glass) => (
                                                <div key={glass.name} onClick={() => handleglass(glass)}
                                                    className={`border-2 p-4 hover:bg-[#e2f4f4] ${(selectglass?.name === glass.name)
                                                        ? "border-[#63b2c4] bg-[#e2f4f4]" : ""}`}
                                                >
                                                    <img src={glass.image} height="150" width="150" className="object-contain" />
                                                    <div className="text-center mt-2">{glass.name}</div>
                                                </div>
                                            ))}
                                        </>
                                    }



                                </div>
                            </div>
                        </>
                    }


                    {currentstep === 9 &&
                        <>
                            <div className="md:w-[800px] mx-auto">
                                <div className="font-bold text-[30px] text-center pb-5">Threshold</div>

                                <div className="flex justify-center gap-10 flex-wrap cursor-pointer md:px-0 px-3">
                                    {Threshold.map((threshold) => (
                                        <div key={threshold.name} onClick={() => handleThreshold(threshold)}
                                            className={`border-2 p-4 hover:bg-[#e2f4f4] ${(selectthreshold?.name === threshold.name)
                                                ? "border-[#63b2c4] bg-[#e2f4f4]" : ""}`}
                                        >
                                            <img src={threshold.image} height="150" width="150" className="object-contain" />
                                            <div className="text-center mt-2">{threshold.name}</div>
                                        </div>
                                    ))}
                                </div>

                                {showinputs &&
                                    <div className="flex gap-10 mt-5 justify-center">
                                        <label className="flex items-center gap-2">
                                            <input type="checkbox" name="OuterRamp" checked={outerRamp}
                                                onChange={(e) => handleRampcheck("Outer Ramp", e.target.checked)}
                                            />
                                            Outer Ramp
                                        </label>

                                        <label className="flex items-center gap-2">
                                            <input type="checkbox" name="InnerRamp" checked={innerRamp}
                                                onChange={(e) => handleRampcheck("Inner Ramp", e.target.checked)}
                                            />
                                            Inner Ramp
                                        </label>
                                    </div>
                                }

                            </div>


                        </>
                    }


                    {(currentstep === 10) &&
                        <>
                            <div className="font-bold text-[30px] text-center pb-5">Additional Items</div>

                            <div className="max-w-[200px] mx-auto text-center">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" name="Flat Pack"
                                        checked={selectedOptions.includes("Flat Pack")}
                                        onChange={() => handleCheckboxChangestep10("Flat Pack")}
                                    />
                                    Flat Pack
                                </label>


                                {!selectedOptions.includes("Moving Corner Post") && (
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" name="Corner Post"
                                            checked={selectedOptions.includes("Corner Post")}
                                            onChange={() => handleCheckboxChangestep10("Corner Post")}
                                        />
                                        Corner Post
                                    </label>
                                )}


                                <label className="flex items-center gap-2">
                                    <input type="checkbox" name="Handle on Both Doors"
                                        checked={selectedOptions.includes("Handle on Both Doors")}
                                        onChange={() => handleCheckboxChangestep10("Handle on Both Doors")}
                                    />
                                    Handle on Both Doors
                                </label>

                                <label htmlFor="countries" className="block mb-2 text-sm mt-5">Trickle Vents</label>
                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    value={values.trickleVents || "0"} // Bind directly to values
                                    onChange={handleTrickleVentsChange}
                                >
                                    {["0", "1", "2",].map((val) => (
                                        <option key={val} value={val}>
                                            {val}
                                        </option>
                                    ))}
                                </select>

                            </div>
                        </>
                    }

                    {currentstep === 11 &&
                        <>
                            <div className="font-bold text-[30px] text-center pb-5">Extras</div>

                            <div className="md:w-[500px] mx-auto text-center bg-[whitesmoke]">

                                <div className="flex justify-center ">
                                    <div className="h-[200px] w-[100px] flex justify-center items-center">{lrt.Left}mm</div>

                                    <div className="h-[200px] w-[80px]">
                                        <div>{lrt.Top}mm</div>

                                        <div className="flex justify-center">
                                            {lrt.Left >= 20 && <div className="h-[205px] w-[6px]" style={{ backgroundColor: selectColor }}></div>}
                                            {lrt.Left == 38 && <div className="h-[205px] w-[6px]" style={{ backgroundColor: selectColor }}></div>}
                                            <div>
                                                {lrt.Top >= 20 && <div className="h-[5px]" style={{ backgroundColor: selectColor }}></div>}
                                                {lrt.Top == 38 && <div className="h-[5px]" style={{ backgroundColor: selectColor }}></div>}
                                                <img src={showInside ? selectedinsideImage : selectedoutsideImage} className="w-[100px] h-[200px]" />
                                            </div>
                                            {lrt.Right >= 20 && <div className="h-[205px] w-[6px]" style={{ backgroundColor: selectColor }}></div>}
                                            {lrt.Right == 38 && <div className="h-[205px] w-[6px]" style={{ backgroundColor: selectColor }}></div>}
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

                            </div>
                        </>
                    }

                    {currentstep === 12 &&
                        <>
                            <div className="font-bold text-[30px] text-center pb-5">Astragal/Transform Bars</div>

                            {selectBlind &&
                                <div className="text-center text-red-500 pb-5">Pane cannot fit blinds, remove the blinds or change the number of transom bars</div>
                            }



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


                    {currentstep === 13 &&
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
                    ${section.id <= currentstep ? "bg-[#63b2c4] text-white" : "text-[#63b2c4]"}
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
