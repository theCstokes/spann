describe("$ui", function () {
  it("exists", function() {
    expect($ui).toBeDefined();
  });

  describe("Public Interface", function() {
    it("has push", function() {
      expect($ui.push).toBeDefined();
    });
  });
});