import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true, // in kobo (NGN × 100)
    },
    category: {
      type: String,
      enum: ['phones', 'tablets', 'laptops', 'smartwatches', 'headphones', 'chargers', 'cases', 'screen-protectors', 'accessories'],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

productSchema.virtual('id').get(function () {
  return this._id.toString();
});

export default mongoose.models.Product ||
  mongoose.model('Product', productSchema);
