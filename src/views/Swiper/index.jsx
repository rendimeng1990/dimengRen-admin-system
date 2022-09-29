import React, { useEffect } from 'react'
import Swiper, { Navigation, Pagination } from 'swiper'
import '../../../node_modules/swiper/swiper-bundle.min.css'

import Background1 from './Queen.jpeg'
import Background2 from './war.jpeg'
import Background3 from './NZ.jpeg'
import { textAlign } from '@mui/system'



Swiper.use([Navigation, Pagination]);
export default function Carousel() {


    useEffect(() => {
        new Swiper(".swiper", {
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        })
    })

    return (
        <div>
            <div className="swiper" style={{ height: "480px", width: "600px" }}>
                <div className="swiper-wrapper">
                    <div className="swiper-slide" >
                        <h2 >Queen Elizabeth II has died</h2>
                        <img src={Background1} alt="" style={{ width: "100%", height: "100%" }} />
                    </div>
                    <div className="swiper-slide">
                        <h2 >Conflict in Ukraine</h2>
                        <img src={Background2} alt="" style={{ width: "100%", height: "100%" }} />
                    </div>
                    <div className="swiper-slide">
                        <h2 >5.8-magnitude earthquake rocks New Zealand</h2>
                        <img src={Background3} alt="" style={{ width: "100%", height: "100%" }} />
                    </div>
                </div>
                {/* <!-- 如果需要分页器 --> */}
                <div className="swiper-pagination"></div>

                {/* <!-- 如果需要导航按钮 --> */}
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>

            </div>
        </div>
    )
}

