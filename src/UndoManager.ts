import FieldManager from "./FieldManager";
import { debugAppState } from "./script";

export let editHistory: string[][] = [];

export default class UndoManager {
  static undo = () => {
    const selectedField = FieldManager.getSelectedField();

    const historyArray = selectedField.editHistory;

    if (historyArray.length > 1) {
      historyArray.pop();
      selectedField.MQField.latex(historyArray.at(-1));
    }

    debugAppState();
  };
}
