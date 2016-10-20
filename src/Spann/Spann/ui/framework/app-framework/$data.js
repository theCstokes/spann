function build() {
  var SEND_TYPES = Object.freeze({ POST: "POST", PUT: "PUT", PATCH: "PATCH" });
  function send(type, request, data, callback) {
    makeRequest(type, request, makeBody(data), callback);
  }

  function get(request, headers, callback) {
    if (headers !== undefined && callback === undefined) {
      callback = headers;
      headers = undefined;
    } else {
      var searchHeader;
      if (headers.hasOwnProperty("SearchHeader")) {
        searchHeader = headers.SearchHeader;
        // delete headers.searchHeader;
      }
    }
    makeRequest("GET", request, "", function (data) {
      if (data !== undefined) {
        return callback(data);
      }
      console.log("No data recived from: " + request.api);
    }, "SearchHeader", searchHeader);
  }

  function deleteRequest(request, callback) {
    makeRequest("DELETE", request, "", callback);
  }

  function makeBody(data) {
    return new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  }

  function makeRequest(type, request, body, callback, headerName, header) {
    if (request.hasOwnProperty("api")) {
      var api = request.api;
      // delete request.api;
      // for(var key in request) {
      //   if(!request.hasOwnProperty(key)) {
      //     continue;
      //   }
      //   var reg = new RegExp(key);
      //   api.replace(reg, request[key]);
      // }

      if (request.hasOwnProperty('id')) {
        var reg = new RegExp("{id}");
        api = api.replace(reg, request.id);
      }

      //// old api call
      // var address = window.location.href.split('ui/')[0] + "api/v1/" + api;
      // var xhr = new XMLHttpRequest();
      // xhr.open(type, address);
      // xhr.responseType = 'json';
      // xhr.onload = function (e) {
      //   console.log("data: " + this.response);
      // }
      // xhr.onreadystatechange = function (event) {
      //   // check if request is complete
      //   if (this.readyState == this.DONE) {
      //     if (this.onreadystatechange) {
      //       xhr.onreadystatechange = null;
      //       if (callback !== undefined) {
      //         callback(JSON.parse(event.target.response));
      //       }
      //     }
      //   }
      // };
      // if (header !== undefined) {
      //   xhr.setRequestHeader(headerName, JSON.stringify(header));
      // }
      // xhr.send(body);

      ajaxCall(type, api, 
      function(data) {
        if (callback !== undefined) {
          callback(JSON.parse(data));
        }
      },
      function(data) {
        console.log(data);
      });
    }
  }

  function ajaxCall (type, api, successCallback, errorCallback) {
    var xhr = new XMLHttpRequest();
    url = window.location.href.split('ui/')[0] + "api/v1/" + api;
    xhr.open(type, url, true);
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (successCallback && successCallback.constructor == Function) {
            var response = xhr.responseText;
            if(xhr.responseXML !== null) {
              response = xhr.responseXML.childNodes[0].innerHTML
            }
            return successCallback(response);
          }
        } else {
          if (errorCallback && errorCallback.constructor == Function) {
            return errorCallback(xhr.statusText);
          } else {
            console.error("Failed to get resource '" + url + "' Error: " + xhr.statusText);
          }
        }
      }
    };
    xhr.onerror = function (e) {
      if (errorCallback && errorCallback.constructor == Function) {
        return errorCallback(xhr.statusText);
      } else {
        console.error("Failed to get resource. Error: " + xhr.statusText);
      }
    };
    xhr.send(null);
  };

  var sources = {
    USER_API: { api: "User" },
    CHAT_API: { api: "Chat" }
  }

  return {
    sources: sources,
    SEND_TYPES: SEND_TYPES,
    send: send,
    get: get
  }
}

var $data = build();
