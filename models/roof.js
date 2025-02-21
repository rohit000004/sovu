import mongoose from 'mongoose';

const roofSchema = new mongoose.Schema(
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
        dimensions: {
            type: String,
            trim: true,
        },
        glass: {
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
        notes: {
            type: String,
            trim: true,
        },

    },
    {
        timestamps: true
    }
);


export default mongoose.models.Roof || mongoose.model('Roof', roofSchema);