const fileInput = document.querySelector(".file-input"),
filterOptions = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
previewImg = document.querySelector(".preview-img img"),
chooseImgBtn = document.querySelector(".choose-img");

const loadImage = () =>{
  let file = fileInput.files[0]; //get user select file
  if(!file)return; // if user not select file
  previewImg.src = URL.createObjectURL(file); // passing file url as preview img src
  previewImg.addEventListener("load", ()=>{
    document.querySelector(".container").classList.remove("disable");
  });
}

filterOptions.forEach(option => {
  option.addEventListener("click", () => {//add events to all filter button
    document.querySelector(".filter .active").classList.remove("active");
    option.classList.add("active");
    
  });
});

fileInput.addEventListener("change", loadImage);
chooseImgBtn.addEventListener("click", ()=> fileInput.click());