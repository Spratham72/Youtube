var videos=document.getElementById("videos");
async function home(){
var search=document.getElementById("search").value;
 let res= await fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&chart=mostPopular&regionCode=In&maxResults=25&key=AIzaSyAE-XpMbKKFXWKDlTNzjVabJx7l1C6bmO8`);
let data= await(res.json());
console.log(data.items)
appendVideos1(data.items)
}
 home() 
async function searchVideos(){
var search=document.getElementById("search").value;
 let res= await fetch(`https://youtube.googleapis.com/youtube/v3/search?maxResults=20&q=${search}&type=video&key=AIzaSyAE-XpMbKKFXWKDlTNzjVabJx7l1C6bmO8`);
let data= await(res.json());
console.log(data)
appendVideos(data.items)
}
function appendVideos(vide_data){
    videos.innerHTML=null;
    vide_data.forEach(({id:{videoId}}) => {
        let div=document.createElement("div");
        div.innerHTML=`<iframe width="250" height="150" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        div.style.marginTop="20px";
        videos.append(div);
    });
}
function appendVideos1(vide_data){
    videos.innerHTML=null;
    vide_data.forEach(({id}) => {
        console.log(id)
        let div=document.createElement("div");
        div.innerHTML=`<iframe width="250" height="150" src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        div.style.marginTop="20px";
        videos.append(div);
    });
}


function account(){
  let drop=document.getElementById("drop");
    drop.style.visibility="visible";
    videos.innerHTML=null;

}
function signup(){
    let sign=document.getElementById("signup");
    sign.style.display="block";
}
function login(){
    let sign=document.getElementById("signup");
    sign.style.display="none";
    let login=document.getElementById("login");
    login.style.display="block";
}
function check(e){
            let form=document.getElementById("login");
            e.preventDefault();
            data={
            
            username:form.user.value,
            password:form.password.value,
            };
            console.log(data)
            dataSend=JSON.stringify(data);
            console.log(data)

            fetch("https://masai-api-mocker.herokuapp.com/auth/login",{
                method:'POST',
                body:dataSend,
                headers:{
                        'Content-Type':"application/json",
                    },
            })
            .then ((res)=>{
                return res.json();
            })
            .then((res)=>{
                console.log(res)
                console.log(data.username,res.token)
                fetchmyData(data.username,res.token);
            }) 
        }
        function fetchmyData(username, token){

        fetch(`https://masai-api-mocker.herokuapp.com/user/${username}`,{
        headers:{
                'Content-Type':"application/json",
                Authorization:`Bearer ${token}`,
            },
        })
        .then ((res)=>{
            return res.json();
        })
        .then((res)=>{
            
            document.getElementById("name").textContent=res.name;
            document.getElementById("drop").innerHTML=null;
            document.innerHTML=null;

            home();
            console.log(res)
        })
        }
function getData(e){
    e.preventDefault();
    let form=document.getElementById("signup");
        let userData={
            name:form.name.value,
            email:form.email.value,
            password:form.password.value,
            username:form.user.value,
            mobile:form.mobile.value,
            description:form.description.value
        }
        userData=JSON.stringify(userData);
        console.log(userData)
        fetch("https://masai-api-mocker.herokuapp.com/auth/register",{
        method:'POST',
        body:userData,
        headers:{
            'Content-Type':"application/json",
        },
        })
        .then ((res)=>{
            return res.json();
        })
        .then((res)=>{
            let message=document.getElementById("message");
            message.textContent=res.message
            console.log(res)
        })
        .catch((er)=>{
            console.log(er)
        })
}
