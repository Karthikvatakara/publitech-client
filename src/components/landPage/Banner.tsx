import { useCallback } from 'react';
import fourthGrid from "../../assets/grids/fourth.png";
import LandPageStudent from "../../assets/landPagestudent.png";
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'

type TODO = any

function Banner() {
  const particlesInit = useCallback(async (engine: TODO) => {
    console.log(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: TODO | undefined) => {
    return new Promise<void>((resolve) => {
      console.log(container);
      resolve(container);
    });
  }, []);

  return (
    <div className="relative bg-darkBlue min-h-screen">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: ""
            },
          },
          fpsLimit: 960,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 1,
              },
              repulse: {
                distance: 5,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#197195",
            },
            links: {
              color: "#197195",
              distance: 150,
              enable: true,
              opacity: 0.7,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 4,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 30,
            },
            opacity: {
              value: 1,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
        className='absolute inset-0' />
      <div className='container mx-auto px-4 py-8 lg:py-16'>
        <div className='flex flex-col-reverse lg:flex-row items-center justify-between'>
          <div className='w-1/2 lg:w-1/2 relative '>
            <div className='absolute inset-0'>
              <img src={fourthGrid} alt="Grid" className='md:max-w-2xl h-w-2xl object-cover filter grayscale blur-3xl contrast-300' />
            </div>
            <div className='md:ps-10 relative z-20 text-center lg:text-left'>
              <h2 className='text-white font-semibold text-xl mb-2'>Learn without Limits</h2>
              <h1 className='text-white font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight'>
                crack your Goal <br />
                with india's top <br />
                educators
              </h1>
            </div>
          </div>
          <div className='w-full lg:w-1/2 relative'>
            <img src={fourthGrid} alt="Grid" className='absolute inset-0 w-full h-full object-cover filter grayscale blur-2xl contrast-200' />
            {/* <img src={LandPageStudent} alt="Student" className='relative z-10 w-full max-w-md mx-auto' /> */}
            <img src={LandPageStudent} alt="Student" className='relative z-10 md:max-w-lg lg:max-w-xl mx-auto' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;