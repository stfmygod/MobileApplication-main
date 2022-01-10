import { Storage } from '@capacitor/storage';

export const getToken = async () => await Storage.get({ key: 'Token' });
export const setToken = async (token: string) => Storage.set({ key: 'Token', value: token });

// export const setImages = async () => {
//     const oldImages = Storage.get({key:'images'});

//     Storage.set({
//       key: 'images',
//       value: {
//         ...oldImages,
//         [id]: nouaImagine,
//       },
//     });
// }
