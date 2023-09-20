import Camera, {FACING_MODES} from 'react-html5-camera-photo';
import {useState} from "react";

export default function CameraUI({onTakePhoto}) {
    const [idealFacingMode, setIdealFacingMode] = useState(null);
    const [isMaxResolution, setIsMaxResolution] = useState(false);

    return <>
        <div>
            <button onClick={(e) => {
                setIdealFacingMode(FACING_MODES.USER);
                setIsMaxResolution(false);
            }}> Voorkant
            </button>

            <button onClick={(e) => {
                setIdealFacingMode(FACING_MODES.ENVIRONMENT);
                setIsMaxResolution(true);
            }}> Achterkant
            </button>
        </div>

        <Camera
            idealFacingMode={idealFacingMode}
            isMaxResolution={isMaxResolution}
            onTakePhoto={onTakePhoto}
        />
    </>
}
