import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';

const Pricing = () => {
  const { id } = useParams();
  const [pricingData, setPricingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getplansfortrainer/${id}`);
        const data = Array.isArray(response.data) ? response.data : [response.data];
        setPricingData(data);
      } catch (error) {
        console.error('Error fetching pricing data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleBuyNow = (item) => {
    const queryParams = queryString.stringify({ name: item.name, price: item.price });
    window.location.href = `/payment?${queryParams}`;
  };

  return (
    <div>
      <>
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n@import url(https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css);\n"
          }}
        />
        <div className="min-w-screen min-h-screen bg-gray-200 px-5 py-5">
          <div className="w-full mx-auto bg-grey-100  px-5 py-10 text-gray-600 mb-10">
            <div className="text-center max-w-xl mx-auto">
              <h1 className="text-gray-800 text-6xl mb-6 font-bold item-center justify-center text-center">Pricing</h1>
              <h3 className="text-xl font-medium mb-10 text-gray-800">
                Lorem ipsum dolor sit amet consectetur adipisicing elit repellat
                dignissimos laboriosam odit accusamus porro
              </h3>
            </div>
            <div className="max-w-4xl mx-auto md:flex">
              {pricingData.slice(0, 3).map((item, index) => (
                <div key={index} className="w-full md:w-1/3 md:max-w-none bg-white px-8 md:px-10 py-8 md:py-10 mb-3 mx-auto md:my-6 rounded-md shadow-lg shadow-gray-600 md:flex md:flex-col">
                  <div className="w-full flex-grow">
                    <h2 className="text-center font-bold uppercase mb-4 text-gray-800">{item.name}</h2>
                    <h3 className="text-center font-bold text-4xl mb-5 text-gray-800">{item.price}</h3>
                    <p className="text-sm px-5 mb-8">{item.description}</p>
                  </div>
                  <div className="w-full">
                    <button onClick={() => handleBuyNow(item)} className="font-bold bg-gray-800 text-white rounded-3xl mt-4 hover:bg-[#89B9AD]  px-10 py-2 transition-colors w-full">
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Pricing;
