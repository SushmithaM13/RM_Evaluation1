
const taskNameInput=document.getElementById("taskName");
const delayInput=document.getElementById("delay");
const repeatCheckbox=document.getElementById("repeat");
const startBtn=document.getElementById("startBtn");
const taskLog=document.getElementById("taskLog");
const cancellAllBtn=document.getElementById("cancelAllBtn");


const intervalIds=[];

function getCurrentTime(){
    const now=new Date();
    return now.toTimeString().split(" ")[0];
}

function logTask(taskName){
    const li=document.createElement("li");
    li.textContent=`Task "${taskName}" executed at ${getCurrentTime()}`;
    taskLog.appendChild(li);
}

startBtn.addEventListener("click", ()=>{
    const taskName=taskNameInput.value;
    const delay=parseInt(delayInput.value);
    const Repeat=repeatCheckbox.checked;

    if(!taskName || isNaN(delay) || delay<=0){
        alert("Please enter a vaild task name and delay");
        return;
    }

    if(Repeat){
        const intervalId=setInterval(()=>logTask(taskName), delay);
        intervalIds.push(intervalId);
    }else{
        setTimeout(()=>logTask(taskName),delay);
    }

    taskNameInput.value="";
    delayInput.value="";
    repeatCheckbox.checked=false;
});

cancellAllBtn.addEventListener("click",()=>{
    intervalIds.forEach(id=>clearInterval(id));
    intervalIds.length=0;
    const li=document.createElement("li");
    li.textContent="All repeating tasks cancelled";
    taskLog.appendChild(li);
});

