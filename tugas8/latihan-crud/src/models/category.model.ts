import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    make: String,
    model: String,
    owner:{
        type: Schema.Types.ObjectId,
        ref: "Products"
    }
});

const CategoryModel = mongoose.model("Category", CategorySchema);

export default CategoryModel;