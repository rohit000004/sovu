import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

export default function Aluminiumupvc() {

    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, setValue, trigger, watch } = useForm({ mode: "onChange", });

    const [active, setactive] = useState(false);
    const [currentstep, setcurrentstep] = useState(1);

    const [values, setvalues] = useState({
        name: "Aluminium UPVC Window",
        width: "",
        height: "",
        outsidecolor: "",
        insidecolor: "",
        style: "",
        framewidth: "",
        frame: "",
        extras: "",
        configuration: "",
        cill: "",
        glass: "",
        addons: "",
        couplers: "",
        notes: "",
    });

    useEffect(() => { setactive(validateStep(currentstep, values)); }, [values, currentstep]);

    const stepValidationRules = {
        1: ["width", "height"],
        2: ["frame"],
        3: ["outsidecolor"],
        4: ["insidecolor"],
        5: ["style"],

        7: ["framewidth"],
        8: ["cill"],
        9: ["glass"],

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


    // Step 2
    const [selectedframe, setselectedframe] = useState(null);

    const Frame = [
        { name: 'Sculptured', image: '/windows/upvc/sculptured.png', },
        { name: 'Chamfered', image: '/windows/upvc/chamfered.png', },
    ];

    const handleFrame = (frame) => {
        setselectedframe(frame);
        setvalues((prev) => {
            const newValues = { ...prev, frame: frame.name };
            setactive(validateStep(currentstep, newValues));
            return newValues;
        });
    };



    // Step 3
    const [selectColor, setselectColor] = useState(null);
    const [outsidecolor, setoutsidecolor] = useState(null);

    const OutsideColor = [
        { name: 'White', image: '/windows/upvc/White.png', code: "" },
        { name: 'Anthracite Grey', image: '/windows/upvc/AnthraciteGrey.png', code: "" },
        { name: 'Oak', image: '/windows/upvc/GoldenOak.png', code: "" },
        { name: 'Agate Grey', image: '/windows/upvc/AgateGrey.png', code: "" },
        { name: 'Rosewood', image: '/windows/upvc/Rosewood.png', code: "" },
        { name: 'Black Brown', image: '/windows/upvc/BlackBrown.png', code: "" },
        { name: 'Cream Foil', image: '/windows/upvc/Cream.png', code: "" },
        { name: 'Gale Grey Finesse', image: '/windows/upvc/GaleGrey.png', code: "" },
        { name: 'White Foil', image: '/windows/upvc/WhiteFoil.png', code: "" },
    ];

    const handleOutsideColor = (color) => {
        setoutsidecolor(color);
        setvalues((prev) => {
            const newValues = { ...prev, outsidecolor: color.name };
            setactive(validateStep(currentstep, newValues));
            return newValues;
        });
        console.log(OutsideColor[color]);

        // setselectColor(OutsideColor[color].code);
    };



    // Step 4
    const [insidecolor, setinsidecolor] = useState(null);

    const InsideColor = [
        { name: 'White', image: '/windows/upvc/White.png', code: "#ffffff" },
    ];

    const handleInsideColor = (color) => {
        setinsidecolor(color);
        setvalues((prev) => {
            const newValues = { ...prev, insidecolor: color.name };
            setactive(validateStep(currentstep, newValues));
            return newValues;
        });
        // setselectColor(InsideColor[color].code);
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
    const [selectedframewidth, setselectedframewidth] = useState(null);

    const FrameWidth = [
        { name: '57mm', image: '/windows/upvc/57mm.png', },
        { name: '77mm', image: '/windows/upvc/77mm.png', },
    ];

    const handleFrameWidth = (frame) => {
        setselectedframewidth(frame);
        setvalues((prev) => {
            const newValues = { ...prev, framewidth: frame };
            setactive(validateStep(currentstep, newValues));
            return newValues;
        });
    };



    // Step 8
    const [selectedCill, setselectedCill] = useState(null);

    const Cill = [
        { name: 'No Cill Face Drainage', image: '/windows/upvc/cill/no.png', h: "90", w: "90" },
        { name: '85 mm', image: '/windows/upvc/cill/85mm.png', h: "150", w: "150" },
        { name: '150 mm', image: '/windows/upvc/cill/150mm.png', h: "150", w: "150" },
        { name: '180 mm', image: '/windows/upvc/cill/180mm.png', h: "150", w: "150" },
        { name: '225 mm', image: '/windows/upvc/cill/225mm.png', h: "150", w: "150" },
        { name: 'No Cill Conceled Drainage', image: '/windows/upvc/cill/no.png', h: "90", w: "90" },
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



    const Glass = [
        { name: 'Unglazed', image: '/windows/upvc/unglazed.png', },
        { name: '4mm Softcoat Low E', image: '/windows/upvc/standard.png' },
        { name: '4mm Tuff Softcoat Low E', image: '/windows/upvc/standard.png', },
        { name: '6.4mm Laminate/4mm Tuff Softcoat Low E', image: '/windows/upvc/laminated.png', },
        { name: '6.8mm Laminate/4mm Tuff Softcoat Low E', image: '/windows/upvc/laminated.png', },
        { name: '6.4mm Laminate Softcoat Low E', image: '/windows/upvc/laminated.png', },
        { name: '6.8mm Laminate Softcoat Low E', image: '/windows/upvc/laminated.png', },
        { name: '6mm Tuff Softcoat Low E', image: '/windows/upvc/standard.png', },
        { name: '4mm Triple Glazing Softcoat Low E', image: '/windows/upvc/triple-glazed.png', },
        { name: '4mm Triple Glazing Tuff Softcoat Low E', image: '/windows/upvc/triple-glazed.png', },
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

    const [trickleVents, setTrickleVents] = useState("0");

    const handleTrickleVentsChange = (e) => {
        const selectedValue = e.target.value;

        setvalues((prev) => ({
            ...prev, trickleVents: selectedValue,
        }));

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
            // setactive(validateStep(currentstep, newValues));
            return newValues;
        });

    };



    // Step 12
    const couplerOptions = ["None", "2mm Coupler", "2mm Butt Joint"];
    const handleCouplerChange = (position, value) => {
        setvalues((prev) => {
            const newCouplers = {
                ...prev.couplers,
                [position]: value,
            };

            const newValues = {
                ...prev, couplers: newCouplers,
            };

            // setactive(validateStep(currentstep, newValues));

            return newValues;
        });
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
        { id: 2, title: 'Frame' },
        { id: 3, title: 'Outside Colour' },
        { id: 4, title: 'Inside Colour' },
        { id: 5, title: 'Style' },
        { id: 6, title: 'Configuration' },
        { id: 7, title: 'Framewidth' },
        { id: 8, title: 'Cill' },
        { id: 9, title: 'Glass' },
        { id: 10, title: 'Extras' },
        { id: 11, title: 'Addons' },
        { id: 12, title: 'Couplers' },
        { id: 13, title: 'Notes' },
    ];

    const startstep = 1;
    const maxsteps = 12;
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


                    {currentstep == 2 &&
                        <div className="md:w-[800px] mx-auto">

                            <div className="font-bold text-[30px] text-center pb-5">Window Frame</div>

                            <div className="flex flex-wrap justify-center gap-10 cursor-pointer px-2 md:px-0">

                                {Frame.map((frame) => (
                                    <div
                                        key={frame.name}
                                        className={`border rounded-lg p-2 ${selectedframe?.name === frame.name ? "border-[#63b2c4] bg-[#e2f4f4]" : ""}`}
                                        onClick={() => handleFrame(frame)}
                                    >
                                        <img src={frame.image} className="w-32 h-32 object-contain" />
                                        <div className="text-center mt-2">{frame.name}</div>
                                    </div>
                                ))}

                            </div>

                        </div>
                    }


                    {currentstep == 3 &&
                        <div className="md:w-[800px] mx-auto">

                            <div className="font-bold text-[30px] text-center pb-5">External Color</div>

                            <div className="flex flex-wrap justify-center gap-10 cursor-pointer px-2 md:px-0">
                                {OutsideColor.map((color) => (
                                    <div
                                        key={color.name}
                                        className={`border rounded-lg p-2 ${outsidecolor?.name === color.name ? "border-[#63b2c4] bg-[#e2f4f4]" : ""}`}
                                        onClick={() => handleOutsideColor(color)}
                                    >
                                        <img src={color.image} className="w-32 h-32 object-contain" />
                                        <div className="text-center mt-2">{color.name}</div>
                                    </div>
                                ))}


                            </div>

                        </div>
                    }

                    {currentstep == 4 &&
                        <div className="md:w-[800px] mx-auto">

                            <div className="font-bold text-[30px] text-center pb-5">Internal Color</div>

                            <div className="flex flex-wrap justify-center gap-10 cursor-pointer px-2 md:px-0">
                                {InsideColor.map((color) => (
                                    <div
                                        key={color.name}
                                        className={`border rounded-lg p-2 ${insidecolor?.name === color.name ? "border-[#63b2c4] bg-[#e2f4f4]" : ""}`}
                                        onClick={() => handleInsideColor(color)}
                                    >
                                        <img src={color.image} className="w-32 h-32 object-contain" />
                                        <div className="text-center mt-2">{color.name}</div>
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


                    {currentstep == 7 &&
                        <div className="md:w-[800px] mx-auto">

                            <div className="font-bold text-[30px] text-center pb-5">Frame Width</div>

                            <div className="flex flex-wrap justify-center gap-10 cursor-pointer px-2 md:px-0">

                                {FrameWidth.map((frame) => (
                                    <div
                                        key={frame.name}
                                        className={`border rounded-lg p-2 ${selectedframewidth?.name === frame.name ? "border-[#63b2c4] bg-[#e2f4f4]" : ""}`}
                                        onClick={() => handleFrameWidth(frame)}
                                    >
                                        <img src={frame.image} className="w-32 h-32 object-contain" />
                                        <div className="text-center mt-2">{frame.name}</div>
                                    </div>
                                ))}

                            </div>

                        </div>
                    }

                    {currentstep === 8 &&
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


                    {currentstep === 9 &&
                        <>
                            <div className="md:w-[800px] mx-auto mb-[100px]">
                                <div className="font-bold text-[30px] text-center pb-5">Glass</div>

                                <div className="flex justify-center gap-10 flex-wrap cursor-pointer px-3 md:px-0">

                                    <>
                                        {Glass.map((glass) => (
                                            <div key={glass.name} onClick={() => handleglass(glass)}
                                                className={`border-2 p-4 hover:bg-[#e2f4f4] ${(selectglass?.name === glass.name)
                                                    ? "border-[#63b2c4] bg-[#e2f4f4]" : ""}`}
                                            >
                                                <img src={glass.image} height="100" width="100" className="object-contain" />
                                                <div className="text-center mt-2 max-w-[95px] text-sm">{glass.name}</div>
                                            </div>
                                        ))}
                                    </>


                                </div>
                            </div>
                        </>
                    }

                    {(currentstep === 10) &&
                        <>
                            <div className="font-bold text-[30px] text-center pb-5">Additional Items</div>

                            <div className="max-w-[200px] mx-auto text-center">

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
                                                <img src={selectedwindow?.image} className="w-[200px] h-[300px]" />
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



                    {currentstep == 12 &&
                        <>
                            <div className="font-bold text-[30px] text-center pb-5">Couplers</div>

                            <div className="md:w-[500px] mx-auto  px-3">

                                <div className="grid grid-cols-2 gap-8">
                                    {["left", "right", "top", "bottom"].map((position, index) => (
                                        <div key={position} className="flex flex-col w-full">
                                            <label className="font-semibold capitalize mb-1">
                                                Coupler {position}
                                            </label>
                                            <select
                                                className="p-2 border rounded-md text-black outline-none cursor-pointer"
                                                value={values.couplers?.[position] || ""}
                                                onChange={(e) => handleCouplerChange(position, e.target.value)}
                                            >
                                                <option value="">Select Coupler</option>
                                                {couplerOptions.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
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
