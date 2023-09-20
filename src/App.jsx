import './App.css';
import {Scanner} from './components/scanner';
import {useState} from "react";
import 'react-html5-camera-photo/build/css/index.css';
import CameraUI from "./components/Camera";

function App() {
    const [file, setFile] = useState(null);

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

    function handleTakePhoto(dataUri) {
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
                <CameraUI
                    onTakePhoto={handleTakePhoto}
                />

                <input type='file' onChange={handleUpload}/>

                <Scanner image={file}/>

            </section>
        </>
    );
}

export default App;
