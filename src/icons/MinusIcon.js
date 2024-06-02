import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
function MinusIcon(props) {
    return (
        <Svg
            width={props.width}
            height={props.height}
            fill="none"
            viewBox="0 0 18 3"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <Path d="M17.0641 1.47214C17.0641 1.84797 16.92 2.21127 16.6505 2.47435C16.3873 2.7437 16.0239 2.89403 15.6479 2.89403H9.98336H7.14481H1.48023C1.10426 2.89403 0.740829 2.7437 0.477651 2.47435C0.214474 2.21127 0.0640869 1.84797 0.0640869 1.47214C0.0640869 1.09631 0.214474 0.739275 0.477651 0.469931C0.740829 0.20685 1.10426 0.0565186 1.48023 0.0565186H7.14481H9.98336H15.6479C16.0239 0.0565186 16.3873 0.20685 16.6505 0.469931C16.92 0.739275 17.0641 1.09631 17.0641 1.47214Z" fill={props.color} />
        </Svg>
    );
}

export default MinusIcon;