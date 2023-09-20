import './App.css';
import {Scanner} from './lib/components/scanner';
import {useState} from "react";
import Camera, {FACING_MODES} from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

function App() {
    const [file, setFile] = useState(null);
    const [idealFacingMode, setIdealFacingMode] = useState(null);
    const [isMaxResolution, setIsMaxResolution] = useState(false);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        const base64File = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        });
        setFile(base64File);
        console.log(base64File);
    }

    function handleTakePhoto (dataUri) {
        setFile(dataUri);
    }

    return (
        <>
            <section style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4rem',
                padding: '4rem',
            }}>

                <div>
                    <button onClick={ (e) => {
                        setIdealFacingMode(FACING_MODES.USER);
                        setIsMaxResolution(false);
                    }}> FACING_MODES.USER </button>

                    <button onClick={ (e) => {
                        setIdealFacingMode(FACING_MODES.ENVIRONMENT);
                        setIsMaxResolution(true);
                    }}> FACING_MODES.ENVIRONMENT & MaxResolution</button>
                </div>

                <Camera
                    idealFacingMode = {idealFacingMode}
                    isMaxResolution = {isMaxResolution}
                    onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
                />

                <input type='file' onChange={handleUpload}/>

                <Scanner image={file}/>

            </section>
        </>
    );
}

export default App;
