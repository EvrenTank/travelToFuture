import Lottie from 'react-lottie-segments';
import myAnimationData from '../../public/lottiefileAnimation/loadingAnimation.json';

const LoadingAnimation = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: myAnimationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
    };
    return (
        <Lottie 
        options ={defaultOptions}
        speed={4} >

        </Lottie>
    );
}

export default LoadingAnimation;