import UndoManager from "./UndoManager";
import ThemeManager from "./ThemeManager";
import FieldManager, { fields } from "./FieldManager";
import Utils from "./Utils";

export const styleSheet = document.getElementsByTagName("style")[0].sheet;
export const mathArea = document.getElementById("math-area");
export const root = document.documentElement;

export const themeBtn = document.getElementById("theme-btn");

const clearBtn = document.getElementById("clear-btn");
const addBtn = document.getElementById("add-btn");

export const debugAppState = () => {
  // console.log(fields);
};

// init first field
FieldManager.newLine();

if (addBtn)
  addBtn.onclick = () => {
    FieldManager.newLine();
  };

if (clearBtn)
  clearBtn.onclick = () => {
    for (let i = fields.length - 1; i > 0; i--) {
      FieldManager.deleteLine(fields[i]);
    }
    fields[0].MQField.focus();
    fields[0].MQField.latex("");
  };

// if system dark mode
if (window.matchMedia("(prefers-color-scheme: dark)")?.matches) {
  ThemeManager.switchTheme("dark");
}

if (themeBtn)
  themeBtn.onclick = () => {
    if (root.style.colorScheme == "dark") {
      ThemeManager.switchTheme("light");
    } else {
      ThemeManager.switchTheme("dark");
    }
  };

window.onkeydown = (event: KeyboardEvent) => {
  // undo detection
  if ((event.ctrlKey || event.metaKey) && event.key === "z") {
    event.preventDefault();

    UndoManager.undo();
  }

  // up/down arrow navigation
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    const position = Utils.getFieldIndex(FieldManager.getSelectedField());

    if (event.key === "ArrowUp" && position > 0) {
      fields[position - 1].MQField.focus();
    } else if (event.key === "ArrowDown" && position < fields.length - 1) {
      fields[position + 1].MQField.focus();
    }
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
