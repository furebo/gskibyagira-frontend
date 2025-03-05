import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import './SliderStaff.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useRef, useState } from 'react';
import { Typography } from 'antd';

function SliderSt() {
    const [allStaffMembers, setAllStaffMembers] = useState([]);

    // Function to fetch all staff members
    const getAllStaff = async () => {
        try {
            const response = await fetch('https://gskibyagira-backend.onrender.com/api/staffs/staffs');
            const json = await response.json();

            if (json && Array.isArray(json.data)) {
                setAllStaffMembers(json.data);
                console.log("All active elements are", json.data);
            } else {
                console.warn("Unexpected API response:", json);
                setAllStaffMembers([]); // Ensure it's always an array
            }
        } catch (error) {
            console.error("Failed to fetch the staff members:", error);
            setAllStaffMembers([]); // Prevent undefined issues
        }
    };

    useEffect(() => {
        getAllStaff();
    }, []);

    const sliderOptions = {
        perPage: 3,
        autoplay: true,
        type: 'loop',
        interval: 3000,
        focus: 'center',
        breakpoints: {
            768: {
                perPage: 1,
            }
        }
    };

    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    const sliderRef = useRef(null);

    return (
        <div data-aos="zoom-in" className="staffslider">
            <div className='admin'>
                <Typography.Title className='typography1'>Administration staff of the school.</Typography.Title>
            </div>

            {/* Render slider only if there are staff members */}
            {allStaffMembers.length > 0 ? (
                <Splide ref={sliderRef} aria-label="Staff Members" className='slider-container' options={sliderOptions}>
                    {allStaffMembers.map((staff, index) => (
                        <SplideSlide key={index}>
                            <div className='staffimage'>
                                <img 
                                    className='img' 
                                    src={staff.image_url || 'default-image.png'} 
                                    alt={`${staff.firstName || 'Unknown'} ${staff.lastName || ''}`} 
                                    onError={(e) => e.target.src = 'default-image.png'} // Fallback for broken images
                                />
                                <h4>{`${staff.firstName || 'Unknown'} ${staff.lastName || ''}`}</h4>
                                <p>{staff.description || 'No description available.'}</p>
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>
            ) : (
                <p className="no-staff-message">No staff members available.</p>
            )}
        </div>
    );
}

export default SliderSt;

