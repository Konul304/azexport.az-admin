"use client";
import "@/styles/_globals.scss";
import "@/styles/main.scss";
import Sidebar from "./(components)/Sidebar";
import Navbar from "./(components)/Navbar";
import { usePathname } from "next/navigation";
import LoginPage from "./(auth)/login/page";
import ProvidersWrapper from "./Providers";

// export const metadata = {
//   title: "Azexport.az",
//   description: "Azexport.az",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();

  return (
    <>
      <html lang="en">
        <body>
          <ProvidersWrapper>
            {pathname === '/login' ? (
              <div>
                <LoginPage />
              </div>
            ) : (
              <div className="main_container">
                <Sidebar />
                <div className="navbar_and_body">
                  <Navbar roleProp="Admin" logoProp={false} />
                  <div className="body_container">{children}</div>
                </div></div>
            )}
          </ProvidersWrapper>
        </body>
      </html >
    </>
  );
}
