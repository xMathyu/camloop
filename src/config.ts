export const getSignalingServerUrl = () => {
  if (process.env.NODE_ENV === "production") {
    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL || "https://camloop.onrender.com";
    // Replace the port in the URL with the signaling server port
    return appUrl.replace(
      /:\d+/,
      `:${process.env.NEXT_PUBLIC_SIGNALING_PORT || "3001"}`
    );
  }
  return "http://localhost:3001";
};
