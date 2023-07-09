export default (error: any): Error => (error instanceof Error ? error : new Error(String(error)));
