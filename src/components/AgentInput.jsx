import React, { useState, useRef } from "react";
import { getToken } from "../utils/auth";

const formatAgentResponse = (rawText) => {
  if (!rawText) return "";

  // Replace escaped quotes and line breaks
  let formatted = rawText.replace(/\\"/g, '"').replace(/\\n/g, "\n");

  // Bold the numbered items (like 1. **Title**)
  formatted = formatted.replace(
    /(\d+\.\s)\*\*(.+?)\*\*/g,
    "<li><strong>$2</strong>"
  );

  // Replace standalone **...** with <strong>
  formatted = formatted.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Convert newlines into paragraphs
  formatted = formatted
    .split("\n")
    .map((p) => `<p>${p}</p>`)
    .join("");

  // Fix list items
  formatted = formatted
    .replace(/<p><li>/g, "<li>")
    .replace(/<\/li><\/p>/g, "</li>");

  return formatted;
};

const AgentInput = () => {
  const [textInput, setTextInput] = useState("");
  const [fileInput, setFileInput] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const audioFile = new File([audioBlob], "voice.wav", {
          type: "audio/wav",
        });
        setFileInput(audioFile);

        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);

        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      alert("Microphone access is required.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const token = getToken();

    const formData = new FormData();
    if (fileInput) {
      formData.append("file", fileInput);
    } else {
      formData.append("text", textInput);
    }

    try {
      const res = await fetch("http://localhost:8000/agent/process", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      setResponse(data);
      resetInput();
    } catch (err) {
      setResponse({ error: "Something went wrong." });
    }
    setLoading(false);
  };

  const resetInput = () => {
    setTextInput("");
    setFileInput(null);
    setAudioUrl(null);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 text-black dark:text-white p-6 max-w-xl mx-auto rounded-2xl shadow-xl mt-6">
      <h3 className="text-2xl font-semibold mb-4 text-center text-sky-600 dark:text-sky-400">
        💬 Chat with Dishcovery x SkyFlow
      </h3>

      <textarea
        rows="3"
        className="w-full p-3 border dark:border-zinc-700 rounded-lg bg-gray-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        placeholder="Type your query..."
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
      />

      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={startRecording}
          disabled={recording}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          🎙️ Record
        </button>

        <button
          onClick={stopRecording}
          disabled={!recording}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          ⏹️ Stop
        </button>

        {recording && (
          <span className="animate-pulse text-red-500 font-semibold">
            🔴 Recording...
          </span>
        )}
      </div>

      {audioUrl && (
        <div className="mb-4">
          <p className="font-medium">🔊 Audio Preview:</p>
          <audio controls src={audioUrl} className="mt-1 w-full" />
        </div>
      )}

      <div className="flex gap-4 mb-4">
        <button
          onClick={handleSubmit}
          disabled={loading || (!fileInput && !textInput)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Processing..." : "Submit"}
        </button>

        <button
          onClick={resetInput}
          className="bg-gray-300 dark:bg-zinc-700 hover:bg-gray-400 dark:hover:bg-zinc-600 text-black dark:text-white px-6 py-2 rounded"
        >
          Reset
        </button>
      </div>

      {response && (
        <div className="bg-gray-100 dark:bg-zinc-800 border dark:border-zinc-700 p-4 rounded-lg mt-6">
          <h4 className="font-bold text-lg text-sky-700 dark:text-sky-300 mb-2">
            🔍 Agent Response
          </h4>
          <div
            className="text-sm text-gray-800 dark:text-gray-200 space-y-2"
            dangerouslySetInnerHTML={{
              __html: formatAgentResponse(
                response.agent_response?.result ||
                  JSON.stringify(response, null, 2)
              ),
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AgentInput;
