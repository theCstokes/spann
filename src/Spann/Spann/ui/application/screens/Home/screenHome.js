define([
  'Screen'
], function(Screen) {
  return function() {
    var screen = new Screen();

    screen.content = [
        {
          component: $ui.Panel,
          showTopDock: false,
          overrideHTML: "<style>\
          .welcome {\
            font-family: Verdana, Tahoma, 'Trebuchet MS', 'DejuVu Sans', 'Bitstream Vera Sans', sans-serif;\
          }\
          \
          .m {\
            letter-spacing: -4px;\
          }\
          \
          .m2 {\
            //color: #95c1a6;\
          }\
          \
          .welcomeText {\
            font-size: 1.25em;\
            line-height: 1.75em;\
            text-align: justify;\
          }\
          \
          .grail {\
            transition: 333ms ease-in-out;\
          }\
          \
          .grail:hover {\
            transform: translate(10px, -5px) rotate(20deg);\
            width: 15%;\
          }\
          </style>\
          <div class='welcome' style='background: #34495e; color: white;'>\
          <center><H1>Spa<span class='m'>n<span class='m2'>n</span></span></H1></center>\
          <div style='background: #007830; height: 4px;'></div>\
          </div>\
          \
          <center><div class='welcomeText' style='background: white; color: black; width: 66%;'>\
          Spann is your goto application for editing and executing python code on the web. The spann\
          IDE provides everyone from students, teachers, to professional developers with the tools they need to\
          write what ever python code they want, where ever they want.\
          <br><br>\
          Being a web application, Spann functions exactly the same on a mobile tablet as it would on a desktop computer.\
          <br><br>\
          The best part, we take care of\
          the actual code execution. So if your machine isn't speedy, don't worry, we'll make sure your code executes\
          without slowing down your machine any bit.\
          </div></center>\
          <img class='grail' style='float: left; width: 10%;' src='application/resources/grail.png'>"
        }
      ];


    return screen;
  }
});
