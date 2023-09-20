import './App.css';
import {Scanner} from './components/scanner';
import {useState} from "react";
import {Camera} from "@capacitor/camera";

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
    }

    const handleOpenCamera = async (e) => {
        e.preventDefault();

        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: 'dataUrl',
            width: 2048,
            height: 2048,
            presentationStyle: 'fullscreen',
            correctOrientation: true,
        });
        setFile(image.dataUrl);
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

                <button type='button' onClick={handleOpenCamera}>Open Camera</button>

                <input type='file' onChange={handleUpload}/>

                <Scanner image={file}/>

            </section>
        </>
    );
}

export default App;
