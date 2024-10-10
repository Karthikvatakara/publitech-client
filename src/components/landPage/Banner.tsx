import {useCallback} from 'react';
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
    <div className="relative bg-darkBlue">
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
        className='particles' />
      <div className='lg:grid lg:grid-cols-2 flex flex-col-reverse'>
        <div className='col-span-1 relative'>
          <div className='absolute'>
            <img src={fourthGrid} alt="Grid" className='mt-2 filter grayscale blur-2xl contrast-200' />
          </div>
          <div className='flex flex-col mt-36 gap-2 ms-24'>
            <h1 className='text-white font-semibold text-xl'>Learn without Limits</h1>
            <h1 className='text-white font-bold text-6xl'>crack your Goal </h1>
            <h1 className='text-white font-bold text-6xl'>with india's top</h1>
            <h1 className='text-white font-bold text-6xl'>educators</h1>
          </div>
        </div>
        <div className='col-span-1 relative'>
          <img src={fourthGrid} alt="Grid" className='absolute mt-[280px] filter grayscale blur-2xl contrast-200' />
          <img src={LandPageStudent} alt="Student" className='w-[550px]' />
        </div>
      </div>
    </div>
  );
}

export default Banner;
