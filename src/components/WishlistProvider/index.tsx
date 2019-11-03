import { pullAllBy } from 'lodash';
import React from 'react';

import { CartInterface } from '../CartProvider/context';
import { WishlistContext, WishlistInterface, WishlistLineInterface } from './context';

enum LocalStorageKeys {
    Wishlist = "wishlist",
}

interface WishlistProviderProps {
    cartConsumer: CartInterface
}

type WishlistProviderState = WishlistInterface;


export default class WishlistProvider extends React.Component<WishlistProviderProps, WishlistProviderState > {

    constructor(props: WishlistProviderProps) {
        super(props);

        let lines;
        try {
            lines = JSON.parse(localStorage.getItem(LocalStorageKeys.Wishlist)) || [];
        } catch {
            lines = [];
        }

        this.state = {
            add: this.add,
            changeQuantity: this.changeQuantity,
            clear: this.clear,
            clearErrors: this.clearErrors,
            errors: null,
            getQuantity: this.getQuantity,
            lines,
            loading: false,
            remove: this.remove,
            subtract: this.subtract,
            addToCart: this.addToCart,
        }
    }

    // componentDidUpdate() {
    //     const {
    //         chec
    //     }
    // }

    getLine = (variantId: string): WishlistLineInterface => (
        this.state.lines.find(line => line.variantId === variantId)
    );

    changeQuantity = (lines: WishlistLineInterface[]) => {
        this.setState({
            ...this.state,
            loading: true,
        });
        const updatedLines  =  [
            ...pullAllBy(this.state.lines, lines, "variantId"),
            ...lines,
        ].filter(line => line.quantity);

        localStorage.setItem(LocalStorageKeys.Wishlist, JSON.stringify(updatedLines));
        this.setState({
            lines: updatedLines,
            loading: false,
        });
    }

    add = (variantId: string, quantity = 1) => {
        const line = this.getLine(variantId);
        const newQuantity = line ? line.quantity + quantity : quantity;
        this.changeQuantity([{ variantId, quantity: newQuantity }]);
    };

    subtract = (variantId, quantity = 1) => {
        const line = this.getLine(variantId);
        const newQuantity = line ? line.quantity - quantity : quantity;
        this.changeQuantity([{ variantId, quantity: newQuantity }]);
    };
    
    clear = () => {
        this.setState({ lines: [], errors: [] });
        localStorage.removeItem(LocalStorageKeys.Wishlist);
    };
    
    clearErrors = () => this.setState({ errors: [] });
    
    getQuantity = () =>
        this.state.lines.reduce((sum, line) => sum + line.quantity, 0);
    
    remove = variantId => this.changeQuantity([{ variantId, quantity: 0 }]);

    addToCart = () => {
        const { lines } = this.state;
        const { cartConsumer } = this.props;
        for(const line of lines) {
            cartConsumer.add(line.variantId, line.quantity);
        }
        this.clear();
    }
    render() {
        return (
            <WishlistContext.Provider value={this.state}>
                {this.props.children}
            </WishlistContext.Provider>
        );
    }

}