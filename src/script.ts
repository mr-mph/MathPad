import type { Direction, MQ, MathField, MathQuillType } from "./mathquill.d.ts";
declare const MathQuill: MathQuillType;

const styleSheet = document.getElementsByTagName("style")[0].sheet;
const mathArea = document.getElementById("math-area");
const clearBtn = document.getElementById("clear-btn");
const addBtn = document.getElementById("add-btn");
const themeBtn = document.getElementById("theme-btn");
const root = document.documentElement;

const MQ = MathQuill.getInterface(2) as MQ;
const fields: MathField[] = [];
let editHistory = [];
let selectedField: MathField;

const debugAppState = () => {
  // console.log(
  //   editHistory.map((item, index) => {
  //     return {
  //       latex: item.at(-1),
  //       editHistory: item,
  //       isFocused: getFieldIndex(fields[index]) == getFieldIndex(selectedField),
  //     };
  //   })
  // );
  // console.log(editHistory);
};

const getFieldIndex = (field: MathField) => {
  return fields.findIndex((item) => item.id == field.id);
};

const getHistory = (field: MathField) => {
  const index = getFieldIndex(field);
  return editHistory[index];
};

const updateHistory = (field: MathField) => {
  // if field is not deleted
  if (getFieldIndex(field) !== -1) {
    const historyArray = getHistory(field);

    // if latex not already saved in history
    if (historyArray.at(-1) != field.latex()) {
      historyArray.push(field.latex());
    }

    selectedField = field;
    debugAppState();
  }
};

const deleteLine = (dir: Direction, field: MathField) => {
  if (fields.length > 1) {
    const position = getFieldIndex(field);

    if (dir == MQ.L) mathArea.removeChild(field.el());

    const previousField = fields[getFieldIndex(field) - 1];

    previousField.focus();
    fields.splice(position, 1);
    editHistory.splice(position, 1);

    selectedField = previousField;
    debugAppState();
  }
};

const newLine = (field?: MathField) => {
  const position = getFieldIndex(field);
  const nextField = document.createElement("span");
  nextField.className = "field";
  mathArea.appendChild(nextField);
  if (fields.length > 0) {
    fields[position].el().after(nextField);
  }

  const newField = MQ.MathField(nextField, {
    handlers: {
      edit: updateHistory,
      enter: newLine,
      deleteOutOf: deleteLine,
    },
  });
  fields.splice(position + 1, 0, newField);
  editHistory.splice(position + 1, 0, [""]);
  newField.focus();

  selectedField = newField;
  debugAppState();
};
newLine();
addBtn.onclick = () => {
  newLine(selectedField);
};

clearBtn.onclick = () => {
  for (let i = fields.length - 1; i > 0; i--) deleteLine(MQ.L, fields[i]);
  fields[0].focus();
  fields[0].latex("");
};

const switchIcon = (oldIcon: string, newIcon: string) =>
  (themeBtn.firstElementChild.className =
    themeBtn.firstElementChild.className.replace(oldIcon, newIcon));

themeBtn.onclick = () => {
  if (root.style.colorScheme == "dark") {
    root.style.colorScheme = "light";
    styleSheet.deleteRule(0);
    switchIcon("sun", "moon");
  } else {
    root.style.colorScheme = "dark";
    styleSheet.insertRule(".mq-cursor {border-color: white !important;}", 0);
    switchIcon("moon", "sun");
  }
};

// undo detection
window.onkeydown = (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "z") {
    event.preventDefault();

    selectedField = fields.find((field) =>
      field.el().className.includes("mq-focused")
    );

    const historyArray = getHistory(selectedField);

    debugAppState();
    if (historyArray.length > 1) {
      historyArray.pop();
      selectedField.latex(historyArray.at(-1));
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
