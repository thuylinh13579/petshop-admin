export const CREATE_PRODUCT_ENDPOINT = `${ process.env.NEXT_PUBLIC_URL }/products`;
export const UPDATE_PRODUCT_ENDPOINT = (id: any) => `${ process.env.NEXT_PUBLIC_URL }/products/${id}`;
export const DELETE_PRODUCT_ENDPOINT = (id: any) => `${ process.env.NEXT_PUBLIC_URL }/products/${id}`;
