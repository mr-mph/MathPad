import { MathField } from "./mathquill";
import { fields } from "./FieldManager";
import { editHistory } from "./UndoManager";

export default class Utils {
  static removeField = (position: number) => {
    fields.splice(position, 1);
  };

  static addField = (position: number, field: MathField) => {
    fields.splice(position + 1, 0, field);
  };

  static getFieldIndex = (field: MathField) => {
    return fields.findIndex((item) => item.id == field.id);
  };

  static getFieldHistory = (field: MathField) => {
    const index = Utils.getFieldIndex(field);
    return editHistory[index];
  };

  static getSelectedField = () => {
    return fields.find((field) => field.el().className.includes("mq-focused"));
  };
}
