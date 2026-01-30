import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-muted"></main>
      <Footer />
    </>
  );
}
