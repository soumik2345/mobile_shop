import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
export default function RootLayout({ children }) {
  return (
    <main className="flex flex-col min-h-[100vh] max-h-[100%] ">
      <NavBar />
      <div className="container mx-auto mt-16">{children}</div>
      <Footer />
    </main>
  );
}
