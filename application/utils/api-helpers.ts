export function queryFnReturn<T>(returnData: T, error?: any): Promise<{ data: T }> {
  if (error) console.error(error);
  return new Promise((resolve) => resolve({ data: returnData }));
}

export async function returnQuery<T>(promise: Promise<any>, returnData: T) {
  return promise.then((data: any) => queryFnReturn(returnData, data)).catch((error) => queryFnReturn(returnData, error));
}
