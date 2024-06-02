import * as React from 'react';
import Svg, { Path, ClipPath, Rect, Defs, G } from 'react-native-svg';
function ArrowLeftIcon(props) {
    return (
        <Svg
            width={props.width}
            height={props.height}
            fill="none"
            viewBox="0 0 10 15"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <G ClipPath="url(#clip0_1_1295)">
                <Path d="M1.28249 1.91564C1.08536 1.71564 0.975842 1.45248 0.986794 1.1788C0.986794 0.905111 1.09631 0.652478 1.30439 0.452479C1.50153 0.263005 1.77532 0.147215 2.06007 0.147215C2.34481 0.147215 2.61861 0.241953 2.82669 0.431426L9.02539 6.38932C9.12395 6.48406 9.20061 6.59985 9.25537 6.72616C9.31013 6.85248 9.34299 6.98932 9.34299 7.12616C9.34299 7.26301 9.31013 7.39985 9.25537 7.53669C9.20061 7.66301 9.12395 7.7788 9.02539 7.87353L2.82669 13.8314C2.72812 13.9262 2.60765 14.0104 2.47623 14.063C2.33386 14.1156 2.19149 14.1472 2.04911 14.1472C1.90674 14.1472 1.75342 14.1262 1.62199 14.0735C1.49057 14.0209 1.3701 13.9367 1.26059 13.842C1.16202 13.7472 1.08536 13.6209 1.0306 13.4946C0.964889 13.3683 0.942986 13.2314 0.942986 13.0841C0.942986 12.9472 0.975841 12.8104 1.0306 12.6841C1.08536 12.5577 1.17297 12.442 1.28249 12.3367L6.70361 7.12616L5.67415 6.14722L1.28249 1.91564Z" fill="#181725" />
            </G>
            <Defs>
                <ClipPath id="clip0_1_1295">
                    <Rect width="8.4" height="14" fill="white" transform="translate(9.34299 14.1472) rotate(-180)" />
                </ClipPath>
            </Defs>
        </Svg>
    );
}

export default ArrowLeftIcon;