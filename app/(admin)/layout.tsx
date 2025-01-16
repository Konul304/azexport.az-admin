import "@/styles/_globals.scss";
import "@/styles/main.scss";
import Sidebar from "./(components)/Sidebar";
import Navbar from "./(components)/Navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const protectLayout = async () => {
    const token: any = (await cookies()).get("azexport_token")?.value;
    if (!token?.length) {
        redirect("/login");
    }
};

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    await protectLayout();
    return (
        <>
            <html lang="en">
                <body>
                    <div className="main_container">
                        <Sidebar />
                        <div className="navbar_and_body">
                            <Navbar roleProp="Admin" logoProp={false} />
                            <div className="body_container">{children}</div>
                        </div>
                    </div>
                </body>
            </html >
        </>
    );
}
