import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    items: [
      {
        productId: String,
        name: String,
        price: Number, // in kobo
        imageUrl: String,
        quantity: Number,
      },
    ],
    subtotal: {
      type: Number,
      required: true, // in kobo
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'fulfilled', 'cancelled'],
      default: 'pending',
    },
    paystackReference: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model('Order', orderSchema);
