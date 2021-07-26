export class Menu {
  back: Item;
  title: string;
  menu: Item[];
}

export class Item {
  label: string;
  path: string;
  more: boolean;
}

export class MenuActive{
  position: number;
  path: string;
}
