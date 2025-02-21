import mongoose from 'mongoose';

const windowSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        width: {
            type: String,
            trim: true,
        },
        height: {
            type: String,
            trim: true,
        },
        panes: {
            type: String,
            trim: true,
        },
        frame: {
            type: Object,
            default: { name: "", image: "" }
        },
        configurationPanels: {
            type: String,
            trim: true,
        },
        configuration: {
            type: String,
            trim: true,
        },
        style: {
            type: Object,
            default: { name: "", Optionimage: "" }
        },
        handle: {
            type: Object,
            default: { name: "", image: "" }
        },
        outsidecolor: {
            type: String,
            trim: true,
        },
        insidecolor: {
            type: String,
            trim: true,
        },
        cill: {
            type: String,
            trim: true,
        },
        glass: {
            type: Object,
            default: { name: "", image: "" }
        },
        outsideHandle: {
            type: Object,
            default: { name: "", image: "" }
        },
        insideHandle: {
            type: Object,
            default: { name: "", image: "" }
        },
        blind: {
            type: String,
            trim: true,
        },
        blindcolor: {
            type: Object,
            default: { name: "", color: "" }
        },
        configuration: {
            type: Object,
            default: { paneA: "", paneB: "", paneC: "", paneD: "", paneE: "", paneF: "" }
        },
        threshold: {
            type: String,
            trim: true,
        },
        outerramp: {
            type: String,
            trim: true,
        },
        innerramp: {
            type: String,
            trim: true,
        },
        extras: {
            type: String,
            trim: true,
        },
        trickleVents: {
            type: String,
            trim: true,
        },
        addons: {
            type: Object,
            default: { Top: "", Right: "", Left: "" }
        },
        astragal: {
            type: Object,
            default: { horizontalAstragals: "", verticalAstragals: "", horizontalTransform: "", verticalTransform: "" }
        },
        couplers: {
            type: Object,
            default: { left: "", right: "", top: "", bottom: "" }
        },
        notes: {
            type: String,
            trim: true,
        },

    },
    {
        timestamps: true
    }
);


export default mongoose.models.Window || mongoose.model('Window', windowSchema);