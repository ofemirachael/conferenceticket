const uploadDiv = document.getElementById("upload-div");
const uploadFile = document.getElementById("upload-file");
const fullname = document.getElementById("fullname");
const emailaddress = document.getElementById("emailaddress");
const githubuser = document.getElementById("githubuser");
const submitbtn = document.getElementById("submitbtn");
const previewimg = document.getElementById("previewimg");
const removeimage = document.getElementById("removeimg");
const changeimage = document.getElementById("changeimg");
const userticketimage = document.getElementById("ticketuserimage");
    const userticketname = document.getElementById("ticketusername");
    const userticketgit = document.getElementById("userticketgit")
    const userticketemail = document.getElementById("userticketemail");
    const fullusername = document.getElementById("fullusername");


let fileurl;
uploadDiv?.addEventListener("dragenter", (e)=>{
    e.preventDefault()
    console.log("dragged")
});
uploadDiv?.addEventListener("drop", (e)=>{
    e.preventDefault()
    const uploadedfile = e.datatransfer.files[0];

    console.log(uploadedfile)
    getFile(uploadedfile)
})

uploadDiv?.addEventListener("click", ()=>{
    uploadFile.click();
});

uploadFile?.addEventListener("change", (e)=>{
    getFile(e.target.files[0])

    fileurl = e.target.files[0]
})

let getFile = (file) =>{

    if(file.type.startsWith('image/')){
        const fileReader = new FileReader();
        fileReader.addEventListener("load", (e)=>{
            previewimg.setAttribute('src', e.target.result);
            previewimg.classList.remove("hide");
            localStorage.setItem('imageURL', e.target.result);
            previewimg.classList.add("show");
            previewimg.style.display = "block";
            document.getElementById("uploadsvg").style.display = "none";
            document.getElementById("uploadtext").style.display = "none";

            document.getElementById("divbtn").classList.remove("hide")
            
            const removeBtn = document.createElement("button");
            removeBtn.classList.add("imgbtn");
            removeBtn.textContent = "Remove Image";
            removeBtn.onclick = () => preview.remove();
        })
        fileReader.readAsDataURL(file);
    }else{
        alert('Please upload a valid image file.');
    }
  
}

removeimage?.addEventListener("click", (e)=>{
    e.stopPropagation();
    e.preventDefault()
    uploadFile.value = "";
    document.getElementById("uploadsvg").style.display = "block";
    document.getElementById("uploadtext").style.display = "block";
    previewimg.setAttribute('src', "");
    previewimg.style.display = "none";
    document.getElementById("divbtn").classList.add("hide")
})

changeimage?.addEventListener("click", (e)=>{
    e.stopPropagation();
    e.preventDefault()
    uploadFile.click();
})

submitbtn?.addEventListener("click", (e)=>{
    e.preventDefault();
    const name = fullname.value;
    const address = emailaddress.value;
    const username = githubuser.value;

    
    if(fullname && emailaddress && githubuser){
       localStorage.setItem("name", name);
       localStorage.setItem("email", address);
       localStorage.setItem("username", username);
      
       window.location.href = "generate.html";
      
    }else{
        console.log("submit the form")
    }

  
})



function printcard(){
    
    
    
    const username = localStorage.getItem("name");
    userticketname.textContent = username;
    fullusername.textContent = username+"!";
   

    const gitname = localStorage.getItem("username");
    userticketgit.textContent = gitname;

    const useremail = localStorage.getItem("email");
    userticketemail.textContent = useremail;

    const imageurl = localStorage.getItem("imageURL");
    userticketimage.src = imageurl;

    console.log(imageurl)
  
}


if (window.location.pathname === '/generate.html') {
    document.addEventListener('DOMContentLoaded', printcard);
  }