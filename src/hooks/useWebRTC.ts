import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { RTCSessionDescriptionInit, RTCIceCandidateInit } from "@/types/webrtc";

export const useWebRTC = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const socketRef = useRef<typeof Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [peerConnection, setPeerConnection] =
    useState<RTCPeerConnection | null>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3001", {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Connected to signaling server");
      setIsConnected(true);
      setConnectionError(null);
    });

    socket.on("connect_error", (error: Error) => {
      console.error("Connection error:", error);
      setConnectionError(
        `Failed to connect to signaling server: ${error.message}`
      );
      setIsConnected(false);
    });

    socket.on("disconnect", (reason: string) => {
      console.log("Disconnected from signaling server:", reason);
      setIsConnected(false);
    });

    socket.on("offer", async (offer: RTCSessionDescriptionInit) => {
      if (peerConnection) {
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(offer)
        );
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit("answer", answer);
      }
    });

    socket.on("answer", async (answer: RTCSessionDescriptionInit) => {
      if (peerConnection) {
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(answer)
        );
      }
    });

    socket.on("ice-candidate", async (candidate: RTCIceCandidateInit) => {
      if (peerConnection) {
        await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("disconnect");
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
    };
  }, [peerConnection]);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      setIsStreaming(true);
    } catch (error) {
      setConnectionError(
        `Failed to access camera and microphone: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const stopVideo = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = null;
      }
      setLocalStream(null);
      setIsStreaming(false);
    }
  };

  const findPartner = async () => {
    if (!localStream || !socketRef.current) return;

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    pc.onicecandidate = (event) => {
      if (event.candidate && socketRef.current) {
        socketRef.current.emit("ice-candidate", event.candidate);
      }
    };

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    setPeerConnection(pc);

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socketRef.current.emit("offer", offer);
  };

  return {
    localVideoRef,
    remoteVideoRef,
    isConnected,
    isStreaming,
    connectionError,
    startVideo,
    stopVideo,
    findPartner,
  };
};
