import { mathArea, debugAppState } from "./script";
import UndoManager from "./UndoManager";
import Utils from "./Utils";

import type { Direction, MQ, MathField, MathQuillType } from "./mathquill.d.ts";
declare const MathQuill: MathQuillType;

const MQ = MathQuill.getInterface(2) as MQ;
export const fields: MathField[] = [];
export let lastSelectedField: MathField;

export default class FieldManager {
  static updateLastSelectedField = (field: MathField) => {
    lastSelectedField = field;
  };

  static getSelectedField = () => {
    return Utils.getSelectedField() ?? lastSelectedField;
  };

  static newLine = () => {
    const position =
      fields.length > 0
        ? Utils.getFieldIndex(FieldManager.getSelectedField())
        : 0;

    const nextField = document.createElement("span");
    nextField.className = "field";
    mathArea.appendChild(nextField);

    if (fields.length > 0) {
      fields[position].el().after(nextField);
    }

    const newField = MQ.MathField(nextField, {
      handlers: {
        edit: UndoManager.updateFieldHistory,
        enter: FieldManager.newLine,
        deleteOutOf: FieldManager.deleteLine,
      },
    });

    Utils.addField(position, newField);
    UndoManager.addField(position);
    newField.focus();
    FieldManager.updateLastSelectedField(newField);

    debugAppState();
  };

  static deleteLine = (direction: Direction, field: MathField) => {
    if (fields.length > 1 && direction == MQ.L) {
      const position = Utils.getFieldIndex(field);
      const previousField = fields[Utils.getFieldIndex(field) - 1];

      mathArea.removeChild(field.el());
      previousField.focus();
      FieldManager.updateLastSelectedField(previousField);
      Utils.removeField(position);
      UndoManager.removeField(position);

      debugAppState();
    }
  };
}
