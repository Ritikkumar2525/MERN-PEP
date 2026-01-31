// function mul(x,y){
//     if(y==undefined){
//         y=2;
//     }
//     return x*y;
// }
// console.log(mul(5));
// console.log(mul(5, 4));


// function sum(...args){
//     let sum = 0;
//     for(let arg of args){
//         sum += arg;
//     }
//     return sum;
// }
// let x= sum(1,2,3,4,5);
// console.log(x);


// function run(fn){
//     return fn();
// }

// const SayHello = function(){
//     return "Hello World";
// }

// console.log(run(SayHello));


// let sq = x => x*x;
// console.log(sq(5));



// const person = {
//     name: "Ritik",
//     age : 21,
//     eyecolor: "black"
// }
// console.log(person)

//  const cars = ["BMW", "Volvo", "Saab", "Ford"];
//  console.log(cars[3]);


//  let letters = new Set(["a", "b", "c", "d"]);
//  console.log(typeof letters);


// let mySet = new WeakSet();
// let obj1 = { name: "Ritik", name: "Sharma" };


// mySet.add(obj1);
// mySet.delete(obj1);


// class Cars {
//     constructor(name, year){
//         this.name = name;
//         this.year = year;
//     }

//     age(){
//         let myAge = 23;
//         console.log(myAge);
//     }
// }

// const myCar = new Cars("Ford", 2014);
// myCar.age();


// function task(callback){
//     setTimeout(()=>{
//         callback("B");
//     }, 2000);
// }
// console.log("A");

// task((value) =>{
//     console.log(value);
// })

// console.log("C");



// function fetchData(callback){
//     setTimeout(()=>{
//         callback("Data fetched");
//     }), 20000;
// }
// fetchData((value)=>{
//     console.log(value);
// });
// console.log("End of program");




