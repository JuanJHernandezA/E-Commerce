import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import type { ICartItem } from "../components/shared/CartItem";

export interface CartState {
    items: ICartItem[];
    totalItemsInCart:number;
    totalAmount:number;

    addItem:(item:ICartItem)=>void;
    removeItem:(variantId:string)=>void;
    updateQuantity: (variantId:string, quantity:number)=>void;
    cleanCart:()=>void

};

const storeApi: StateCreator<CartState>=set=>({
    items:[],
    totalItemsInCart:0,
    totalAmount:0,
    addItem : item=>{
        set(state=> {
            const existingItemIndex = state.items.findIndex(
                i=>i.variantId === item.variantId
            );

            let updatedItems;
            if(existingItemIndex>=0){
                updatedItems=state.items.map((i, index)=>index === existingItemIndex ? {
                    ...i, quantity: i.quantity + item.quantity
                }: i)
            } else {
                updatedItems=[...state.items, item]
        }

        const newTotalItems=updatedItems.reduce((acc,i) =>acc +i.quantity,0);
        const newTotalAmount=updatedItems.reduce((acc,i) =>acc+i.price *i.quantity,0);

        return {
            items: updatedItems,
            totalAmount:newTotalAmount,
            totalItemsInCart:newTotalItems
        }
    
        }
    )
    },
    cleanCart: () => {
        set({items:[], totalAmount:0, totalItemsInCart:0})
    },
    
    removeItem: variantId =>{

        set (state=>{
            const updatedItems=state.items.filter(i=>i.variantId !==variantId)
            const newTotalItems=updatedItems.reduce((acc,i) =>acc +i.quantity,0);
        const newTotalAmount=updatedItems.reduce((acc,i) =>acc+i.price *i.quantity,0);

        return {
            items: updatedItems,
            totalAmount:newTotalAmount,
            totalItemsInCart:newTotalItems
        }
        })
    },
    updateQuantity: (variantId,quantity)=>{
        set (state=>{
            const updatedItems=state.items.map(i=>i.variantId === variantId ? {...i, quantity}:i)
            const newTotalItems=updatedItems.reduce((acc,i) =>acc +i.quantity,0);
        const newTotalAmount=updatedItems.reduce((acc,i) =>acc+i.price *i.quantity,0);

        return {
            items: updatedItems,
            totalAmount:newTotalAmount,
            totalItemsInCart:newTotalItems
        }

        })
    }
})

export const useCartStore = create<CartState>()(devtools(storeApi))