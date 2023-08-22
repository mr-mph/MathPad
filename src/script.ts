import UndoManager, { editHistory } from "./UndoManager";
import ThemeManager from "./ThemeManager";
import FieldManager, { fields } from "./FieldManager";

export const styleSheet = document.getElementsByTagName("style")[0].sheet;
export const mathArea = document.getElementById("math-area");
export const root = document.documentElement;

export const themeBtn = document.getElementById("theme-btn");

const clearBtn = document.getElementById("clear-btn");
const addBtn = document.getElementById("add-btn");

export const debugAppState = () => {
  // console.log({
  //   editHistory,
  //   fields,
  // });
};

FieldManager.newLine();

addBtn.onclick = () => {
  FieldManager.newLine();
};

clearBtn.onclick = () => {
  for (let i = fields.length - 1; i > 0; i--) {
    FieldManager.deleteLine(-1, fields[i]); // -1 is MQ.L
  }
  fields[0].focus();
  fields[0].latex("");
};

// if system dark mode
if (window.matchMedia("(prefers-color-scheme: dark)")?.matches) {
  ThemeManager.switchTheme("dark");
}

themeBtn.onclick = () => {
  if (root.style.colorScheme == "dark") {
    ThemeManager.switchTheme("light");
  } else {
    ThemeManager.switchTheme("dark");
  }
};

// undo detection
window.onkeydown = (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "z") {
    event.preventDefault();

    UndoManager.undo();
  }
};

// fix button formatting for chrome / firefox
if (
  navigator.userAgent.includes("Chrome") ||
  !navigator.userAgent.includes("Safari")
) {
  document.querySelectorAll("button").forEach((button) => {
    button.className = "chrome-button";
  });
}
