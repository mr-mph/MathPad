import FieldManager from "./FieldManager";
import { debugAppState } from "./script";

export default class UndoManager {
  static undo = () => {
    const selectedField = FieldManager.getSelectedField();

    const historyArray = selectedField.editHistory;

    if (historyArray.length > 1) {
      historyArray.pop();

      const prevLatex = historyArray.at(-1);
      prevLatex != undefined && selectedField.MQField.latex(prevLatex);
    }

    debugAppState();
  };
}
