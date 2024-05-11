import { useState, useEffect } from 'react';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight } from "react-icons/md";

const CheckoutSteps = ({ current = 0 }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    handleResize(); 
    window.addEventListener('resize', handleResize); 

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ul className="flex flex-col lg:flex-row w-full mt-4 items-center">
      {['User Login', 'Shipping Address', 'Payment Method', 'Place Order'].map(
        (step, index) => (
          <li key={step} className="flex items-center flex-col lg:flex-row">
            {index > 0 && (
              <div className="flex items-center">
                {isSmallScreen ? (
                  <MdOutlineKeyboardArrowDown className="h-6 w-6 mx-1 text-gray-500" />
                ) : (
                  <MdOutlineKeyboardArrowRight className="h-6 w-6 mx-1 text-gray-500" />
                )}
              </div>
            )}
            <div
              className={`flex-1 py-2 text-center rounded-full p-3 m-1 lg:m-3 ${
                index <= current ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {step}
            </div>
          </li>
        )
      )}
    </ul>
  );
};

export default CheckoutSteps;