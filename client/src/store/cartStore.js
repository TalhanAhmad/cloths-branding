import create from 'zustand';

export const useCartStore = create((set) => ({
  cart: [],
  user: null,
  
  addToCart: (product) => set((state) => {
    const existingItem = state.cart.find(item => item._id === product._id);
    if (existingItem) {
      return {
        cart: state.cart.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    }
    return { cart: [...state.cart, { ...product, quantity: 1 }] };
  }),
  
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(item => item._id !== productId)
  })),
  
  updateQuantity: (productId, quantity) => set((state) => ({
    cart: state.cart.map(item =>
      item._id === productId ? { ...item, quantity } : item
    ).filter(item => item.quantity > 0)
  })),
  
  clearCart: () => set({ cart: [] }),
  
  setUser: (user) => set({ user })
}));
