import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CandyStoreProduct, TICKET_PRICE_PEN } from '../../mocks';

export interface CandyCartItem extends CandyStoreProduct {
  type: 'candy';
  quantity: number;
}

export interface TicketCartItem {
  type: 'ticket';
  id: string;
  premiereId: string;
  title: string;
  quantity: number;
  unitPrice: number;
}

export type CartItem = CandyCartItem | TicketCartItem;

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CandyStoreProduct>) => {
      const existingItem = state.items.find(
        (item) => item.type === 'candy' && item.id === action.payload.id,
      ) as CandyCartItem | undefined;
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          type: 'candy',
          quantity: 1,
        });
      }
      state.total += action.payload.price;
    },
    addTicket: (
      state,
      action: PayloadAction<{
        premiereId: string;
        title: string;
        unitPrice?: number;
      }>,
    ) => {
      const unitPrice = action.payload.unitPrice ?? TICKET_PRICE_PEN;
      const ticketId = `ticket-${action.payload.premiereId}`;
      const existingItem = state.items.find(
        (item) =>
          item.type === 'ticket' && item.premiereId === action.payload.premiereId,
      ) as TicketCartItem | undefined;
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          type: 'ticket',
          id: ticketId,
          premiereId: action.payload.premiereId,
          title: action.payload.title,
          quantity: 1,
          unitPrice,
        });
      }
      state.total += unitPrice;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        const item = state.items[index];
        state.total -= item.type === 'candy' ? item.price : item.unitPrice;
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items.splice(index, 1);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addItem, addTicket, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
