import withSplitting from 'withSplitting';

export const Main = withSplitting(() => import('./Main'));
export const Detail = withSplitting(() => import('./Detail'));
export const Create = withSplitting(() => import('./Create'));

export const Error404 = withSplitting(() => import('./404'));
