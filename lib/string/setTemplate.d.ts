/**
 * @param template "toto {titi} tutu{titi}" + { titi: 5 } => "toto 5 tutu5"
 * @param replaceByKey
 * @returns
 * @example setTemplate("toto {a} tutu{a} {b}!", { a: 5, b: 'ok' }) => "toto 5 tutu5 ok!"
 */
export declare const setTemplate: (template: string, replaceByKey: Record<string, any>) => string;
