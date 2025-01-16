import { redirect } from "next/navigation";
import "@/styles/main.scss";
import { cookies } from "next/headers";

export default async function Home() {
    const token: string | undefined = (await cookies()).get("azexport_token")?.value;

    if (!token?.length) {
        redirect("/login");
    } else {
        redirect("/home");
    }
}

