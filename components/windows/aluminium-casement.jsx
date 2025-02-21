import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

export default function AluminiumCasement() {

    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, setValue, trigger, watch } = useForm({ mode: "onChange", });

    const [active, setactive] = useState(false);
    const [currentstep, setcurrentstep] = useState(1);

    const [values, setvalues] = useState({
        name: "Aluminium Casement Window",
        width: "",
        height: "",
        frame: "",
        style: "",
        configuration: "",
        outsidecolor: "",
        insidecolor: "",
        cill: "",
        handle: "",
        insideHandle: "",
        outsideHandle: "",
        blind: "",
        blindcolor: "",
        glass: "",
        threshold: "",
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
        2: ["frame"],
        3: ["outsidecolor"],
        4: ["insidecolor"],
        5: ["style"],
        // 6: ["configuration"],
        7: ["cill"],
        // 8: ["blind"],
        9: ["glass"],
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
            if (width >= 250 && width <= 5076 && height >= 250 && height <= 3036) {
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



    // Step2

    // Step 9
    const [selectframe, setselectselectframe] = useState(null);

    const Frame = [
        { name: 'Standard Flush', image: '/windows/casement/standard-flush.png', },
        { name: 'Slim Flush', image: '/windows/casement/slim-flush.png', },
        { name: 'Standard', image: '/windows/casement/standard.png', },
    ];

    const handleFrame = (frame) => {
        setselectselectframe(frame);
        setvalues((prev) => {
            const newValues = { ...prev, frame: frame };
            setactive(validateStep(currentstep, newValues));
            return newValues;
        });
    }



    // Step 3 & 4
    const [showInside, setShowInside] = useState(true);

    const [outsidecolor, setoutsidecolor] = useState("");
    const [selectedoutsideImage, setselectedoutsideImage] = useState(null);
    const [selectColor, setselectColor] = useState(null);
    const [insidecolor, setinsidecolor] = useState("");
    const [selectedinsideImage, setselectedinsideImage] = useState(null);

    const colorOptionsoutside = {
        Anthracite: { color: "#383E42", Outsideimage: "/doors/bifold/outside-anthracite.png", Insideimage: "/doors/bifold/inside-anthracite.png", },
        White: { color: "#FFFFFF", Outsideimage: "/doors/bifold/outside-white.png", Insideimage: "/doors/bifold/inside-white.png", },
        Black: { color: "#000000", Outsideimage: "/doors/bifold/outside-black.png", },
    };

    const colorOptionsinside = {
        White: { color: "#FFFFFF", Outsideimage: "/doors/bifold/outside-white.png", Insideimage: "/doors/bifold/inside-white.png", },
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


    // Step 5
    const [selectedwindow, setselectedwindow] = useState(null);

    const Window = [
        { name: 'Style 1', Optionimage: '/windows/casement/window-styles/1.png', image: "/windows/casement/style/style1.png" },
        { name: 'Style 2', Optionimage: '/windows/casement/window-styles/2.png', image: "/windows/casement/style/style2.png" },
        { name: 'Style 3', Optionimage: '/windows/casement/window-styles/3.png', image: "/windows/casement/style/style3.png" },
        { name: 'Style 4', Optionimage: '/windows/casement/window-styles/4.png', image: "/windows/casement/style/style4.png" },
        { name: 'Style 5', Optionimage: '/windows/casement/window-styles/5.png', image: "/windows/casement/style/style5.png" },
        { name: 'Style 6', Optionimage: '/windows/casement/window-styles/6.png', image: "/windows/casement/style/style6.png" },
        { name: 'Style 7', Optionimage: '/windows/casement/window-styles/7.png', image: "/windows/casement/style/style7.png" },
        { name: 'Style 8', Optionimage: '/windows/casement/window-styles/8.png', image: "/windows/casement/style/style8.png" },
        { name: 'Style 9', Optionimage: '/windows/casement/window-styles/22.png', image: "/windows/casement/style/style9.png" },
        { name: 'Style 10', Optionimage: '/windows/casement/window-styles/9.png', image: "/windows/casement/style/style10.png" },
        { name: 'Style 11', Optionimage: '/windows/casement/window-styles/10.png', image: "/windows/casement/style/style11.png" },
        { name: 'Style 12', Optionimage: '/windows/casement/window-styles/11.png', image: "/windows/casement/style/style12.png" },
        { name: 'Style 13', Optionimage: '/windows/casement/window-styles/12.png', image: "/windows/casement/style/style13.png" },
        { name: 'Style 14', Optionimage: '/windows/casement/window-styles/13.png', image: "/windows/casement/style/style14.png" },
        { name: 'Style 15', Optionimage: '/windows/casement/window-styles/14.png', image: "/windows/casement/style/style15.png" },
        { name: 'Style 16', Optionimage: '/windows/casement/window-styles/16.png', image: "/windows/casement/style/style16.png" },
        { name: 'Style 18', Optionimage: '/windows/casement/window-styles/17.png', image: "/windows/casement/style/style18.png" },
        { name: 'Style 19', Optionimage: '/windows/casement/window-styles/18.png', image: "/windows/casement/style/style19.png" },
        { name: 'Style 20', Optionimage: '/windows/casement/window-styles/19.png', image: "/windows/casement/style/style20.png" },
        { name: 'Style 21', Optionimage: '/windows/casement/window-styles/20.png', image: "/windows/casement/style/style21.png" },
        { name: 'Style 22', Optionimage: '/windows/casement/window-styles/21.png', image: "/windows/casement/style/style22.png" },
        { name: 'Style 23', Optionimage: '/windows/casement/window-styles/23.png', image: "/windows/casement/style/style23.png" },
    ];


    const handleWindow = (window) => {
        setselectedwindow(window);
        setvalues((prev) => {
            const newValues = { ...prev, style: window };
            setactive(validateStep(currentstep, newValues));
            return newValues;
        });
    };


    // Step 6
    const paneOptions = ["Fixed", "Top Opener", "Left Opener", "Dummy"];

    // Initial empty configuration
    const [paneValues, setPaneValues] = useState({
        paneA: "",
        paneB: "",
        paneC: "",
        paneD: "",
        paneE: "",
        paneF: "",
    });

    const handlePaneChange = (pane, value) => {
        setPaneValues((prev) => {
            const newPaneValues = { ...prev, [pane]: value };

            setvalues((prevValues) => {
                const newValues = {
                    ...prevValues,
                    configuration: {
                        ...prevValues.configuration,
                        ...newPaneValues,
                    },
                };
                setactive(validateStep(currentstep, newValues)); // Validate step after updating values
                return newValues;
            });

            return newPaneValues;
        });
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
        { id: 2, title: 'frame' },
        { id: 3, title: 'Outside Colour' },
        { id: 4, title: 'Inside Colour' },
        { id: 5, title: 'Style' },
        { id: 6, title: 'Configuration' },
        { id: 7, title: 'Cill' },
        { id: 8, title: 'Blinds' },
        { id: 9, title: 'Glass' },
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

                    {(currentstep == 5 || currentstep == 6 || currentstep == 7 || currentstep == 8 || currentstep == 9 || currentstep == 10 || currentstep == 11 || currentstep == 12 || currentstep == 13) &&
                        <div className="mt-5 flex flex-col items-center">
                            <img src={selectedwindow?.image}
                                className="w-[150px] h-[350px] "
                            />

                        </div>
                    }

                </div>





                <div className="md:w-[65%] pt-5">

                    {currentstep == 1 &&
                        <div className="relative w-full md:max-w-[660px] md:h-80 flex flex-col items-center mt-[1%]">
                            <div className="hidden md:block md:absolute top-0 right-0 z-10 mr-[100px]">
                                <img alt="Dimensions" height={200} width={250} loading="lazy" src="/windows/casement.webp" />
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
                                                min: { value: 250, message: "Width must be at least 250", },
                                                max: { value: 5076, message: "Width must not exceed 5076", },
                                            })}
                                            placeholder="250 - 5076"
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


                    {currentstep === 2 &&
                        <>
                            <div className="md:w-[800px] mx-auto">
                                <div className="font-bold text-[30px] text-center pb-5">Frame</div>

                                <div className="flex justify-center gap-10 flex-wrap cursor-pointer px-3 md:px-0">
                                    <>
                                        {Frame.map((frame) => (
                                            <div key={frame.name} onClick={() => handleFrame(frame)}
                                                className={`border-2 p-4 hover:bg-[#e2f4f4] ${(selectframe?.name === frame.name)
                                                    ? "border-[#63b2c4] bg-[#e2f4f4]" : ""}`}
                                            >
                                                <img src={frame.image} height="150" width="150" className="object-contain" />
                                                <div className="text-center mt-2">{frame.name}</div>
                                            </div>
                                        ))}
                                    </>
                                </div>
                            </div>
                        </>
                    }



                    {currentstep == 3 &&
                        <div className="md:w-[800px] mx-auto">

                            <div className="font-bold text-[30px] text-center pb-5">External Color</div>

                            <div className="flex flex-wrap justify-center gap-10 cursor-pointer px-2 md:px-0">

                                {Object.entries(colorOptionsoutside).map(([name, { color }]) => (
                                    <div key={name} className={`p-3 rounded-md border border-[#dfdede] hover:bg-[#e2f4f4] 
                            ${outsidecolor === name ? "border-[#63b2c4] bg-[#e2f4f4]" : " border-[#949596]"}
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
                            ${insidecolor === name ? "border-[#63b2c4] bg-[#e2f4f4]" : " border-[#949596]"}
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
                                <div className="font-bold text-[30px] text-center pb-5">Window Style</div>
                                <div className="flex justify-center gap-10 flex-wrap cursor-pointer px-3 md:px-0">
                                    {Window.map((window) => (
                                        <div key={window.name} onClick={() => handleWindow(window)}
                                            className={`border-2 p-4 hover:bg-[#e2f4f4] ${selectedwindow?.name === window?.name ? 'border-[#63b2c4] bg-[#e2f4f4]' : ''}`}
                                        >
                                            <img src={window.Optionimage} height={100} width={100} className="object-contain" />
                                            <div className="text-center mt-2">{window.name}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    }



                    {currentstep === 6 &&
                        <div className="md:w-[800px] mx-auto">
                            <div className="font-bold text-[30px] text-center pb-5">Configuration</div>

                            <div className="flex justify-center gap-10 flex-wrap cursor-pointer px-3 md:px-0">

                                {["A", "B", "C", "D", "E", "F"].map((pane) => (
                                    <div key={pane} className="flex items-center gap-4">
                                        <label className="font-bold w-16">Pane {pane}</label>
                                        <select
                                            value={paneValues[`pane${pane}`]}
                                            onChange={(e) => handlePaneChange(`pane${pane}`, e.target.value)}
                                            className="border-2 p-2 rounded w-52"
                                        >
                                            <option value="">Select Option</option>
                                            {paneOptions.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ))}

                            </div>
                        </div>
                    }



                    {currentstep === 7 &&
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


                    {currentstep === 8 &&
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




                    {currentstep === 9 &&
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


                    {(currentstep === 10) &&
                        <>
                            <div className="font-bold text-[30px] text-center pb-5">Additional Items</div>

                            <div className="max-w-[200px] mx-auto text-center">





                                <label className="flex items-center gap-2">
                                    <input type="checkbox" name="Corner Post"
                                        checked={selectedOptions.includes("Corner Post")}
                                        onChange={() => handleCheckboxChangestep10("Corner Post")}
                                    />
                                    Corner Post
                                </label>






                                <label htmlFor="countries" className="block mb-2 text-sm mt-5">Trickle Vents</label>
                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    value={values.trickleVents || "0"} // Bind directly to values
                                    onChange={handleTrickleVentsChange}
                                >
                                    {["0", "1", "2", "3", "4"].map((val) => (
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
                            <div className="font-bold text-[30px] text-center pb-5">AddOns</div>

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

                                <p className="text-red-500 py-3">Top Addon required for trickle vents (38mm may be required)</p>

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
