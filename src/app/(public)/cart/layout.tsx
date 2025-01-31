import React from 'react';
import CartHeader from './components/CartHeader/CartHeader';

interface Props {
    children: React.ReactNode;
}

const CartLayout = ({ children }: Props) => {
    return (
        <div>
            <CartHeader />
            {children}
        </div>
    );
};

export default CartLayout;
