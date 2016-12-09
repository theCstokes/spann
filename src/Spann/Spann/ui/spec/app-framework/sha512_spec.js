define(['SHA512'], function(SHA512) {
  describe("SHA512", function() {
    it("exists", function () {
      expect(SHA512).toBeDefined();
    });

    describe("Public Interface", function() {
      it("has sha512", function() {
        expect(SHA512.sha512).toBeDefined();
      });
      it("has sha384", function() {
        expect(SHA512.sha384).toBeDefined();
      });
      it("has sha512_256", function() {
        expect(SHA512.sha512_256).toBeDefined();
      });
      it("has sha512_224", function() {
        expect(SHA512.sha512_224).toBeDefined();
      });
    });

    describe("sha512", function() {
      var data;
      beforeEach(function() {
        data = "Hello World";
      });

      it("returns hash", function() {
        var obj = SHA512.sha512(data);

        expect(obj).toBeDefined();
        expect(typeof obj).toEqual("string");
        expect(obj.length).toEqual(512/4);
      });
    });
  });
});
