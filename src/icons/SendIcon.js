import * as React from 'react';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
function SendIcon(props) {
    return (
        <Svg
            width={props.width}
            height={props.height}
            fill="none"
            viewBox="0 0 512 448"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <Path d="M509.532 2.99899C507.24 0.76599 503.854 0.0749897 500.874 1.23499L5.21303 193.734C2.26703 194.878 0.246026 197.617 0.021026 200.768C-0.203974 203.919 1.40703 206.917 4.15903 208.468L106.878 266.343L142.529 440.602C142.751 441.834 143.252 442.981 143.971 443.966C144.043 444.065 144.102 444.141 144.162 444.217C145.418 445.788 147.199 446.885 149.275 447.217C149.54 447.259 149.806 447.289 150.07 447.305C150.241 447.316 150.411 447.321 150.581 447.321C152.14 447.321 153.617 446.876 154.876 446.093C155.302 445.829 155.707 445.524 156.083 445.178C156.2 445.07 156.302 444.973 156.401 444.872L233.724 367.352C236.91 364.157 236.904 358.983 233.709 355.797C230.511 352.609 225.341 352.617 222.154 355.812L161.415 416.706L174.539 304.312L360.034 406.126C361.902 407.146 363.978 407.365 365.88 406.906C366.089 406.855 366.28 406.801 366.469 406.74C368.347 406.131 369.995 404.863 371.043 403.043C371.096 402.949 371.143 402.864 371.189 402.779C371.401 402.375 371.571 401.979 371.706 401.577L511.521 11.608C512.6 8.59599 511.824 5.22999 509.532 2.99899ZM27.232 202.712L432.364 45.371L113.843 251.511L27.232 202.712ZM162.72 284.936C161.956 285.549 161.291 286.31 160.771 287.203C160.703 287.32 160.639 287.438 160.577 287.557C160.081 288.516 159.793 289.529 159.698 290.543L148.365 387.6L123.258 264.882L398.363 86.84L162.72 284.936ZM359.507 387.195L182.223 289.888L485.928 34.574L359.507 387.195Z" fill={props.color} />
        </Svg>
    );
}

export default SendIcon;