export const toClassName = (obj: any): string => {
    if (!obj) return '';
    const constructor = Object.getPrototypeOf(obj).constructor;
    if (constructor instanceof Function) return obj.name || 'Function';
    return constructor.name;
}