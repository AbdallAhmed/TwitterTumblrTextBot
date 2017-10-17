import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class thankyou extends PApplet {

String[] words = {"Thank You", "Gracias", "Merci", "Arigato", "Grazie", "Mahalo"};
int count = 0;
int pickColor = -1;

public void setup() {
  
  
  PFont font = createFont("Avenir Next Bold Italic",32);
  textFont( font );
  noLoop();
}

public void draw() {
    forDraw();
    save("output.png");
 
  exit();
}

public void forDraw(){
  String s = words[(int)(Math.random()*words.length)];
  
  pickColor = (int )(Math.random() * 4 + 1);
  switch(pickColor){
    case 1:  //pastel blue
             background(164, 212, 255);
             break;
    case 2:  //pastel pink
             background(0xffFFCAF9);
             break;
    case 3:  //pastel purple
             background(0xffDDCEFF);
             break;
    case 4: //pastel green
            background(0xffB5FFC8);
            break;
    default: System.out.println("we are screwed");
  }
  
  //set initial size
  textSize(2);
  //find the length of the word at starting size (this is just a base value used later)
  float initSize = textWidth(s);
  //should be the final size
  float finalFontSize = 2 * ((width/initSize) - (50/initSize));
  
  //write the word twice. once in bold text - second as a shadow
  //paint( g, true, s, finalFontSize);
  ///filter( BLUR, 13);
  //translate(5,5);
  paint( g, false, s, finalFontSize);
}
public void paint( PGraphics g, boolean drawShadow, String s, float fontSize) {
   if (drawShadow) {
     //g.fill(64, 170, 252);
     //g.fill(#627f99);
     g.fill(195);
   } else {
     g.fill(255);
   }
 
   g.textSize(fontSize);
   int alignment = (int)(CENTER + (0.0005f*textWidth(s)));
   g.textAlign(alignment);
    int yCoord = (int)((height/2)+(textAscent()*0.33f));
   g.text( s, width/2, yCoord);
  
}
  public void settings() {  size(500,300);  smooth(); }
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "thankyou" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
