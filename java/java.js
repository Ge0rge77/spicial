//local storage
let mainColor=localStorage.getItem("color-option")

if(mainColor !==null){
   // console.log("local storage is not empty")
    document.documentElement.style.setProperty('--main-color', mainColor)
}
// random background option 

let backgroundoption = true;

let backgroundinterval;

//check local storage random background items

let backgrounditem =localStorage.getItem("background_option");

    if(backgrounditem !== null){
        if(backgrounditem ==='true'){
            backgroundoption = true
        }else{
            backgroundoption = false
        }
        // remova active class

        document.querySelectorAll(".random-background span").forEach(element =>{
            element.classList.remove("active");
        });
        if(backgrounditem === 'true') {
        document.querySelector(".random-background .yes").classList.add("active")
    } else{
        document.querySelector(".random-background .no").classList.add("active")
    }
}

// toggle spin icon
document.querySelector(".toggle-settings .fa-gear").onclick = function(){
    this.classList.toggle("fa-spin");
    document.querySelector(".settings-box").classList.toggle("Open");
};

//switch-color
const colorsli=document.querySelectorAll(".colors-list li")
//loop li
colorsli.forEach(li =>{
    li.addEventListener("click", (e)=>{
        //set color on root
        document.documentElement.style.setProperty('--main-color',e.target.dataset.color)

        //set color on local storge
        localStorage.setItem("color-option", e.target.dataset.color)

        handleActive(e);

    });
});
//switch- random background
const randombackground =document.querySelectorAll(".random-background span")
//loop all span
randombackground.forEach(span =>{
    span.addEventListener("click", (e)=>{
        
        handleActive(e);

        if(e.target.dataset.background === "yes") {
            backgroundoption = true;
            randomimage();
            localStorage.setItem("background_option" , true)
        }else {

            backgroundoption = false;
            clearInterval(backgroundinterval);
            localStorage.setItem("background_option" , false)
        }
    });
});

// select landing

let landing=document.querySelector('.landing-page');

// get Array of image

let imageArray=["1.jpg", "2.jpg","3.jpg", "4.jpg", "6.jpg"];

//function random 

function randomimage(){

    if(backgroundoption === true){

     // get randoum number

    backgroundinterval = setInterval(() => {
    let randoum = Math.floor(Math.random()* imageArray.length)

    // change background

    landing.style.backgroundImage = 'url("image/' + imageArray[randoum]+ ' ")' ;

}, 5000); //كل 3 ثواني يقوم بتغير صورة
    }

}

//select skills selector       المهارات وطريقة العرض 

let ourSkills = document.querySelector(".skills");

window.onscroll = function() {
    let skillsOffsetTop = ourSkills.offsetTop;

    let skillsOuterHeight = ourSkills.offsetHeight;

    let windowHeight = this.innerHeight;

    let windowScrollTop = this.pageYOffset;

    if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)){

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        
        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;
        });
    }
};

//creat Popup with images 

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener("click", function(e){

        // creat overlay element
        let overLay = document.createElement("div");
        // add class to overlay
        overLay.className = 'popup-overlay';
        // Append overlay to body
        document.body.appendChild(overLay);
        // creat popup
        let popupBox = document.createElement("div");
        // add class to popup
        popupBox.className = 'popup-box';

        if(img.alt !== null){
            // create heading
            let imgHeading = document.createElement('h3')
            // create text for heading
            let imgText = document.createTextNode(img.alt)
            // append text to heading
            imgHeading.appendChild(imgText)
            // append heading to popup
            popupBox.appendChild(imgHeading)

        }
        // creat image
        let popupImage = document.createElement("img");
        // set image source
        popupImage.src = img.src;
        // add image to popup
        popupBox.appendChild(popupImage)
        //append popup tp body
        document.body.appendChild(popupBox)
        // create the close span
        let closeButton = document.createElement("span")
        // creat close button text
        let closeButtonText = document.createTextNode("X")
        // append text to close button
        closeButton.appendChild(closeButtonText)
        // add class to close button
        closeButton.className = 'close-button'
        // add closebutton to popup box
        popupBox.appendChild(closeButton)

    });
});

// close popup
document.addEventListener("click", function(e){

    if(e.target.className == 'close-button'){
        // remove popup
        e.target.parentNode.remove()
        // remove overlay
        document.querySelector(".popup-overlay").remove()
    
    }
})

// select all bullets

const allBullets = document.querySelectorAll(".nav-bullets .bullet");


// select all Links

const allLinks = document.querySelectorAll(".links a");


function scrollToSomeWhere(elements){
    elements.forEach(ele =>{
        ele.addEventListener("click" , function(e){
            e.preventDefault();
    
            document.querySelector(e.target.dataset.section).scrollIntoView({
    
            behavior: 'smooth'
            });
        });
    });
}

scrollToSomeWhere(allBullets)
scrollToSomeWhere(allLinks)


//   Handle active state

function handleActive(ev){
    // remove active class

    ev.target.parentElement.querySelectorAll(".active").forEach(element =>{

        element.classList.remove("active")
    });

    //  add active class

    ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span")

let bulletsContainer = document.querySelector(".nav-bullets")

let bulletLocalItem = localStorage.getItem('bullets-option')

if(bulletLocalItem !== null){
    bulletsSpan.forEach(span => {

        span.classList.remove("active");
    });
let bulletLocalItem = localStorage.getItem('bullets-option')
    if(bulletLocalItem === 'block'){
        bulletsContainer.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active")
    }else {
    bulletsContainer.style.display = 'none';
    document.querySelector(".bullets-option .no").classList.add("active");
    } 
}

bulletsSpan.forEach(span =>{
    span.addEventListener("click" , function(e){
        if(span.dataset.display === 'show'){
            bulletsContainer.style.display = 'block';

            localStorage.setItem("bullets-option", 'block')
        }else{
            bulletsContainer.style.display = 'none';

            localStorage.setItem("bullets-option", 'none')
        }
        handleActive(e);
    });
});

// reset button
document.querySelector(".reset-option").onclick = function(){
    
    localStorage.removeItem("bullets-option")
    localStorage.removeItem("color-option")
    localStorage.removeItem("bacground-option")

    window.location.reload()
}

// toggle menu

let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function(e){

    // stopPropagation
    e.stopPropagation();    

    this.classList.toggle("menu-active");

    tLinks.classList.toggle("open");
;}

// click anywhere outside menu toggle button

document.addEventListener("click" , (e) => {

    if (e.target !== toggleBtn && e.target !== tLinks){

        //  check ig menu is open
        if(tLinks.classList.contains("open")){
            
            toggleBtn.classList.toggle("menu-active");

            tLinks.classList.toggle("open");
        }
    }
})

 // stopPropagation on Menu
tLinks.onclick = function(e){
    e.stopPropagation();
}