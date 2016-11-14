function build() {
  var SEND_TYPES = Object.freeze({ POST: "POST", PUT: "PUT", PATCH: "PATCH" });
  function send(type, request, request_extra, data, callback) {
    if(callback === undefined && request_extra !== undefined) {
      callback = data;
      data = request_extra;
      request_extra = undefined;
    }
    if (request_extra !== undefined) {
      request = combineRequests(request, request_extra);
    }
    makeRequest(type, request, makeBody(data), callback);
  }

  function get(request, headers, callback, request_extra) {
    if (headers !== undefined) {
      request = combineRequests(request, headers);
    }
    if (headers !== undefined) {
      if (callback === undefined) {
        callback = headers;
        headers = undefined;
      } else {
        var searchHeader;
        if (headers.hasOwnProperty("SearchHeader")) {
          searchHeader = headers.SearchHeader;
          // delete headers.searchHeader;
        }
      }
    }
    makeRequest("GET", request, "", function (data) {
      if (data !== undefined) {
        return callback(data);
      }
      console.log("No data recived from: " + request.api);
    }, "SearchHeader", searchHeader);
  }

  function combineRequests(request, extra) {
    var combinedRequest = $utils.clone(request);
    for (var key in extra) {
      if (!extra.hasOwnProperty(key)) { continue; }
      combinedRequest[key] = extra[key];
    }
    return combinedRequest;
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

      if (request.hasOwnProperty('id')) {
        var reg = new RegExp("{id}");
        api = api.replace(reg, request.id);
      }

      ajaxCall(type, api, body,
        function (data) {
          if (callback !== undefined) {
            callback(data);
          }
        },
        function (data) {
          console.log(data);
        });
    }
  }

  function ajaxCall(type, api, data, successCallback, errorCallback) {
    var xhr = new XMLHttpRequest();
    url = window.location.href.split('ui/')[0] + "api/v1/" + api;
    xhr.responseType = 'json';
    xhr.open(type, url, true);
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 201) {
          if (successCallback && successCallback.constructor == Function) {
            var response = xhr.response;
            // if(xhr.responseXML !== null) {
            //   response = xhr.responseXML.childNodes[0].innerHTML
            // }
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
    xhr.send(data);
  };

  // var sources = {
  //   USER_API: { api: "User" },
  //   CHAT_API: { api: "Chat" },
  //   PROJECT_API: { api: "Python/Project"}
  // }

  return {
    // sources: sources,
    SEND_TYPES: SEND_TYPES,
    send: send,
    get: get
  }
}

var $data = build();
