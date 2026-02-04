import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    profile: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_1ohoteb",
        "template_4mcpzuk",
        form.current,
        "WLNkt1FRGG3I0k5Mw"
      )
      .then(
        () => {
          setIsSubmitted(true);
          setIsFlipped(true);

          // Réinitialiser après 8 secondes
          setTimeout(() => {
            setIsFlipped(false);
            setIsSubmitted(false);
            setFormData({ profile: "", subject: "", message: "" });
          }, 8000);
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div className="flex justify-center items-center bg-[#5E856B] min-h-screen w-full px-4 py-6 sm:px-6 lg:px-8">
      <div
        className={`relative w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        } min-h-[500px] md:min-h-[calc(100vh-3rem)]`}
      >
        {/* Face avant : formulaire */}
        <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 backface-hidden flex flex-col justify-center">
          <h1 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#5E856B] mb-5">
            Contactez-nous
          </h1>

          <form ref={form} onSubmit={sendEmail} className="space-y-5 sm:space-y-6">
            {/* Profil */}
            <div>
              <label className="block mb-2 font-semibold text-gray-900 text-sm sm:text-base md:text-lg">
                Sélectionnez votre profil :
              </label>
              <select
                name="user_profile"
                required
                value={formData.profile}
                onChange={(e) =>
                  setFormData({ ...formData, profile: e.target.value })
                }
                className="w-full p-3 sm:p-4 text-sm sm:text-base rounded-md bg-white placeholder:text-[#aaa] shadow-md border border-[#6b9773] focus:border-[#6b9773] focus:outline-none"
              >
                <option value="">Choisissez un profil...</option>
                <option value="admin">Admin</option>
                <option value="partenaire">Partenaire</option>
                <option value="fournisseur">Fournisseur</option>
              </select>
            </div>

            {/* Sujet */}
            <div>
              <label className="block mb-2 font-semibold text-gray-900 text-sm sm:text-base md:text-lg">
                Sujet :
              </label>
              <input
                type="text"
                name="user_subject"
                required
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full p-3 sm:p-4 text-sm sm:text-base rounded-md bg-white placeholder:text-[#aaa] shadow-md border border-[#6b9773] focus:border-[#6b9773] focus:outline-none"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block mb-2 font-semibold text-gray-900 text-sm sm:text-base md:text-lg">
                Message :
              </label>
              <textarea
                name="message"
                rows="6"
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full p-3 sm:p-4 text-sm sm:text-base rounded-md bg-white placeholder:text-[#aaa] shadow-md border border-[#6b9773] focus:border-[#6b9773] focus:outline-none resize-y"
              />
            </div>

            {/* Bouton envoyer */}
            <button
              type="submit"
              className="w-full bg-[#8BB78F] hover:bg-[#6b9773] text-white font-semibold p-3 sm:p-4 rounded-md shadow-md text-sm sm:text-base transition-colors duration-300"
            >
              Envoyer
            </button>
          </form>
        </div>

        {/* Face arrière : message de succès */}
        <div className="absolute inset-0 bg-[#7CA982] rounded-3xl shadow-2xl text-white flex flex-col items-center justify-center text-center rotate-y-180 backface-hidden p-6 sm:p-8 md:p-10">
          <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold mb-3">
            Message envoyé avec succès
          </h2>
          <p className="text-base sm:text-lg md:text-lg opacity-90">
            Merci pour votre message ! Nous vous répondrons bientôt.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
