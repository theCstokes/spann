define(['screen_login'], function(Encryption) {
  describe("screen_login", function() {
    it("exists", function () {
      expect(screen_login).toBeDefined();
    });

    describe("Public Interface", function() {
      it("has login", function() {
        expect(Encryption.login).toBeDefined();
      });
      it("has fiddle", function() {
        expect(Encryption.fiddle).toBeDefined();
      });
      it("has _internal", function() {
        expect(Encryption._internal).toBeDefined();
      });
    });
    
    describe("Internals", function() {
      describe("Interface", function() {
        it("has authenticate", function() {
          expect(screen_login._internal.authenticate).toBeDefined();
        });
      });
      
      describe("authenticate", function() {
        var data;
        var password;
        beforeEach(function() {
          password = "abc";
          data = {
            items: [ {
              password: password
            }]
          }
            
          screen_login.event.target.screen.trigger('action', 
            { action: 'attributeChange', data: { password: password } });
        });

        it("returns authorization", function() {
          var authorization = screen_login.authenticate(data);

          expect(authorization).toBeDefined();
          expect(typeof authorization).toEqual("boolean");
          expect(authorization).toEqual("true"); 
        });
      });
    });
  });  
});