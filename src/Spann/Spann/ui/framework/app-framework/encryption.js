define(['SHA512'], function(sha512) {
  /**
   * Return a salted hash and the salt
   */
  function saltyHash(string) {
    var buf = new Uint8Array(128);
    var saltBytes = window.crypto.getRandomValues(buf);

    var salt = saltBytes.reduce(function(str, item) { return str + item }, "");

    var hash = string + salt;
    for (var i=0; i<1000; i++) {
      hash = sha512.sha512(hash + salt);
    }

    return {hash: hash, salt: salt};
  }

  return {
    saltyHash: saltyHash
  }
});
