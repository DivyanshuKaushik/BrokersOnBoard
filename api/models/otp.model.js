const monsoose = require("mongoose");

const otpSchema = new monsoose.Schema(
    {
        code: {
            type: String,
            required: true,
            trim: true,
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    },
    { timestamps: true }
);
