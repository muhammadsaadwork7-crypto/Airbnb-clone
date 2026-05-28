const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        type: String,
        default: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
        set: (v) => v === "" ? "https://images.unsplash.com/photo-1505691938895-1758d7feb511" : v,
    }, 
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

listingSchema.post("findOneAndDelete", async(listing) => {
    if (listing){
    await Review.deleteMany({reviews: {$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;