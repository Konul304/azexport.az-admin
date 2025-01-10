import { redirect } from "next/navigation";
import "@/styles/main.scss";

export default function Home() {
 redirect('/login');
}
