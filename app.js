const fileInput = document.querySelector(".file-input"),
filterOptions = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".filter-info .value"),
filterSlider = document.querySelector(".slider input"),
rotateOptions = document.querySelectorAll(".rotate button"),
previewImg = document.querySelector(".preview-img img"),
resetFilterBtn = document.querySelector(".reset-filter"),
chooseImgBtn = document.querySelector(".choose-img"),
saveImgBtn = document.querySelector(".save-img");

let brightness =100, saturation =100, inversion = 0, grayscale = 0;
let rotate =0, flipHorizontal =1, flipVertical = 1;
const applyFilters = () =>{
  previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
} 

const loadImage = () =>{
  let file = fileInput.files[0]; //get user select file
  if(!file)return; // if user not select file
  previewImg.src = URL.createObjectURL(file); // passing file url as preview img src
  previewImg.addEventListener("load", ()=>{
    resetFilterBtn.click();
    document.querySelector(".container").classList.remove("disable");
  });
}

filterOptions.forEach(option => {
  option.addEventListener("click", () => {//add events to all filter button
    document.querySelector(".filter .active").classList.remove("active");
    option.classList.add("active");
    filterName.innerText = option.innerText;

    if(option.id === "brightness"){
      filterSlider.max = "200";
      filterSlider.value = brightness;
      filterValue.innerText = brightness + "%";
    }else if(option.id === "saturation"){
      filterSlider.max = "200";
      filterSlider.value = saturation;
      filterValue.innerText = saturation + "%";
    }else if(option.id === "inversion"){
      filterSlider.max = "100";
      filterSlider.value = inversion;
      filterValue.innerText = inversion + "%";
    }else{
      filterSlider.max = "100";
      filterSlider.value = grayscale;
      filterValue.innerText = grayscale + "%";
    }
  });
});

const udateFilter = () => {
  filterValue.innerText = filterSlider.value + "%";
  const selectedFilter = document.querySelector(".filter .active");// get selected filter button

  if(selectedFilter.id === "brightness"){
    brightness = filterSlider.value;
  }else if(selectedFilter.id === "saturation"){
    saturation = filterSlider.value;
  }else if(selectedFilter.id === "inversion"){
    inversion = filterSlider.value;
  }else{
    grayscale = filterSlider.value;
  }
  applyFilters();
 }

 rotateOptions.forEach(option=>{
  option.addEventListener("click", ()=>{// add event to rotate img
    if(option.id === "left"){
      rotate -= 90; 
    }else if(option.id === "right"){
      rotate += 90; 
    }else if(option.id === "horizontal"){
      flipVertical = flipVertical === 1 ? -1 : 1; 
    }else{
      flipHorizontal = flipHorizontal === 1 ? -1 : 1; 
    }
    applyFilters();
  });
 });


const resetFilter = ()=>{
  brightness =100; saturation =100; inversion = 0; grayscale = 0;
  rotate =0; flipHorizontal =1; flipVertical = 1;
  filterOptions[0].click();// clicking bright btn so bright select by default
  applyFilters();
}

const saveImage =()=>{
  const canvas = document.createElement("canvas");//create element
  const ctx = canvas.getContext("2d");// canvas.getcontext return a drawing context on the canvas
  canvas.width = previewImg.naturalWidth;//setting canvas width to actual img height
  canvas.height = previewImg.naturalHeight;//setting canvas height to actual img height
  
  //apply user select filter
  ctx.filter= `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  ctx.translate(canvas.width/2, canvas.height/2);
  if(rotate !==0){// if rotate value isnt 0 rotate the canvas
    ctx.rotate(rotate * Math.PI / 180);
  }
  ctx.scale(flipHorizontal, flipVertical); //flip canvas
  ctx.drawImage(previewImg, -canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
  // document.body.appendChild(canvas);
  const link = document.createElement("a");
  link.download="image.jpg";
  link.href = canvas.toDataURL();
  link.click();
}

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", udateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click",saveImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());