const containers = document.getElementById("container");
const inputholder = document.getElementById("textholder");
const senderbtn = document.getElementById("sender");
const holder = document.getElementById("containerofmessage");
const deletebtn= document.getElementById("clearbotton");

senderbtn.addEventListener("click",async()=>{
    const text = inputholder.value;
    const postRes = await fetch("http://localhost:4000/message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: text })
        });
        const postResult = await postRes.json();

   const getRes = await fetch("http://localhost:4000/message");
        const data = await getRes.json();

        // আগে থাকা messages clear করা
        holder.innerHTML = "";

        // সব message render করা
        data.map((item, index) => {
            const para = document.createElement("p");
            para.innerHTML = item.message;
            holder.appendChild(para);
        });

})

deletebtn.addEventListener("click",()=>{

    fetch("http://localhost:4000/message", {
    method: "DELETE"
})
.then(res => res.json())
.then(data =>{
    holder.innerHTML="";
} );

})

