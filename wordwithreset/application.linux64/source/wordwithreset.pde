String[] words;
int count = 0;
int pickColor = -1;
void setup() {
  size(485,555);
  smooth();
  PFont font = createFont("Avenir Next Bold Italic",32);
  textFont( font );
  words = loadStrings("alotofwords.txt");
  noLoop();
}

void draw() {
    forDraw();
    save("output.png");
    
    forDraw();
    save("output2.png");
 
  exit();
}

void forDraw(){
  String s = "a";
  
  while(s.length() < 3)
    s = words[(int)(Math.random() * words.length)];
    
  s = s.toUpperCase();
  
  if(pickColor > 0)
  {
    int oldPick = pickColor;
    pickColor = (int )(Math.random() * 4 + 1);
    while(pickColor == oldPick)
      pickColor = (int )(Math.random() * 4 + 1);
  }
  else 
    pickColor = (int )(Math.random() * 4 + 1);
  switch(pickColor){
    case 1:  //pastel blue
             background(164, 212, 255);
             break;
    case 2:  //pastel pink
             background(#FFCAF9);
             break;
    case 3:  //pastel purple
             background(#DDCEFF);
             break;
    case 4: //pastel green
            background(#B5FFC8);
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
void paint( PGraphics g, boolean drawShadow, String s, float fontSize) {
   if (drawShadow) {
     //g.fill(64, 170, 252);
     //g.fill(#627f99);
     g.fill(195);
   } else {
     g.fill(255);
   }
 
   g.textSize(fontSize);
   int alignment = (int)(CENTER + (0.0005*textWidth(s)));
   g.textAlign(alignment);
    int yCoord = (int)((height/2)+(textAscent()*0.33));
   g.text( s, width/2, yCoord);
  
}