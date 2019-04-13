class Util {
  static uniq(list) {
    if (!list) {
      return list;
    }
    const hash = {};
    const keyFor = item => item.toString();
    const originalItems = {};
    for (const item of list) {
      const key = keyFor(item);
      originalItems[key] = item;
      hash[key] = 1;
    }
    const keysToKeep = Object.keys(hash);
    return keysToKeep.map(key => originalItems[key]);
  }
}

Util.categorySeparator = ' - ';

export default Util;
