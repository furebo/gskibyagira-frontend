import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import './SliderStaff.css'
function SliderSt(){
    return(
        <div>
            <div className='admin'>
            <h2>Administration Staff Members Of The School.</h2>
            </div>
            <Splide aria-label="My Favorite Images" className='slider-container' options={{ 
                //fixedWidth:'800px',
                perPage:3,
                autoplay:true,
                type:'loop',
                focus:'center'
            }}>
                <SplideSlide>
                    <div className='staffimage'>
                        <img className='img' src="https://res.cloudinary.com/dazayujls/image/upload/v1702648620/WhatsApp_Image_2023-12-15_at_2.19.43_PM_t6ht4p.jpg" alt="Image 1"/>
                        <h4>Rev. Directeur UZABAKIRIHO Edourd</h4>
                        <p>The director of GS KIBYAGIRA school and the Reverand pastor of KIBYAGIRA parish in Kigeme dioscese.  
                        </p>
                    </div>
                    
                </SplideSlide>
                <SplideSlide>
                <div className='staffimage'>
                    <img className='img' src="https://res.cloudinary.com/dazayujls/image/upload/v1702648616/WhatsApp_Image_2023-12-15_at_2.19.41_PM_1_na3oho.jpg" alt="Image 2"/>
                    <h4>DOS. Mr NTAWIGIRA Dominique</h4>
                    <p>The Dean of Studies at GS KIBYAGIRA school in charge of studies, teaching and learning activities coordinations.  
                    </p>
                </div>
                </SplideSlide>
                <SplideSlide>
                <div className='staffimage'>
                    <img className='img' src="https://res.cloudinary.com/dazayujls/image/upload/v1702648617/WhatsApp_Image_2023-12-15_at_2.19.41_PM_tghr09.jpg"/>
                    <h4>Burser. KANYAMIBYUKO Pascar</h4>
                    <p>The Burser at GS KIBYAGIRA school in charge of school economy and assets Management.   
                    </p>
                </div>
                </SplideSlide>
                <SplideSlide>
                <div className='staffimage'>
                    <img className='img' src="https://res.cloudinary.com/dazayujls/image/upload/v1703080420/DOD_lkn8ja.jpg"/>
                    <h4>DOD. Mr. DUSABIMANA Joseph</h4>
                    <p>The Dean in Charge of students Displine at GS KIBYAGIRA school.  
                    </p>
                </div>
                </SplideSlide>
                <SplideSlide>
                <div className='staffimage'>
                    <img className='img' src="https://res.cloudinary.com/dazayujls/image/upload/v1703754316/secretaire_dk0rte.jpg"/>
                    <h4>Secretary. Mr. KAREMERA Evariste</h4>
                    <p>In charge of Secretariate and office tasks management at GS KIBYAGIRA School. 
                    </p>
                </div>
                </SplideSlide>
                <SplideSlide>
                <div className='staffimage'>
                <img className='img' src="https://res.cloudinary.com/dazayujls/image/upload/v1618817629/immlhzwnc59yhakrrczo.jpg"/>
                    <h4>Computer Lab Attendant. Mr. FUREBO Didace</h4>
                    <p>In charge of Computer Labs Attendance at GS KIBYAGIRA school.  
                    </p>
                </div>
                </SplideSlide>
            </Splide>
        </div>
    )
}
export default SliderSt

//NusqTVWkaomXB22g
//mongodb+srv://furebodidace582:NusqTVWkaomXB22g@cluster0.zze8i8c.mongodb.net/