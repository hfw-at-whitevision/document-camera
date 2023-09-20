import {useEffect, useRef, useState} from 'react';
import './scanner.css';

// const images = [{ src: '/paper-high.png' }, { src: '/paper-2.png' }];

export const Scanner = ({image}) => {
    const containerRef = useRef(null);
    const openCvURL = 'https://docs.opencv.org/4.7.0/opencv.js';

    const [loadedOpenCV, setLoadedOpenCV] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line no-undef
        const scanner = new jscanify();
        loadOpenCv(() => {
            if (image) {
                containerRef.current.innerHTML = '';
                const newImg = document.createElement('img');
                newImg.src = image;

                newImg.onload = function () {
                    const resultCanvas = scanner.extractPaper(newImg, 3860, 5000);
                    containerRef.current.append(resultCanvas);

                    // const highlightedCanvas = scanner.highlightPaper(newImg);
                    // containerRef.current.append(highlightedCanvas);
                };
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image]);

    const loadOpenCv = (onComplete) => {
        const isScriptPresent = !!document.getElementById('open-cv');
        if (isScriptPresent || loadedOpenCV) {
            setLoadedOpenCV(true);
            onComplete();
        } else {
            const script = document.createElement('script');
            script.id = 'open-cv';
            script.src = openCvURL;

            script.onload = function () {
                setTimeout(function () {
                    onComplete();
                }, 1000);
                setLoadedOpenCV(true);
            };
            document.body.appendChild(script);
        }
    };

    return (
        <>
            <div className="scanner-container">
                <div>
                    {!loadedOpenCV && (
                        <div>
                            <h2>Loading OpenCV...</h2>
                        </div>
                    )}
                    {image
                        ? <img
                            className={'selected'}
                            src={image}
                            width={150}
                        />
                        : null
                    }
                </div>
                <div ref={containerRef} id="result-container"></div>
            </div>
        </>
    );
};
