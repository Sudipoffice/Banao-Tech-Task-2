import { useRef, useState } from "react";
import Button from "../components/Button";

export default function MicTest() {
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const requestMic = async () => {
    setLoading(true);
    setError(null);

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(mediaStream);
    } catch {
      setError("Microphone permission denied");
    } finally {
      setLoading(false);
    }
  };

  const startRecording = () => {
    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;
    chunksRef.current = [];

    recorder.ondataavailable = (e) => chunksRef.current.push(e.data);

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      setAudioURL(URL.createObjectURL(blob));
    };

    recorder.start();
    setRecording(true);

    setTimeout(() => {
      recorder.stop();
      setRecording(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h2 className="text-xl font-semibold">Microphone Test</h2>

      {!stream && (
        <Button onClick={requestMic} disabled={loading}>
          {loading ? "Checking mic..." : "Allow Microphone"}
        </Button>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {stream && (
        <>
          <p>Mic is working </p>

          <p className="italic">
            "Hello, this is a microphone test"
          </p>

          <Button onClick={startRecording} disabled={recording}>
            {recording ? "Recording..." : "Start Recording"}
          </Button>

          {audioURL && (
            <>
              <p>Audio captured successfully </p>
              <audio controls src={audioURL} />
            </>
          )}

          <Button onClick={() => window.location.reload()}>
            Retry Test
          </Button>
        </>
      )}
    </div>
  );
}
