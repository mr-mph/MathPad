import { fields } from "./FieldManager";
import Field from "./Field";

export default class Utils {
  static removeField = (position: number) => {
    fields.splice(position, 1);
  };

  static addField = (position: number, field: Field) => {
    fields.splice(position + 1, 0, field);
  };

  static getFieldIndex = (field: Field) => {
    return fields.findIndex((item) => item.MQField.id == field.MQField.id);
  };

  static getSelectedField = () => {
    return fields.find((field) =>
      field.MQField.el().className.includes("mq-focused")
    );
  };
}
