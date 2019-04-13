class Util {
  static uniq(list) {
    const hash = {};
    for (const item of list) {
      hash[item] = 1;
    }
    return Object.keys(hash);
  }
}

export default Util;
