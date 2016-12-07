define(['Encryption'], function(Encryption) {
  describe("Encryption", function() {
    it("exists", function () {
      expect(Encryption).toBeDefined();
    });

    describe("Public Interface", function() {
      it("has saltyHash", function() {
        expect(Encryption.saltyHash).toBeDefined();
      });
    });

    describe("saltyHash", function() {
      var data;
      beforeEach(function() {
        data = "Hello World";
      });

      it("returns hash", function() {
        var obj = Encryption.saltyHash(data);

        expect(obj).toBeDefined();
        expect(obj.hash).toBeDefined();
        expect(typeof obj.hash).toEqual("string");
      });

      it("returns salt", function() {
        var obj = Encryption.saltyHash(data);

        expect(obj).toBeDefined();
        expect(obj.salt).toBeDefined();
        expect(typeof obj.salt).toEqual("string");
      });
    });
  });
});
