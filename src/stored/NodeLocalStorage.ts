export default class NodeLocalStorage implements Storage {
  [key: string]: any;

  get length(): number {
    return Object.keys(this).length;
  }

  save() {}

  clear(): void {
    for (const key in this) delete this[key];
    this.save();
  }

  getItem(key: string): string | null {
    return this[key] || null;
  }

  key(index: number): string | null {
    return Object.keys(this)[index] || null;
  }

  removeItem(key: string): void {
    delete this[key];
    this.save();
  }

  setItem(key: string, value: string): void {
    this[key] = value;
    this.save();
  }
}
