/* 
  modified from npm: mathquill-node
*/

export interface IMathFieldConfig {
  spaceBehavesLikeTab?: boolean;
  leftRightIntoCmdGoes?: "up" | "down";
  restrictMismatchedBrackets?: boolean;
  sumStartsWithNEquals?: boolean;
  supSubsRequireOperand?: boolean;
  charsThatBreakOutOfSupSub?: string;
  autoSubscriptNumerals?: boolean;
  autoCommands?: string;
  autoOperatorNames?: string;
  substituteTextarea?: () => void;
  handlers?: {
    deleteOutOf?: (direction: Direction, mathField: MathField) => void;
    moveOutOf?: (direction: Direction, mathField: MathField) => void;
    selectOutOf?: (direction: Direction, mathField: MathField) => void;
    downOutOf?: (mathField: MathField) => void;
    upOutOf?: (mathField: MathField) => void;
    edit?: (mathField: MathField) => void;
    enter?: (mathField: MathField) => void;
  };
}

export interface MathField {
  el(): HTMLElement;
  cmd(latex: string): void;
  latex(latex: string): void;
  latex(): string;
  focus(): void;
  select(): void;
  revert(): void;
  reflow(): void;
  blur(): void;
  write(latex: string): void;
  clearSelection(): void;
  moveToLeftEnd(): void;
  moveToRightEnd(): void;
  moveToDirEnd(direction: Direction): void;
  keystroke(keys: string): void;
  typedText(text: string): void;
  config(newConfig: IMathFieldConfig): void;
  id: number;
}

export declare interface MQ {
  StaticMath: (html_element: any) => MathField;
  MathField: (html_element: any, config?: IMathFieldConfig) => MathField;
  R: Direction;
  L: Direction;
}

export enum Direction {
  R,
  L,
}

export declare interface MathQuillType {
  getInterface: (n: number) => MQ;
}

declare const MathQuill: MathQuillType;

declare const BindCmds: { [key: string]: string };

export default MathQuill;

export { BindCmds };
