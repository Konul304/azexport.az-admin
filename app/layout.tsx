import { ToastContainer } from "react-toastify";
import "../styles/_globals.scss";
import ProvidersWrapper from "./Providers";

export const metadata = {
  title: "Azexport",
  description: "CAzexportRM",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body >
        <ProvidersWrapper>
          {children}
        </ProvidersWrapper>
        <ToastContainer />
      </body>
    </html>
  );
}
