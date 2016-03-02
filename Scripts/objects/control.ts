/// <reference path="../../typings/tsd.d.ts"/>

/*
ADVANCED_GRAPHICS_COMP392_TEST1
CENTENNIAL_COLLEGE_W2016
Author: Ilmir Taychinov 300760705
Based on: Tom Tsiliopoulos template for midterm
Created: 2 March 2016
Last Modified: 2 March 2016 
*/
module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        public groundCubeRotation:number;
        public secondCubeRotation:number;
        public thirdCubeRotation:number;
        public fourthCubeRotation:number;
        //public fifthCubeRotation:string;
        public fifthCubeRotation:number;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(basicSpeed:number) {
            this.groundCubeRotation = -basicSpeed;
            this.secondCubeRotation = basicSpeed;
            this.thirdCubeRotation = -basicSpeed;
            this.fourthCubeRotation = basicSpeed;
            this.fifthCubeRotation = -basicSpeed;
            
        }
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
       
    }
}
