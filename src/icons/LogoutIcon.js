import * as React from 'react';
import Svg, { Path, stroke } from 'react-native-svg';
function LogoutIcon(props) {
    return (
        <Svg
            width={props.width}
            height={props.height}
            fill="none"
            viewBox="0 0 21 21"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <Path d="M7.33496 19.8823H3.33496C2.80453 19.8823 2.29582 19.6716 1.92075 19.2965C1.54567 18.9215 1.33496 18.4128 1.33496 17.8823V3.88232C1.33496 3.35189 1.54567 2.84318 1.92075 2.46811C2.29582 2.09304 2.80453 1.88232 3.33496 1.88232H7.33496" stroke={props.color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M14.335 15.8823L19.335 10.8823L14.335 5.88232" stroke={props.color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M19.335 10.8823H7.33496" stroke={props.color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    );
}


export default LogoutIcon;