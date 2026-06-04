import { z } from "zod";

const checkoutItemSchema = z.object({
  product_id: z.string().min(1),
  name: z.string().min(1),
  quantity: z.number().int().positive(),
  price_egp: z.number().nonnegative(),
});

export const checkoutSchema = z.object({
  firstName: z.string().trim().min(2, "First name must be at least 2 characters"),
  lastName: z.string().trim().min(2, "Last name must be at least 2 characters"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().min(10, "Please enter a valid phone number"),
  address: z.string().trim().min(5, "Address must be at least 5 characters"),
  city: z.string().trim().min(2, "City is required"),
  governorate: z.string().trim().min(2, "Governorate is required"),
  notes: z.string().trim().optional(),
  paymentMethod: z.enum(["cod", "bank"]),
  items: z.array(checkoutItemSchema).min(1, "Cart is empty"),
  subtotal: z.number().nonnegative(),
  discount: z.number().nonnegative(),
  total: z.number().positive("Order total must be greater than zero"),
  couponCode: z.string().trim().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
