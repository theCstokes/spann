function build() {
  // var components = Registry.getRegistry();
  var TYPE_PROPERTY = 'component';
  var CHILDREN_PROPERTY = 'content';

    function parse(parent, screen, data) {
      var uiElements = [];
      for(var key in data) {
        if(!data.hasOwnProperty(key)) {
          continue;
        }
        var item = data[key];
        var itemProperties = Object.keys(item);
        if(typeof(item) === 'object' && itemProperties.indexOf(TYPE_PROPERTY) > -1) {
          uiElements = uiElements.concat(createObject(parent, screen, item));
        }
      }
      return uiElements;
    }

    function createObject(parent, screen, item) {
      var control = item[TYPE_PROPERTY](parent, screen);
      return loadControlData(parent, item, control, screen);
      // return control;
    }

    /**
    * Loads data into control object
    */
    function loadControlData(parent, data, control, screen) {
      var elements = [];
      for(var key in data) {
        if(!data.hasOwnProperty(key)) {
          continue;
        }
        // Skip if original component decloration
        if(key === TYPE_PROPERTY) {
          continue;
        }
        // If child item create and add to parent
        if(control.isContianer) {
          if(control.containers.hasOwnProperty(key)) {
            elements = elements.concat(parse(control.containers[key], screen, data[key]));
            // continue;
          }
        }
        // If current it has property add value
        if(control.model.hasOwnProperty(key)) {
          control.model[key] = data[key];
        }
      }

      // Launch callback triggering end of build
      if(control.hasOwnProperty('show')) {
        control.show();
      }
      // Push control's public interface to screen elements
      // elements.push(control.model);
      elements.push(control);
      return elements;
    }

    function createType(type, parent, screen) {
      var typeControl = type(parent, screen);
      if(typeControl.hasOwnProperty('show')) {
        typeControl.show();
      }
      return typeControl;
    }

  return {
    build: parse,
    createType: createType
  }
}

var $builder = build();
