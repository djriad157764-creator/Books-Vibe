import BannerImage from "../../assets/pngwing.png";

const Banner = () => {
  return (
    <div className="mb-25">
      <div className="page-width gap-21  rounded-3xl lg:flex bg-[#131313]/5 justify-between items-center">
        <div className="lg:ml-30 text-center lg:text-start">
          <div className="">
            <h2 className="mb-12 font-bold text-3xl  sm:text-4xl  md:text-5xl xl:text-[56px] sm:leading-10 md:leading-15 lg:leading-18 xl:leading-20 bg-linear-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent">
              Books to freshen up <br /> your bookshelf
            </h2>
          </div>
          <div className="">
            <button className="btn bg-[#23BE0A] text-white font-bold text-xl rounded-lg p-7 ">
              View The List
            </button>
          </div>
        </div>
        <div className="lg:mr-30 my-21">
          <img className="mx-auto" src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
