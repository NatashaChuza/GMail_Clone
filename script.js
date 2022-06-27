
//globalstate 
document.getElementById("menu").addEventListener("click", ()=>{
    let content = document.querySelector(".content");
    if( content == null){
       let content = document.querySelector(".content-min")
       content.classList.remove("content-min")
       content.classList.add("content")
        document
          .querySelectorAll(".minimise")
          .forEach((el) => el.classList.remove("invisible"))
          let btn = document.querySelector(".btn-min");
          btn.classList.remove("btn-min");
          btn.classList.add("btn");

    }else{
       content.classList.remove("content")
       content.classList.add("content-min")
       document.querySelectorAll(".minimise").forEach( el => el.classList.add("invisible"))
       let btn = document.querySelector(".btn")
       btn.classList.remove("btn")
       btn.classList.add("btn-min")
    }    
})

genString = (length) => {
    letters = "abacdefghijklmnopqrstuvwxyz"
    let stringArray = []
    for( let i = 0; i < length; i++ ){
        let index = Math.floor(Math.random() * 26)
        stringArray.push(letters[index])
    }
    return stringArray.join("")
}

genMessage = () => {
    let message = []
    for( let i = 0; i < 100; i++){
        const wordLength = Math.floor(Math.random() * 10) + 1;
        const word = genString(wordLength)
        message.push(word)
    }
    return message.join(" ")
}

genMail = () => {
    let mail = {}
    let latest = JSON.parse(sessionStorage.getItem("latestMailCount"));
    const firstName = genString(6);
    const lastName = genString(6);
    const message = genMessage();
    mail["sender"] = `${firstName} ${lastName}`;
    mail["message"] = message;
    mail["time_sent"] = "4:35 PM";
    mail["status"] = "unread";
    mail["id"] = latest;
    latest++;
    sessionStorage.setItem("latestMailCount", latest)
    return mail;
}

getMails = () => {
    let emails = JSON.parse(sessionStorage.getItem("emails"))
    for( let i = 0; i < 5; i++){
         const mail = genMail()
         emails.push(mail)
    }
    sessionStorage.setItem("emails", JSON.stringify(emails))
}
closeMessage = ( mailItem) => {
    mailItem.addEventListener("click",()=>{    
          let parent = mailItem.parentElement.parentElement;
          parent.classList.add("invisible")
          document.querySelector(".mails").classList.remove("invisible")
    })   
}

openMessage = ( mailItem, email) => {
        
        mailItem.addEventListener("click", ()=>{
        let emails = JSON.parse(sessionStorage.getItem("emails"))
        let index = email.id;
        emails[index].status = "read"
        sessionStorage.setItem("emails", JSON.stringify(emails))

        mailItem.classList.add("read-mail")

        let uppermostParent = document.querySelector(".mails_container")
        document.querySelector(".mails").classList.add("invisible")
        let mailContainer = document.createElement("div")
        mailContainer.classList.add("opened-mail", "flex", "column")
        let senderContainer = document.createElement("div")
        senderContainer.classList.add("flex","one","center-align")
        let backBtn = document.createElement("i")
        backBtn.classList.add("pointer","fa-solid","fa-arrow-left","grey","padding-2")
        closeMessage(backBtn)
        senderContainer.appendChild(backBtn)
        let sender = document.createElement("h3")
        sender.innerHTML = mailItem.children[1].children[0].innerHTML;
        senderContainer.appendChild(sender)
        mailContainer.appendChild(senderContainer)
        let messageContainer = document.createElement("div")
        messageContainer.classList.add("flex","five","column", "border", "padding-5")
         let time = document.createElement("p");
         time.classList.add("time")
         time.innerHTML = mailItem.children[3].children[0].innerHTML;
         messageContainer.appendChild(time);
        let mail = document.createElement("p")
        mail.innerHTML = mailItem.children[2].children[0].innerHTML;
        messageContainer.appendChild(mail)
       
        mailContainer.appendChild(messageContainer)
        let btnContainer = document.createElement("div")
        btnContainer.classList.add("flex","two","center-align",);
        let replyBtn = document.createElement("button")
        replyBtn.classList.add("btns","pointer");
        let replyIcon = document.createElement("i")
        replyIcon.classList.add("fa-solid", "fa-reply", "grey")
        replyBtn.appendChild(replyIcon)
        let reply = document.createElement("p");
        reply.innerHTML = "reply"
        reply.classList.add("grey")
        replyBtn.appendChild(reply)
       
        let forwardBtn = document.createElement("button")
        forwardBtn.classList.add("btns","pointer");
        let forwardIcon = document.createElement("i");
        forwardIcon.classList.add("fa-solid", "fa-share", "grey");
        let forward = document.createElement("p");
        forward.innerHTML = "forward";
        forward.classList.add("grey");
        forwardBtn.appendChild(forward);
        forwardBtn.appendChild(forwardIcon);
        btnContainer.appendChild(replyBtn)
        btnContainer.appendChild(forwardBtn)
        mailContainer.appendChild(btnContainer)
        uppermostParent.appendChild(mailContainer)
    })
}


loadMail = (startIndex, stopIndex) => {
    
    let mails = document.querySelector(".emails");
    for( let i = startIndex;  i < stopIndex; i++){
        let emails = JSON.parse(sessionStorage.getItem("emails"));
        let mail = emails[i]
        let mailItem = document.createElement("div");
        if(mail.status == "read"){
            mailItem.classList.add("read-mail")
        }
        mailItem.classList.add("flex", "mail-item","pointer");
        let btnContainer = document.createElement("div");
        btnContainer.classList.add(
          "flex",
          "one",
          "center-align",
          "evenly-justify"
        );
        let readBtn = document.createElement("i");
        readBtn.classList.add("fa-solid", "fa-square", "grey");
        btnContainer.appendChild(readBtn);
        let starBtn = document.createElement("i");
        starBtn.classList.add("fa-solid", "fa-star", "grey");
        btnContainer.appendChild(starBtn);
        let importantBtn = document.createElement("i");
        importantBtn.classList.add("fa-solid", "fa-bookmark", "grey");
        btnContainer.appendChild(importantBtn);
        let senderContainer = document.createElement("div");
        senderContainer.classList.add("flex", "one", "center-align");
        let sender = document.createElement("p");
        sender.innerHTML = mail.sender;
        senderContainer.appendChild(sender);
        let msgContainer = document.createElement("div");
        msgContainer.classList.add("flex", "five", "center-align","msg");
        let msg = document.createElement("p");
        msg.innerHTML = mail.message;
        msgContainer.appendChild(msg);
        let timeContainer = document.createElement("div");
        timeContainer.classList.add(
          "one",
          "time",
          "flex",
          "center-justify",
          "center-align"
        );
        let time = document.createElement("p");
        time.innerHTML = mail.time_sent;
        timeContainer.appendChild(time);
        mailItem.appendChild(btnContainer);
        mailItem.appendChild(senderContainer);
        mailItem.appendChild(msgContainer);
        mailItem.appendChild(timeContainer);
        openMessage(mailItem,mail)

        mails.prepend(mailItem);
    }
}

    document.getElementById("send-btn").addEventListener("click", ()=>{
        const reciepient = document.getElementById("reciepient")
        const subject = document.getElementById("subject")
        const text = document.getElementById("text")

        if( reciepient.value == "" || text.value ==""){
             alert("you cannot send mail without a reciepient or message")
        }else{
             let mail = {
               reciepient: reciepient.value,
               subject: subject.value,
               text: text.value
             }
             console.log(mail)
        }
      

    })

    document.getElementById("compose").addEventListener("click",()=>{
        document.querySelector(".compose-email").classList.remove("make-invisible")
    })
    document.getElementById("remove-compose").addEventListener("click", ()=>{
        document
          .querySelector(".compose-email")
          .classList.add("make-invisible");
    })

window.addEventListener("load", ()=>{
  //get all mail the latest emails;
   //sessionStorage.clear()
  if(sessionStorage.getItem("latestMailCount") === null){
        sessionStorage.setItem("latestMailCount", 0)
  }
  if(sessionStorage.getItem("emails") === null){
      sessionStorage.setItem("emails",JSON.stringify([]))
  }
  getMails();
  let mails = JSON.parse(sessionStorage.getItem("emails"))
  const lastIndex = mails.length;
  loadMail(0, lastIndex);
})

getLatestMail = () => {
    //get only latest emails;
    const startIndex = JSON.parse(sessionStorage.getItem("latestMailCount"));
    getMails();
    let mails = JSON.parse(sessionStorage.getItem("emails"));
    const stopIndex = mails.length;
    loadMail(startIndex,stopIndex)
}

setInterval(()=>{
    getLatestMail()
},30000)