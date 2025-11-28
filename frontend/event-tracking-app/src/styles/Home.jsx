import { Link } from "react-router-dom";
import App from "../App"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* NAVBAR */}
      <nav className="w-full bg-white shadow-sm py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">EventMaster</h1>

        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li><Link to="/" className="hover:text-indigo-600">Home</Link></li>
          <li><Link to="/events" className="hover:text-indigo-600">Events</Link></li>
          <li><Link to="/contact" className="hover:text-indigo-600">Contact</Link></li>
        </ul>

        <div className="space-x-4">
          <Link to="/login">
            <button className="px-5 py-2 rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-100">
              Sign In
            </button>
          </Link>

          <Link to="/register">
            <button className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="flex flex-col lg:flex-row flex-1 items-center justify-center px-8 mt-10">
        <div className="max-w-xl text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
            Manage Your Events Effortlessly
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            Create events, manage attendees, sell tickets, and automate your entire event workflow — all in one platform.
          </p>

          <div className="mt-6 space-x-4">
            <Link to="/register">
              <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700">
                Get Started
              </button>
            </Link>

            <Link to="/events">
              <button className="px-6 py-3 bg-gray-200 font-semibold rounded-lg hover:bg-gray-300">
                Explore Events
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-10 lg:mt-0">
          <img 
            src="https://cdn3d.iconscout.com/3d/premium/thumb/event-management-3d-icon-download-in-png-blend-fbx-gltf-file-formats--timeline-calendar-schedule-planning-pack-icons-8237598.png"
            alt="Event"
            className="w-80 md:w-[420px]"
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-gray-600 text-sm bg-white mt-10 border-t">
        © {new Date().getFullYear()} EventMaster | All Rights Reserved
      </footer>
      <App/>
    </div>
  );
}
