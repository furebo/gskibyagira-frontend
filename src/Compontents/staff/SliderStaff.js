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
            let allStaffResponse = await fetch('http://localhost:5000/api/staffs/staffs', {
                method: 'GET'
            });

            let json = await allStaffResponse.json();
            setAllStaffMembers(json.data); // Update the state with the fetched data

            console.log("All active elements are", json.data);

        } catch (error) {
            console.error("Failed to fetch the staff members:", error);
        }
    };

    useEffect(() => {
        getAllStaff();
    }, []); // The empty dependency array ensures this runs once on mount

    const [sliderOptions, setSliderOptions] = useState({ 
        perPage: 3,
        autoplay: true,
        type: 'loop',
        interval:3000,
        focus: 'center',
        breakpoints: {
            768: {
                perPage: 1,
            }
        }   
    });

    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    const sliderRef = useRef(null);   

    return (
        <div data-aos="zoom-in" className="staffslider">
            <div className='admin'>
                <Typography.Title className='typography'>Administration staff of the school.</Typography.Title>
            </div>
            <Splide ref={sliderRef} aria-label="My Favorite Images" className='slider-container' options={sliderOptions}>
                {allStaffMembers.map((staff, index) => (
                    <SplideSlide key={staff.firstName}>
                        <div className='staffimage'>
                            <img className='img' src={staff.image_url} alt={`${staff.firstName} ${staff.lastName}`} />
                            <h4>{`${staff.firstName} ${staff.lastName}`}</h4>
                            <p>{staff.description}</p>
                        </div>
                    </SplideSlide>
                ))}
            </Splide>
        </div>
    );
}

export default SliderSt;
