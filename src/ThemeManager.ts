import { themeBtn, root, styleSheet } from "./script";

export default class ThemeManager {
  static switchIcon = (oldIcon: string, newIcon: string) => {
    const image = themeBtn.firstElementChild;
    image.className = image.className.replace(oldIcon, newIcon);
  };

  static switchTheme = (theme: "light" | "dark") => {
    if (theme == "dark") {
      root.style.colorScheme = "dark";
      styleSheet.insertRule(".mq-cursor {border-color: white !important;}", 0);
      styleSheet.insertRule("button:hover { filter: brightness(0.9)}", 0);
      this.switchIcon("moon", "sun");
    } else {
      root.style.colorScheme = "light";
      styleSheet.deleteRule(0);
      styleSheet.deleteRule(0);
      this.switchIcon("sun", "moon");
    }
  };
}
