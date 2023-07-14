const mathArea = document.getElementById("math-area");
const clearBtn = document.getElementById("clear-btn");
const addBtn = document.getElementById("add-btn");
const themeBtn = document.getElementById("theme-btn");
const root = document.documentElement;

const MQ = MathQuill.getInterface(2);
var fields = [];

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
      enter: newLine,
      deleteOutOf: deleteLine,
    },
  });
  fields.push(newField);
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
    switchIcon("sun", "moon");
  } else {
    root.style.colorScheme = "dark";
    switchIcon("moon", "sun");
  }
};

addBtn.onclick = newLine;
