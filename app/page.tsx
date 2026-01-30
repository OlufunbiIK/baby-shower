import Registry from "./components/Registry";
import RSVPForm from "./components/RSVPForm";
import Footer from "./components/Footer";
import EventDetails from "./components/EventDetails";
import Hero from "./components/Hero";
import InvitationCard from "./components/InvitationCard";
import PrivacyNotice from "./components/PrivacyNotice";
import FloralBackground from "./components/FloralBackground";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Floral background for entire page */}
      <FloralBackground />
      
      {/* Content with relative positioning */}
      <div className="relative z-10">
        <Hero />
        <PrivacyNotice />
        <InvitationCard />
        <EventDetails />
        <RSVPForm />
        <Registry />
        <Footer />
      </div>
    </main>
  );
}