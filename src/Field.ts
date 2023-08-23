import FieldManager, { fields } from "./FieldManager";
import { debugAppState, mathArea } from "./script";

import type { MQ, MathQuillType, MathField } from "./mathquill.d.ts";
declare const MathQuill: MathQuillType;

const MQ = MathQuill.getInterface(2) as MQ;

export default class Field {
  editHistory = [""];
  MQField: MathField;

  constructor(position: number) {
    const newField = document.createElement("span");
    newField.className = "field";
    mathArea.appendChild(newField);

    if (fields.length > 0) {
      fields[position].MQField.el().after(newField);
    }

    this.MQField = MQ.MathField(newField, {
      handlers: {
        edit: () => this.updateHistory(),
        enter: () => FieldManager.newLine(this),
        deleteOutOf: () => FieldManager.deleteLine(this),
      },
    });

    this.MQField.focus();
  }

  updateHistory = () => {
    FieldManager.updateLastSelectedField(this);

    const latex = this.MQField.latex();

    // if latex not already saved in history
    if (this.editHistory.at(-1) != latex) {
      this.editHistory.push(latex);
    }

    debugAppState();
  };
}
