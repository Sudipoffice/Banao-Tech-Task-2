// pages/Home.jsx
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Mic Test App</h1>
      <Button onClick={() => navigate("/mic-test")}>
        Start Mic Test
      </Button>
    </div>
  );
}