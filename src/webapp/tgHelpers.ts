// @ts-nocheck
export const TelegramApp = {
  init(options) {
    document.body.style.visibility = "";
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.MainButton.setParams({
      text: "CLOSE WEBVIEW",
      is_visible: true,
    }).onClick(DemoApp.close);
  },

  expand() {
    window.Telegram.WebApp.expand();
  },
  close() {
    window.Telegram.WebApp.close();
  },

  confirmClose() {
    window.Telegram.WebApp.enableClosingConfirmation(
      "Вы уверены что хотите закрыть окно?"
    );
  },

  closeWindow() {
    window.Telegram.WebApp.close();
  },
};
