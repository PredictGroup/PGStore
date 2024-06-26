import * as React from 'react';
import Svg, { Path, StrokeProps, stroke } from 'react-native-svg';
function OrdersIcon(props) {
    return (
        <Svg
            width={props.width}
            height={props.height}
            fill="none"
            viewBox="0 0 21 23"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <Path d="M4.09149 1.14722L1.09149 5.14722V19.1472C1.09149 19.6776 1.30221 20.1864 1.67728 20.5614C2.05235 20.9365 2.56106 21.1472 3.09149 21.1472H17.0915C17.6219 21.1472 18.1306 20.9365 18.5057 20.5614C18.8808 20.1864 19.0915 19.6776 19.0915 19.1472V5.14722L16.0915 1.14722H4.09149Z" stroke="#181725" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M1.09149 5.14722H19.0915" stroke="#181725" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M14.0915 9.14722C14.0915 10.2081 13.6701 11.2255 12.9199 11.9756C12.1698 12.7258 11.1524 13.1472 10.0915 13.1472C9.03063 13.1472 8.01321 12.7258 7.26306 11.9756C6.51292 11.2255 6.09149 10.2081 6.09149 9.14722" stroke="#181725" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    );
}

export default OrdersIcon;