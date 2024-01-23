const taskInput=document.querySelector("#task"),dateTimeInput=document.querySelector("#datetime"),taskBtn=document.querySelector("#add-task-btn"),taskList=document.querySelector("#tasks-list"),bellBtn=document.querySelector("#bell-btn");let currDateTime=new Date,taskCount=0,tasks=localStorage.getItem("tasks"),notificationPermission=!1;function createNotification(t){let e=new Date(t.timing)-new Date;if(console.log(e),""===t.status){if(e<Number.MAX_SAFE_INTEGER)return"granted"===Notification.permission?(console.log("Creating notification"),setTimeout(()=>{new Notification("Todo List",{body:`${t.task}
Status : ${e>0?"pending":"overdue"}
Date: ${t.date}-${t.month}-${t.year}
Time : ${t.hour} : ${t.minutes} ${t.amPm}`,icon:"../images/icon.png"})},e)):alert("Cannot create notifications since the notification permission is denied, to get notifications please grant notification permission."),!0;alert("Cannot create notification, please select a date closer to current date")}return!1}function returnTasksString(t,e){return`<div class="tasks-design ${e[t].status}" id = ${t}>
                    <div class="task-container">
                        <p>
                            <span class="font-semibold text-lg">Task:</span>
                            <p class="text-justify">
                                ${e[t].task}
                            </p>
                        </p>
                        <p>
                            <span class="font-semibold text-lg">Date:</span><br>
                            ${e[t].date} - ${e[t].month} - ${e[t].year}
                        </p>
                        <p>
                            <span class="font-semibold text-lg">Time:</span> <br>
                            ${e[t].hour} : ${e[t].minutes} ${e[t].amPm}
                        </p>
                    </div>
                    <div class="task-btn-frame">
                        <button id = done-btn${t} class="bg-green-500 task-btn hover:bg-green-400">${"completed"===e[t].status?"Undone":"Done"}</button>
                        <button id = delete-btn${t} class="task-btn bg-red-500 hover:bg-red-400">Delete</button>
                    </div>
                </div>`}const doneBtnFunc=t=>{let e=t.target.parentNode.parentNode;if(console.log(e),console.log(t),"Undone"===t.target.textContent)t.target.textContent="Done",tasks[Number(e.getAttribute("id"))].status="";else{t.target.textContent="Undone";tasks[Number(e.getAttribute("id"))].status="completed"}e.classList.toggle("completed"),localStorage.setItem("tasks",JSON.stringify(tasks))},deleteBtnFunc=t=>{console.log("Delete btn clicked");let e=Number(t.target.parentNode.parentNode.getAttribute("id"));tasks.splice(e,1),console.log(tasks),document.getElementById(`${e}`).classList.add("animate-fade-out"),setTimeout(()=>{document.getElementById(`${e}`).remove(),addEventListenersToElements(tasks.length,!1),renderTasks(tasks),addEventListenersToElements(tasks.length-1,!0),localStorage.setItem("tasks",JSON.stringify(tasks))},1200)};function addEventListenersToElements(t,e){if(!0===e)for(let n=0;n<=t;n++){let s=document.querySelector(`#done-btn${n}`);s&&(s.addEventListener("click",doneBtnFunc),document.querySelector(`#delete-btn${n}`).addEventListener("click",deleteBtnFunc))}else for(let a=0;a<=t;a++){let i=document.querySelector(`#done-btn${a}`);i&&(i.removeEventListener("click",doneBtnFunc),document.querySelector(`#delete-btn${a}`).removeEventListener("click",deleteBtnFunc))}}function addEventListenerToDoneBtn(t){t.addEventListener("click",doneBtnFunc),console.log("Added")}function addEventListenerToDeleteBtn(t){t.addEventListener("click",deleteBtnFunc),console.log("Added")}function returnFragment(t){return document.createRange().createContextualFragment(t)}function renderTasks(t){let e=new DocumentFragment,n=t.length,s;for(s=0;s<n;s++){let a=returnFragment(returnTasksString(s,t));e.append(a)}taskCount=s-1,taskList.textContent="",taskList.appendChild(e)}function renderTask(t,e){let n=new DocumentFragment;if(n.append(returnFragment(returnTasksString(t,e))),n.firstChild){let s=n.firstChild;s.classList.add("animate-fade-in"),setTimeout(()=>{s.classList.remove("animate-fade-in")},1100)}else console.log("No first child");taskList.append(n)}function initialization(){if(tasks)for(let t of(tasks=JSON.parse(tasks),renderTasks(tasks),addEventListenersToElements(tasks.length-1,!0),tasks))createNotification(t);else tasks=[];let e=new Date;e.setUTCHours(e.getUTCHours()+5.5,e.getUTCMinutes(),0,0),dateTimeInput.min=e.toISOString().slice(0,16),dateTimeInput.value=e.toISOString().slice(0,16)}taskBtn.addEventListener("click",()=>{let t=taskInput.value,e=dateTimeInput.value;if(t&&e){let n=(e=new Date(e)).getFullYear().toString(),s=(e.getMonth()+1).toString().padStart(2,"0"),a=e.getDate().toString().padStart(2,"0"),i=e.getHours(),o=(i%12||12).toString().padStart(2,"0"),r,d={task:t,year:n,date:a,month:s,hour:o,amPm:i<12?"am":"pm",minutes:e.getMinutes().toString().padStart(2,"0"),status:"",timing:e};createNotification(d)&&(tasks.push(d),renderTask(taskCount=tasks.length-1,tasks),addEventListenerToDoneBtn(document.querySelector(`#done-btn${taskCount}`)),addEventListenerToDeleteBtn(document.querySelector(`#delete-btn${taskCount}`)),localStorage.setItem("tasks",JSON.stringify(tasks)),console.log(e-new Date))}}),bellBtn.addEventListener("click",t=>{"granted"!==Notification.permission&&"denied"!==Notification.permission?Notification.requestPermission().then(t=>{}):"granted"===Notification.permission?alert("Notifications are enabled already."):alert("Cannot send notifications since you have denied the permission to send notifications.")}),initialization();