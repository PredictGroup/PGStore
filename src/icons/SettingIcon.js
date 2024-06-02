import * as React from 'react';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
function SettingIcon(props) {
    return (
        <Svg
            width={props.width}
            height={props.height}
            fill="none"
            viewBox="0 0 18 19"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <Circle cx="6.01329" cy="4.9436" r="3.3" stroke="#181725" stroke-width="1.9" />
            <Rect x="0.243677" y="3.90206" width="3.30802" height="2.08304" rx="1.04152" fill="#181725" stroke="#181725" stroke-width="0.3" />
            <Circle cx="11.67" cy="14.2923" r="3.3" transform="rotate(-180 11.67 14.2923)" stroke="#181725" stroke-width="1.9" />
            <Rect x="9.18554" y="3.90206" width="7.83623" height="2.08304" rx="1.04152" fill="#181725" stroke="#181725" stroke-width="0.3" />
            <Rect x="8.49778" y="15.3338" width="7.84" height="2.08304" rx="1.04152" transform="rotate(-180 8.49778 15.3338)" fill="#181725" stroke="#181725" stroke-width="0.3" />
            <Rect x="17.3464" y="15.3338" width="2.84148" height="2.08304" rx="1.04152" transform="rotate(-180 17.3464 15.3338)" fill="#181725" stroke="#181725" stroke-width="0.3" />
        </Svg>
    );
}

export default SettingIcon;