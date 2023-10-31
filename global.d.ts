declare global {
  interface Window {
    Telegram: {
      WebApp: {
        close: () => void;
      };
    };
  }
}
