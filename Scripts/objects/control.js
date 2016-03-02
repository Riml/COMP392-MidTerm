/// <reference path="../../typings/tsd.d.ts"/>
/*
ADVANCED_GRAPHICS_COMP392_TEST1
CENTENNIAL_COLLEGE_W2016
Author: Ilmir Taychinov 300760705
Based on: Tom Tsiliopoulos template for midterm
Created: 2 March 2016
Last Modified: 2 March 2016
*/
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(basicSpeed) {
            this.groundCubeRotation = -basicSpeed;
            this.secondCubeRotation = basicSpeed;
            this.thirdCubeRotation = -basicSpeed;
            this.fourthCubeRotation = basicSpeed;
            this.fifthCubeRotation = -basicSpeed;
        }
        return Control;
    }());
    objects.Control = Control;
})(objects || (objects = {}));

//# sourceMappingURL=control.js.map
