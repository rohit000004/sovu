import mongoose from 'mongoose';

const doorSchema = new mongoose.Schema(
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
        configurationPanels: {
            type: String,
            trim: true,
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
            type: Object,
            default: { name: "", image: "" }
        },
        blindcolor: {
            type: Object,
            default: { name: "", color: "" }
        },
        threshold: {
            type: Object,
            default: { name: "", image: "" }
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
        astragals: {
            type: Object,
            default: { horizontalAstragals: "", verticalAstragals: "", horizontalTransform: "", verticalTransform: "" }
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


export default mongoose.models.Door || mongoose.model('Door', doorSchema);