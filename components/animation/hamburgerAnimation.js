import Lottie from 'react-lottie-segments';
import myAnimationData from '../../public/lottiefileAnimation/hamburgerAnimation.json';
import { useState } from 'react';

const HamburgerAnimation = ({width,height,isClicked,setIsClicked}) => {

    //const[isClicked,setIsClicked] = useState(false);
    const defaultOptions = {
        loop: false,
        autoplay: false,
        animationData: myAnimationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
    };
    const lastFrame = !isClicked ? 1 : 90;

    const sequence = {
        segments: [0, lastFrame],
        forceFlag: true
    }

    /*const startPoint = {
        value: isClicked ? 0 : lastFrame ,
        isFrame: true
        //Burayı goToAndStop için yapmıştım ama daha sonra gerek kalmadı. Böyle bir özelliğin
        // olduğunu hatırlayabilmek için de silmedim.
    };*/


    return (
        <div onClick={()=>{setIsClicked(isClicked=>!isClicked);
        console.log("isClicked"+isClicked)}}>
        <Lottie 
        width={width}
        height={height}
        options ={defaultOptions}
        speed={2} 
        playSegments = {sequence}
        isStopped = {!isClicked}
        >
        </Lottie>
        </div>
    );
}

export default HamburgerAnimation;