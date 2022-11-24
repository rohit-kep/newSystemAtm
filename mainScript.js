const visible = document.getElementById('visible'),
invisible = document.getElementById("invisible"),
passwd = document.getElementById("passwd"),
userName = document.getElementById("userName");




// code for passwd visibility

visible.addEventListener('click',()=>{toggler(visible,invisible,'text')});
invisible.addEventListener('click',()=>{toggler(invisible,visible,'password')});

function toggler(element1, element2,type){

    passwd.setAttribute('type',type);
element1.style.visibility = 'hidden';
element1.style.zIndex = '0';
element2.style.visibility = 'visible';
element2.style.zIndex = '10';
}


//code for creating new user.

const signUp = document.getElementById("signUp"),
errUserName = document.getElementById('errorUsrName');
errUserPswd = document.getElementById('errorUsrPswd');


signUp.addEventListener('click',e=>{
    e.preventDefault();

    const data = {
        userName: userName.value,
        password: passwd.value
    }

    //fist validata the data

    if(!data.userName.length > 0){
        errUserName.innerText = "user name can't be empty";
        return false;
    }
    
    if(!validate(data.userName,/[\d\s]/)){
        errUserName.innerText ='*plz use non numerical,non-white-space chars.';        
        return false;
    }
    
    errUserName.innerText = '';
    
    
    if(data.password.length < 6){
        errUserPswd.innerText = "use at least 6 charcters.";
        return false;
    }

    if(!validate(data.password,/\s/)){
        errUserPswd.innerText = '*plz use non-white-space characters only.'
        return false;
    }

    errUserPswd.innerText = '';
    
    //testing the originality of data
    if(localStorage.getItem(data.userName) !== null){
        creatDialog(document.body,'span',{class:' bg-red-200 px-[20px] absolute block w-[150px] h-[75px] border-r-[10px] border-blue-200 top-[200px] left-0'},`user already exists`);    
        return false;
    }
    
    localStorage.setItem(data.userName,(data.password+' y'));

  //then clear the form and tell the user about it
  userName.value = '';
  passwd.value = '';
    creatDialog(document.body,'span',{class:' bg-green-200 px-[20px] absolute block w-[150px] h-[75px] border-r-[10px] border-blue-200 top-[200px] left-0'},`user is generated`);

    return true;
})




// code for login into the system

const logIn = document.getElementById('logIn');
let userAccessTries = 0;

logIn.addEventListener('click',e=>{
e.preventDefault();
    
    //try to find the entered value into the local storage
    
    


    if(localStorage.getItem(userName.value) == null){
        creatDialog(document.body,'span',{class:' bg-red-200 px-[20px] absolute block w-[150px] h-[75px] border-r-[10px] border-blue-200 top-[200px] left-0'},`user doesn't exist.`);
        return;
    }

    let flag = localStorage.getItem(userName.value).split(' ')[1];
    if(flag === 'n'){
        creatDialog(document.body,'span',{class:' bg-red-200 px-[20px] absolute block w-auto h-[75px] border-r-[10px] border-blue-200 top-[200px] left-0'},`u have exceeded the maximum attempt for the day.`);
        return;
    }



    if(localStorage.getItem(userName.value).split(' ').shift() !== String(passwd.value)){
        creatDialog(document.body,'span',{class:' bg-red-200 px-[20px] absolute block w-[150px] h-[75px] border-r-[10px] border-blue-200 top-[200px] left-0'},`password is incorrect`);
        userAccessTries += 1;
        
        if(userAccessTries ===3){
            creatDialog(document.body,'span',{class:' bg-red-200 px-[20px] absolute block w-[150px] h-[75px] border-r-[10px] border-blue-200 top-[200px] left-0'},`maximum tries exceeed`);
        
        //marking for unable to use this user    

          let markedPasswd =   localStorage.getItem(userName.value).substring(0,(localStorage.getItem(userName.value).length-1));
          markedPasswd =markedPasswd+"n";
          
           localStorage.setItem(userName.value,markedPasswd);
             setTimeout(() => {
                window.location.reload();    
            }, 1000);
        }
    
        return;
    }

    notify('card authentication','user authentication details entered sucessfully, click to move furthur.');

})


//function for notificaiton
function notify(title,msg){
    let notificaiton;
    
    if(!("Notification" in window)){
        alert(title+msg);
    }
    else if(Notification.permission === "granted"){
        notificaiton = new Notification(title,{body:msg});
    }
    else if(Notification.permission === 'denied' || Notification.permission !== 'denied'){
        Notification.requestPermission().then(permission=>{
            if(permission === 'granted'){
                notificaiton = new Notification(title,{body:msg});
            }
        }).catch(err=>console.log(err));
    }
    notificaiton.onclick = ()=>{
        window.location.href = './notificationConcent.html';

    }
    
}





// code for validation
    function validate(str, pattern){
        if(pattern.test(str)){
            return false;
        }
        return true;
}

// code for dialog creation

function creatDialog(par,type,attributes,text){
    let element = document.createElement(type);
    element.innerText = text;
    for(let i in attributes){
        element.setAttribute(i,attributes[i]);
    }
    par.appendChild(element);
    setTimeout(() => {
        element.remove();
    }, 2000);
}





//remaining task

// code for login
//code for notification validation
//code for setting up the account page.