define(['Async'], function(Async) {
  var code = "val = \"\" \n for i in range(0, 2000):\n\tval += (str(i) * i)\nprint \"Done\"";
  describe("Fiddle_Stress_Test", function() {
    var codeItems;
    var socket;
    var date;
    beforeEach(function() {
      codeItems = [];
      for(var i =0; i < 10; i++) {
        codeItems.push(code);
      }
      socket = new WebSocket("ws://" + location.host + "/api/v1/Python/Fiddle");
      var date = new Data();
    });
    it("Can take it", function() {
      var id = 0;
      var startTime = date.getTime();
      Async.map(codeItems, 
      function(item, callback) {
        id ++;
        socket.onmessage = function (event) {
          callback(null, event);
        }
        socket.onopen = function (event) {
          var file = {
            identity: id,
            name: "test.py",
            sourceCode: item
          };
          socket.send(JSON.stringify(file));
        }
      },
      function(error, result) {
        var endTime = date.getTime;
        expect((endTime - startTime) < 10000).toBeTruthy();
      });
    });
  });
});