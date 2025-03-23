"use client";

import dynamic from "next/dynamic";

const VideoChat = dynamic(() => import("@/components/VideoChat/VideoChat"), {
  ssr: false,
});

export const ClientVideoChat = () => {
  return <VideoChat />;
};
