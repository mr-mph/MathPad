import FieldManager, { fields } from "./FieldManager";
import Utils from "./Utils";
import { MathField } from "./mathquill";
import { debugAppState } from "./script";

export let editHistory: string[][] = [];

export default class UndoManager {
  static addField = (position: number) => {
    if (editHistory.length < 1) {
      editHistory.push([""]);
    } else {
      editHistory.splice(position + 1, 0, [""]);
    }
  };

  static removeField = (position: number) => {
    editHistory.splice(position, 1);
  };

  static updateFieldHistory = (field: MathField) => {
    FieldManager.updateLastSelectedField(field);
    const historyArray: string[] = Utils.getFieldHistory(field);

    // if latex not already saved in history
    if (historyArray.at(-1) != field.latex()) {
      historyArray.push(field.latex());
    }

    debugAppState();
  };

  static undo = () => {
    const selectedField = FieldManager.getSelectedField();

    const historyArray = Utils.getFieldHistory(selectedField);

    debugAppState();
    if (historyArray.length > 1) {
      historyArray.pop();
      selectedField.latex(historyArray.at(-1));
    }
  };
}
