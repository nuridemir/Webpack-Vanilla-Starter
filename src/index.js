import $ from 'jquery'
import "./style.css";

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

console.log("hello world !")

$("body").css("border", "2px solid red");