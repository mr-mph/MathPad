import { mathArea, debugAppState } from "../script";
import Utils from "./Utils";

import Field from "./Field";

import type { MQ, MathQuillType } from "./mathquill";
declare const MathQuill: MathQuillType;

const MQ = MathQuill.getInterface(2) as MQ;

export const fields: Field[] = [];
export let lastSelectedField: Field;

export default class FieldManager {
  static updateLastSelectedField = (field: Field) => {
    lastSelectedField = field;
  };

  static getSelectedField = () => {
    return Utils.getSelectedField() ?? lastSelectedField;
  };

  static newLine = (field?: Field) => {
    const position = field ? Utils.getFieldIndex(field) : fields.length - 1;

    const newField = new Field(position);

    FieldManager.updateLastSelectedField(newField);
    Utils.addField(position, newField);

    debugAppState();
  };

  static deleteLine = (field: Field) => {
    if (fields.length > 1) {
      const position = Utils.getFieldIndex(field);

      const previousField = fields[position > 0 ? position - 1 : 1];

      Utils.removeField(position);

      mathArea?.removeChild(field.MQField.el());

      previousField.MQField.focus();
      FieldManager.updateLastSelectedField(previousField);

      debugAppState();
    }
  };
}
