export interface DraggableTreeNodeItemRenderProps<T = any> {
  path: number[];
  node: DraggableTreeNode<T>;
  dragging: boolean;
  isOver: boolean;
  isFolded: boolean;
  isOverlay: boolean;
  hasChildren: boolean;
  onDelete: () => void;
  onToggleFold: () => void;
}
export interface DraggableTreeNode<T = any> {
  // identity a node, will be used to save fold status
  id?: string;
  data?: T;
  canDropIn?: boolean | ((source: T) => boolean);
  canDropBefore?: boolean | ((source?: T) => boolean);
  canDropAfter?: boolean | ((source?: T) => boolean);
  items: DraggableTreeNode[];
  addItem: (value: T) => void;
  addSubItem: (value: T) => void;
  deleteItem: (index: number) => void;
  moveItem: (from: number, to: number) => void;
}

export interface NavCompItemType {
  label: string;
  hidden: boolean;
  active: boolean;
  onEvent: (name: string) => void;
}

export interface IDropData {
  targetListSize: number;
  targetPath: number[];
  dropInAsSub: boolean;
}

export interface IDragData {
  node: DraggableTreeNode;
  path: number[];
}
