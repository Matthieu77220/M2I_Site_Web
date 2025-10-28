import './css/style.css'
import { useNavigate } from 'react-router';

function Home() {
    
    const navigate = useNavigate()

  return (
    <>
    <section className="
        flex flex-col-reverse
        
        md:flex md:flex-row
        ">

      <section className="
      flex flex-col
      md:w-[50vw] md:mt-[25vh]
      ">
        
        <section className="flex justify-center text-center">
        <h1 className="
        font-spartan font-semibold text-2xl text-[#7CA982]
        md:text-5xl
        lg:text-6xl
        xl:text-7xl
        ">
            M2I Le five entre amis !
          </h1>
        </section>

        <section className="flex mt-10 justify-center text-center">
          <p className="
          text-[#7CA982] text-lg font-roboto
          md:text-4xl
          lg:text-5xl
          xl:text-6xl
          ">
            Un ballon, <br /> des potes, <br />des émotions:<br /> rejoins le match !</p>
        </section>

        <section className="flex justify-center">

          <button 
          type="button"
          className="
          bg-linear-to-r from-[#7CA982] to-[#a4ebad] mt-10 rounded-full text-white p-4 w-7/12 duration-300 ease-in
          lg:p-5
          xl:p-6
          hover:opacity-80 hover:cursor-pointer hover:w-8/12 hover:bg-linear-to-r hover:from-[#a4ebad] hover:to-[#7CA982] hover:duration-300
          "
          onClick={() => navigate('/formulaireinscription')}
          >
            <p className="text-white" id="btn-Home-Inscription">
                Rejoins-nous !
            </p>
          </button>

        </section>

      </section>

        <section className="flex">

          <img 
          src="./src/img/landing-img.png" 
          alt="football is life" 
          className="
          mb-5 object-cover w-full h-[66vh]
          md:object-cover md:w-[50vw] md:h-screen md:mb-0 md:right-full
          "
          />

        </section>
      
    </section>
    </>
  )
}

export default Home;