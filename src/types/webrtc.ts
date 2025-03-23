export interface RTCSessionDescriptionInit {
  type: RTCSdpType;
  sdp: string;
}

export interface RTCIceCandidateInit {
  candidate: string;
  sdpMid?: string | null;
  sdpMLineIndex?: number | null;
  usernameFragment?: string;
}

export interface Message {
  id: string;
  text: string;
  sender: "me" | "partner";
  timestamp: Date;
}
