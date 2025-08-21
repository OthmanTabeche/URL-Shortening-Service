import mongoose from 'mongoose';
import validator from 'validator';

const ShortUrlSchema = new mongoose.Schema(
    {
        accessCount: {
            type: Number,
            default: 0
        },
        url: {
            type: String,
            required: true,
            validate: {
                validator: function (value: string) {
                    return validator.isURL(value, { protocols: ['http', 'https'], require_protocol: true });
                },
                message: 'URL must be a valid URL with HTTP or HTTPS'
            }
        },
        shortCode: {
            type: String,
            required: true,
            minlength: 6,
            unique: true
        }
    },
    { timestamps: true }
);

export default mongoose.model("ShortUrl", ShortUrlSchema);
