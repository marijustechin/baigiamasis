import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;

  // Actions
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;

  // Internal method (needed for store logic)
  recalculateTotal: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  totalPrice: 0,

  // Add item or increase quantity
  addItem: (item) => {
    const existing = get().items.find((i) => i.id === item.id);

    if (existing) {
      set((state) => ({
        items: state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        ),
      }));
    } else {
      set((state) => ({
        items: [...state.items, item],
      }));
    }

    // Recalculate total
    get().recalculateTotal();
  },

  // Remove item by ID
  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    }));
    get().recalculateTotal();
  },

  // Set quantity directly
  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }

    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
    }));

    get().recalculateTotal();
  },

  // Clear all
  clearCart: () => {
    set({ items: [], totalPrice: 0 });
  },

  // Internal helper
  recalculateTotal: () => {
    const total = get().items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    set({ totalPrice: total });
  },
}));
