import { createContext } from 'react';

export interface WishlistLineInterface {
    variantId: string;
    quantity: number;
}
export interface ErrorWishlistLine {
    field: string | null;
    message: string | null;
}

export interface WishlistInterface {
    errors: ErrorWishlistLine[] | null;
    lines: WishlistLineInterface[];
    loading: boolean;
    add(variantId: string, quantity?: number): void;
    changeQuantity(lines: WishlistLineInterface[]);
    clear(): void;
    clearErrors(): void;
    getQuantity(): number;
    remove(variantId: string): void;
    subtract(variantId: string, quantity?: number): void;
}

/* tslint:disable:no-empty */
export const WishlistContext = createContext<WishlistInterface>({
    add: (variantId, quantity = 1) => {},
    changeQuantity: (lines: WishlistLineInterface[]) => {},
    clear: () => {},
    clearErrors: () => {},
    errors: null,
    getQuantity: () => 0,
    lines: [],
    loading: false,
    remove: variantId => {},
    subtract: (variantId, quantity = 1) => {},
});
/* tslint:enable:no-empty */
WishlistContext.displayName = "WishlistContext";
