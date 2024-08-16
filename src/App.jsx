import { useEffect, useState } from "react";


function App() {
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    let vantaScriptLoaded = false;

    const loadScripts = () => {
        // Check if Three.js is already loaded
        if (!window.THREE) {
            const threeScript = document.createElement('script');
            threeScript.src =
                'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
            threeScript.async = true;
            document.body.appendChild(threeScript);
            threeScript.onload = () => {
                vantaScriptLoaded = true;
                loadVantaScript();
            };
        } else {
            // If Three.js is already loaded, load Vanta directly
            loadVantaScript();
        }
    };

    const loadVantaScript = () => {
        if (!window.VANTA) {
            const vantaScript = document.createElement('script');
            vantaScript.src =
                'https://unpkg.com/vanta/dist/vanta.birds.min.js';
            vantaScript.async = true;
            document.body.appendChild(vantaScript);

            vantaScript.onload = () => {
                initializeVantaEffect();
            };
        } else {
            // Vanta is already loaded, initialize effect
            initializeVantaEffect();
        }
    };

    const initializeVantaEffect = () => {
        if (vantaEffect) {
            vantaEffect.destroy(); // Cleanup existing effect if present
        }

        const config = {
          el: '#vanta-bg',
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
      };

        const effect = window.VANTA.BIRDS(config);
        setVantaEffect(effect);
    };

    loadScripts();

    return () => {
        if (vantaEffect) vantaEffect.destroy(); // Cleanup Vanta effect
    };
  }, []);

  return (
    <div className="flex flex-col items-center h-screen p-10" id="vanta-bg">
      <div className=" flex-initial">

      </div>
      <div className=" flex-1 flex justify-center items-center">
        <div className=" bg-pink-300 text-2xl rounded-lg shadow-2xl p-4 text-slate-900 font-bold">
        MICHAEL IS A GAY BOY
        </div>
      </div>
      <div className="flex-2 text-3xl">
        🏳️‍🌈
      </div>
    </div>
  );
}

export default App;
