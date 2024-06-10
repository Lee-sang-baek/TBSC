import Slider from "react-slick";
import ContentsViewer from "../../pages/mypage/functionPage/Viewer";
import "./MainBanner.css";

const MainBanner = ({ settings, modifiedImageList }) => {
    return (
        <div className="slider-container">
            <Slider {...settings} className="autoplay">
                {modifiedImageList && modifiedImageList.map((item, index) => (
                    <div key={index} className='image-box'>
                        <img src={`/uploads/${item.image}`} alt={item.title} />
                        <div className='content-box'>
                            <ContentsViewer contents={item.content} />    
                        </div>
                    </div>
                ))}
                {(!modifiedImageList || modifiedImageList.length < 1) &&
                    <div className='image-box'>
                        <div className='content-box'>. . .</div>
                    </div>
                }
                {(!modifiedImageList || modifiedImageList.length < 1) &&
                    <div className='image-box'>
                        <div className='content-box'>. . .</div>
                    </div>
                }
            </Slider>
        </div>
    );
}

export default MainBanner;