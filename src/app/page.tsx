import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { WorkList } from "@/components/home/WorkList";
import { EnquiryFlow } from "@/components/home/EnquiryFlow";
import { Process } from "@/components/home/Process";
import { About } from "@/components/home/About";
import { Faq } from "@/components/home/Faq";
import { Contact } from "@/components/home/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <WorkList />
      <EnquiryFlow />
      <Process />
      <About />
      <Faq />
      <Contact />
    </>
  );
}
