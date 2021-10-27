import { getFile } from 'src/driver/bucket';

export default function () {
  const getAvatar = async (object, name) => {
    const baseUrl = 'http://placehold.jp/350/9c27b0/FFFFFF/600x600.png?text=';

    //check whether the object is null and whether there is a name to show the initial letter of it
    if (object === null && !name) return `${baseUrl}%20`;
    if (!object && name) return `${baseUrl}${name.split('').shift()}`;

    return getFile(object.key);
  };

  return {
    getAvatar,
  };
}
