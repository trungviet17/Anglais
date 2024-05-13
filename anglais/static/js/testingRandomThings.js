class TextChanger {
  constructor(text) {
      this.text = text;
  }

  changeText() {
      document.getElementById("demo").innerHTML = this.text;
  }
}

let myTextChanger = new TextChanger("Hello JavaScript!");

document.querySelector('button').addEventListener('click', function() {
  myTextChanger.changeText();
});
