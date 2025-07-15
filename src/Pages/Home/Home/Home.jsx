import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useDarkMode } from "../../../Contexts/DarkModeContext";
import AboutUs from "../AboutUs/Aboutus";

const Home = () => {
  const [showText, setShowText] = useState(true);
  const { isDarkMode } = useDarkMode();
  const center = [23.8222, 90.3646];
  const zoom = 15;
  const maxBounds = [
    [23.8215, 90.3639],
    [23.8229, 90.3653],
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 200,
      once: true,
    });

    const timer = setTimeout(() => {
      setShowText(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleMapClick = () => {
    // Open Google Maps link in a new tab to show the full map
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${center[0]},${center[1]}`,
      "_blank"
    );
  };

  return (
    <div className={`relative mt-12 px-16 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="relative w-full h-screen overflow-hidden">
        <video
          className="absolute inset-0 rounded-2xl w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source src="/banner.mp4" type="video/mp4" />
        </video>
      </div>

      {showText && (
        <div className={`absolute inset-0 flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-900'} bg-opacity-50`}>
          <div className={`text-center p-8 rounded-lg ${isDarkMode ? 'text-white' : 'text-white'}`}>
            <div
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="500"
            >
              <h1 className="text-6xl font-bold text-[#7AB2B2]">
                Welcome to Comfort Inn
              </h1>
              <p className="text-2xl mt-4">
                Book your stay now and enjoy luxury accommodation.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Map Component */}

      <div className="mt-12 flex flex-col lg:flex-row lg:h-screen">
        {/* Left Side */}
        <div
          className="w-full lg:w-1/2 h-64 lg:h-full flex justify-center items-center bg-cover lg:rounded-l-2xl"
          style={{ backgroundImage: 'url("/img/map.jpg")' }}
        >
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-700'} bg-opacity-80 text-white p-6 lg:p-8 lg:rounded-l-2xl mx-4 lg:mx-0 rounded-lg lg:rounded-none`}>
            <h1 className="text-2xl lg:text-4xl font-semibold mb-4">
              Find our Live Location
            </h1>
            <p className="text-sm lg:text-lg">
              Explore the area around Kajipara, Mirpur 10, Dhaka, Bangladesh.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 h-64 lg:h-full">
          <div className="w-full h-full lg:mt-6 p-4 lg:p-0">
            <div
              className="w-full h-full rounded-2xl flex"
              style={{ width: "100%" }}
            >
              <MapContainer
                center={center}
                zoom={zoom}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
                maxBounds={maxBounds}
                onClick={handleMapClick}
                className="rounded-2xl"
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={center}>
                  <Popup>Kajipara, Mirpur 10, Dhaka, Bangladesh</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>


      <div id="about" className="mt-12">
        <AboutUs />
      </div>

      
    </div>
  );
};

export default Home;
