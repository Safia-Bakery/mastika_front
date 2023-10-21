module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        mainGray: "#EFF2F7",
        darkGray: "#545556",
        black: "#303031",
        darkYellow: "#FFDC4C",
        yellow: "#FFE15B",
        primary: "#3399ee",
        darkBlue: "#5266F7",
        hoverGray: "#C2C2C2",
        danger: "#FA444F",
        tgPrimary: "#DCC38B",
        tgBorder: "#F1F1F1",
        selected: "rgba(0, 0, 0, 0.51)",
      },
      boxShadow: {
        // selected: "0px 4px 4px 0px #00000040",
        selected: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
    },
  },

  plugins: [],
};
