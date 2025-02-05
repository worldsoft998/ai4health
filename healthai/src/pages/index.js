import Navbar from "@/components/navabar";
import Typewriter from "typewriter-effect";
import { parseCookies } from "nookies";

export default function Home({ username }) {
  
  const cards = [
    {
      title: "Complete Health History",
      description: "Get tailored advice just for you.",
      link: "/medicaldata/activecomplaint",
    },
    {
      title: "Chat with AI Doctor",
      description: "Talk to your AI doctor anytime.",
      link: "/chatbot",
    },
    { 
      title: "General AI",
       description: "Explore general health tips." ,
       link: "/",

    },
    {
      title: "Follow-Up Consultations",
      description: "Schedule follow-ups with ease.",
      link: "/",
    },
  ];

  return (
    <div className="h-screen w-screen relative text-white font-sans">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `
      radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(0, 0, 0, 0.9) 100%),
      url('landing_page.jpg')
    `,
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <div>
          <Navbar />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-950">
          Hi {username}, I am your AI Doctor.
          <br />{" "}
          <span className="text-[#EFE3C2] text-4xl">
            <Typewriter
              options={{
                strings: [
                  "Transforming healthcare with AI.",
                  "Your virtual doctor, always ready.",
                  "Empowering healthcare with intelligence.",
                  "AI-driven diagnostics for better care.",
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 20,
                delay: 50,
              }}
            />
          </span>
        </h1>
        <div className="absolute inset-x-0 bottom-12 flex justify-center px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 pt-16">
            {cards.map((card, index) => (
              
              <div
                key={index}
                className="bg-green-200 rounded-lg shadow-lg p-6 text-center hover:bg-cyan-100 transition"
              >
                <a href={card.link}>
                <h2 className="text-xl font-semibold text-gray-800">
                  {card.title}
                </h2>
                <p className="text-gray-600 mt-2">{card.description}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  const username = cookies.username || "Guest";
  return {
    props: { username },
  };
}
