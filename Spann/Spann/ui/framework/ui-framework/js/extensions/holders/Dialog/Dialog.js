function Dialog(parent, screen) {
  var item = document.createElement('div');
  item.className += ' modal';
  parent.appendChild(item);

  //add base component data
  var component = $ui.BaseComponent(item, screen);
  var object = component.object;

  var panelItem = document.createElement('div');
  item.appendChild(panelItem);
  panelItem.className += ' modal-content';

  var headerItem = document.createElement('div');
  headerItem.className += ' modal-header';
  panelItem.appendChild(headerItem);

  var spanItem = document.createElement('span');
  spanItem.className += ' close';
  spanItem.innerHTML += "×";
  headerItem.appendChild(spanItem);

  var headerData = document.createElement('h2');
  headerData.innerHTML += "Test Header";
  headerItem.appendChild(headerData);

  var bodyItem = document.createElement('div');
  bodyItem.className += ' modal-body';
  panelItem.appendChild(bodyItem);

  var bodyData = document.createElement('h3');
  bodyData.innerHTML += "Some data and stuff";
  bodyItem.appendChild(bodyData);

  var footerItem = document.createElement('div');
  footerItem.className += ' modal-footer';
  panelItem.appendChild(footerItem);

  var footerData = document.createElement('h3');
  footerData.innerHTML += "Footer";
  footerItem.appendChild(footerData);

  // When the user clicks on <span> (x), close the modal
  spanItem.onclick = function() {
      item.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == item) {
          item.style.display = "none";
      }
  }

  Object.defineProperty(object, 'open', {
    value: function (event) {
      item.style.display = "block";
    }
  });

  return object;
}

$ui.addExtension('Dialog', Dialog);
