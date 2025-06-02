import { createSlice } from "@reduxjs/toolkit";
import { products } from "../assets/frontend_assets/assets";

const initialState = {
  products: [],
  totalQuantity: 0,
  totalPrice: 0.0,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const userEmail = action.payload.userEmail;

      if (!state[userEmail]) {
        state[userEmail] = { products: [], totalQuantity: 0, totalPrice: 0 };
      }

      const itemIndex = state[userEmail].products.find(
        (i) => i.id === newItem.id && i.selectedSize === newItem.selectedSize
      );

      if (itemIndex) {
        // ✅ إذا كان المنتج موجودًا بالفعل، قم بزيادته مرة واحدة فقط
        itemIndex.quantity++;
        itemIndex.totalPrice += newItem.price;
        state[userEmail].totalQuantity++; // ✅ تعديل الكمية الإجمالية فقط هنا
        state[userEmail].totalPrice += newItem.price;
      } else {
        // ✅ إذا لم يكن موجودًا، قم بإضافته بكمية 1، ولكن لا تزيد `totalQuantity` هنا
        state[userEmail].products.push({
          id: newItem.id,
          quantity: 1, // ✅ يبدأ من 1 وليس 0
          name: newItem.name,
          description: newItem.description,
          price: newItem.price,
          image: newItem.image,
          category: newItem.category,
          subCategory: newItem.subCategory,
          sizes: newItem.sizes,
          selectedSize: newItem.selectedSize,
          date: newItem.date,
          bestseller: newItem.bestseller,
          totalPrice: newItem.price,
        });

        state[userEmail].totalQuantity++;
        state[userEmail].totalPrice += newItem.price;
      }
    },

    removeFromCart(state, action) {
      const { id, userEmail, selectedSize } = action.payload;

      if (!state[userEmail]) return; // ✅ تحقق من أن المستخدم لديه سلة

      const findItem = state[userEmail].products.find(
        (i) => i.id === id && i.selectedSize === selectedSize
      );

      if (findItem) {
        // ✅ تقليل `totalPrice` بمقدار السعر * الكمية
        state[userEmail].totalPrice -= findItem.price * findItem.quantity;
        state[userEmail].totalQuantity -= findItem.quantity;

        // ✅ إزالة المنتج من السلة
        state[userEmail].products = state[userEmail].products.filter(
          (item) => !(item.id === id && item.selectedSize === selectedSize)
        );
      }

      console.log("Updated Cart after deletion:", state[userEmail]);
    },
    removeAllFromCart(state, action) {
      const userEmail = action.payload; // ✅ جلب البريد الإلكتروني للمستخدم

      if (!state[userEmail]) return; // ✅ التحقق من وجود سلة للمستخدم

      state[userEmail].products = []; // ✅ تفريغ المنتجات بالكامل
      state[userEmail].totalPrice = 0;
      state[userEmail].totalQuantity = 0;

      console.log("Cart after clearing:", state[userEmail]); // ✅ تحقق من أن السلة أصبحت فارغة
    },

    increaseQuantity(state, action) {
      const { id, selectedSize, userEmail } = action.payload;

      const findItem = state[userEmail]?.products.find(
        (i) => i.id === id && i.selectedSize === selectedSize
      );

      if (findItem) {
        findItem.quantity++;
        findItem.totalPrice += findItem.price;
        state[userEmail].totalQuantity++; // ✅ يعدل فقط إجمالي العناصر للمستخدم
        state[userEmail].totalPrice += findItem.price;
      }
    },

    decreaseQuantity(state, action) {
      const { id, userEmail, selectedSize } = action.payload;
      const findItem = state[userEmail].products.find(
        (i) => i.id === id && i.selectedSize === selectedSize
      );

      if (findItem && findItem.quantity > 1) {
        findItem.quantity--;
        findItem.totalPrice -= findItem.price;
        state[userEmail].totalQuantity--;
        state[userEmail].totalPrice -= findItem.price;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  removeAllFromCart,
} = CartSlice.actions;
export default CartSlice.reducer;
