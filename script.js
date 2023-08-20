const styleSheet = document.getElementsByTagName("style")[0].sheet;
const mathArea = document.getElementById("math-area");
const clearBtn = document.getElementById("clear-btn");
const addBtn = document.getElementById("add-btn");
const themeBtn = document.getElementById("theme-btn");
const root = document.documentElement;

const MQ = MathQuill.getInterface(2);
const fields = [];
let currentlySelected;
let editHistory = [];

const getHistory = (field) => {
  const index = fields.findIndex((item) => item.id == field.id);
  return editHistory[index];
};

const updateHistory = (field) => {
  currentlySelected = field;
  const historyArray = getHistory(field);
  if (historyArray.at(-1) != field.latex()) {
    historyArray.push(field.latex());
  }
};

const deleteLine = (dir, field) => {
  if (fields.length > 1) {
    if (dir == MQ.L) mathArea.removeChild(field.el());
    fields[fields.findIndex((item) => item.id == field.id) - 1].focus();
    fields.pop();
  }
};

const newLine = () => {
  const nextField = document.createElement("span");
  nextField.className = "field";
  mathArea.appendChild(nextField);
  const newField = MQ.MathField(nextField, {
    handlers: {
      edit: updateHistory,
      enter: newLine,
      deleteOutOf: deleteLine,
    },
  });
  fields.push(newField);
  editHistory.push([""]);
  newField.focus();
};
newLine();

clearBtn.onclick = () => {
  for (i = fields.length - 1; i > 0; i--) deleteLine(MQ.L, fields[i]);
  fields[0].focus();
  fields[0].latex("");
};

const switchIcon = (oldIcon, newIcon) =>
  (themeBtn.firstChild.className = themeBtn.firstChild.className.replace(
    oldIcon,
    newIcon
  ));

themeBtn.onclick = () => {
  if (root.style.colorScheme == "dark") {
    root.style.colorScheme = "light";
    styleSheet.deleteRule(styleSheet.length - 1);
    switchIcon("sun", "moon");
  } else {
    root.style.colorScheme = "dark";
    styleSheet.insertRule(
      ".mq-cursor {border-color: white !important;}",
      styleSheet.length - 1
    );
    switchIcon("moon", "sun");
  }
};

addBtn.onclick = newLine;

window.onkeydown = (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "z") {
    const historyArray = getHistory(currentlySelected);
    if (historyArray.length > 1) {
      historyArray.pop();
      currentlySelected.latex(historyArray.at(-1));
      console.log(editHistory);
    }
  }
};
