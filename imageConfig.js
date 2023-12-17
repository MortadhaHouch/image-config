let inputFile = document.getElementById("inputFile");
let inputURL = document.getElementById("inputURL");
let canvas = document.querySelector("canvas");
let img = document.querySelector("img");
let anchor = document.createElement("a");
let label = document.querySelectorAll("label")[0];
let imageURL;
let widthInput = document.getElementById("width");
let heightInput = document.getElementById("height");
let borderRadiusTopLeftInput = document.getElementById("borderRadiusTop");
let borderRadiusTopRightInput = document.getElementById("borderRadiusLeft");
let borderRadiusBottomRightInput = document.getElementById("borderRadiusBottom");
let borderRadiusBottomLeftInput = document.getElementById("borderRadiusRight");
let blurInput = document.getElementById("blur");
let hueRotateInput = document.getElementById("hue-rotate");
let contrastInput = document.getElementById("contrast");
let grayscaleInput = document.getElementById("grayscale");
let sepiaInput = document.getElementById("sepia");
let invertInput = document.getElementById("invert");
let brightnessInput = document.getElementById("brightness");
let context = canvas.getContext("2d");
let filtersContainer = document.getElementById("filtersContainer");
let button = document.querySelector("button.download");
let select = document.querySelector("#select");
let container = document.querySelector("#div");
let options = select.querySelectorAll("option");
let documentOptions = document.querySelectorAll("option");
let sizeOptions = document.querySelectorAll(".sizes");
let main = document.querySelector("main");
let resetInputsButton = document.querySelector(".resetInputs");
let documentInputs = document.querySelectorAll("input");
let rotationAngleZ = 0;
let dimensions = { width: img.width, height: img.height };
let loadingAnimation = document.querySelector("section.loading");
resetInputsButton.addEventListener("click", function(){
    documentInputs.forEach((documentInput)=>{
        if (documentInput.getAttribute("type") === "radio"){
            documentInput.checked=false;
        } else if (documentInput.getAttribute("type") === "color"){
            documentInput.value=null;
        } else{
            documentInput.value = "";
            img.src = "";
            img.style.transform = "rotateZ(0deg)";
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    })
})
documentOptions.forEach((documentOption) =>{
    documentOption.setAttribute("title", documentOption.getAttribute("value"));
})
sizeOptions.forEach((sizeOption) =>{
    sizeOption.addEventListener("change", function (){
        let [width, height] = this.value.split("px");
        dimensions.width = Number(width);
        dimensions.height = Number(...height.split("*").filter((Boolean)));
        img.style.width = `${dimensions.width}px`;
        img.style.height = `${dimensions.height}px`;
        canvas.style.width = `${dimensions.width}px`;
        canvas.style.height = `${dimensions.height}px`;
        img.width = dimensions.width;
        img.height = dimensions.height;
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;
        context.drawImage(img, 0, 0, dimensions.width, dimensions.height);
        console.log(canvas, img);
    })
})
let option,quality;
async function fetchURL(url){
    loadingAnimation.classList.add("showing");
    return await fetch(url).then((request) =>{
        if (request.ok){
            return request.blob();
        } else{
            console.log("fetching data has failed,please checkout your internet network");
        }
        return request.blob();
    }).then((response) =>{
        loadingAnimation.classList.remove("showing");
        fileReader(response);
    }).catch((error) =>{
        loadingAnimation.classList.remove("showing");
        console.log(error)
    })
}
function fileReader(file){
    let fr = new FileReader(file);
    fr.readAsDataURL(file);
    return new Promise((resolve, reject) =>{
        fr.addEventListener("load",function(){
            resolve(fr.result);
        })
        fr.addEventListener("error",function(){
            reject("error loading file");
        })
    })
}
function styleApplier(){
    img.style.filter = `blur(${blurInput.value || 0}px)
    brightness(${brightnessInput.value || 1})
    hue-rotate(${hueRotateInput.value || 0}deg)
    contrast(${contrastInput.value || 1})
    grayscale(${grayscaleInput.value || 0})
    sepia(${sepiaInput.value || 0})
    invert(${invertInput.value || 0})
    brightness(${brightnessInput.value || 1})
    drop-shadow(${dropShadowXOffsetInput.value || 0}px ${dropShadowYOffsetInput.value || 0}px
    ${dropShadowBlurInput.value || 0}px ${dropShadowColorInput.value || "none"})`;
    canvas.style.filter = img.style.filter;
}
inputURL.addEventListener("input", function (e){
    let url = e.target.value;
    fetchURL(url);
})
inputURL.onfocus = function(){
    label.classList.add("inputLabel");
};
inputURL.onblur = function(){
    inputURL.value === ""?label.style.opacity = 1:label.style.opacity = 0;
}
inputFile.addEventListener("input",async function (){
    try {
        let url =await fileReader(inputFile.files[0]);
        img.setAttribute("src", url);
        img.addEventListener("load",function(){
            main.classList.remove("hidden");
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
            filtersContainer.classList.add("filters");
            container.setAttribute("style", "display:flex;");
        })
    } catch (error) {
        console.log(error);
    }
})
widthInput.addEventListener("input",function(){
    img.style.width=`${this.value || img.width}px`;
    context.clearRect(0,0,canvas.width,canvas.height);
    canvas.width = img.style.width;
    context.drawImage(img,0,0);
})
heightInput.addEventListener("input",function(){
    img.style.height = `${this.value || img.height}px`;
    context.clearRect(0,0,canvas.width,canvas.height);
    canvas.height = img.style.height;
    context.drawImage(img,0,0);
})
borderRadiusTopLeftInput.addEventListener("input",function(){
    img.style.borderTopLeftRadius = `${this.value||0}px`;
})
borderRadiusTopRightInput.addEventListener("input",function(){
    img.style.borderTopRightRadius = `${this.value||0}px`;
})
borderRadiusBottomRightInput.addEventListener("input",function(){
    img.style.borderBottomRightRadius = `${this.value||0}px`;
})
borderRadiusBottomLeftInput.addEventListener("input", function () {
    img.style.borderBottomLeftRadius = `${this.value||0}px`;
});
blurInput.addEventListener("input",function(){
    
})
hueRotateInput.addEventListener("input",function(){
    styleApplier()
    canvas.style.filter = img.style.filter;
})
contrastInput.addEventListener("input",function(){
    styleApplier()
    canvas.style.filter = img.style.filter;
})
grayscaleInput.addEventListener("input",function(){
    styleApplier()
    canvas.style.filter = img.style.filter;
})
sepiaInput.addEventListener("input",function(){
    styleApplier()
    canvas.style.filter = img.style.filter;
})
invertInput.addEventListener("input",function(){
    styleApplier()
    canvas.style.filter = img.style.filter;
})
brightnessInput.addEventListener("input",function(){
    styleApplier()
    canvas.style.filter = img.style.filter;
})
select.addEventListener("change", function (){
    option = options[select.options.selectedIndex].value;
})
button.addEventListener("click", function (){
    button.appendChild(anchor);
    anchor.innerText = "";
    img.style.width = `${dimensions.width}px`;
    img.style.height = `${dimensions.height}px`;
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;
    img.width = dimensions.width;
    img.height = dimensions.height;
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    context.filter = canvas.style.filter;
    if(rotationAngleZ){
        context.rotate(rotationAngleZ);
    }
    context.drawImage(img, 0, 0, dimensions.width, dimensions.height);
    let dataURL = canvas.toDataURL();
    anchor.href = dataURL;
    anchor.download = `picture.${option || options[0].value}`;
    anchor.click();
});