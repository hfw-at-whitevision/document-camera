import Camera, {FACING_MODES} from 'react-html5-camera-photo';
import {useState} from "react";

export default function CameraUI({onTakePhoto}) {
    const [idealFacingMode, setIdealFacingMode] = useState(null);
    const [isMaxResolution, setIsMaxResolution] = useState(false);

    return <section style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1000,
    }}>
        <div style={{
            position: 'absolute',
            top: 4,
            left: 0,
            zIndex: 1001,
            gap: 4,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'center',
            width: '100%',
        }}>
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
            isFullscreen={true}
        />
    </section>
}
