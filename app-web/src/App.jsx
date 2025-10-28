import './css/style.css'

function App() {

  return (
    <>
    <section className="flex flex-col-reverse">

      <section className="flex flex-col">

        <section className="flex">
        <h1 className="text-[#7CA982] text-lg font-bold">
            M2I Le five entre amis !
          </h1>
        </section>

        <section className="flex mt-10">
          <p className="text-[#7CA982] text-base font-semibold">Un ballon, <br /> des potes, <br />des émotions:<br /> rejoins le match !</p>
        </section>

        <section className="flex justify-center">

          <button 
          type="button"
          className="bg-linear-to-r from-[#7CA982] to-[#a4ebad] rounded-4xl mt-10 text-white p-4 w-7/12"
          >
            Rejoins-nous !
          </button>

        </section>

      </section>

        <section className="flex">

          <img 
          src="./src/img/landing-img.png" 
          alt="football is life" 
          className="mb-5 h-auto"
          />

        </section>
      
    </section>
    </>
  )
}

export default App
