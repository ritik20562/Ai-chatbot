import Chat from "./pages/Chat";

export default function App() {
  console.log(import.meta.env.VITE_OPENROUTER_API_KEY);
  return <Chat />;
}