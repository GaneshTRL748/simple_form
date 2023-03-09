let head;
let update;
class Node{
    empid;
    name;
    dob;
    phoneno;
    next;
    constructor(data)
    {
        this.empid=data[0]
        this.name=data[1];
        this.dob=data[2];
        this.phoneno=data[3];
    }
}
 let submit=()=>
{
    let data=getdata();
    if(validatedata(data)&&update==null)
    {
        document.getElementById('error_no').innerHTML='';
        document.getElementById('error_name').innerHTML='';
        insertdata(data);
        reset();
        display();
    }
    else if(validatedata(data))
    {
        document.getElementById('error_no').innerHTML='';
        document.getElementById('error_name').innerHTML='';
        updatedata(data);
        display();
        reset();
    }
    else{
        console.log("OOPS!!");
    }
}
let getdata=()=>{
    let id=document.getElementById('empid').value;
    let name=document.getElementById('name').value;
    let dob=document.getElementById("dob").value;
    let phoneno=document.getElementById('phoneno').value;
    let data=[id,name,dob,phoneno];
    return data;
}
let validatedata=(data)=>
{
    let flag=0;
    if(data[0]==''||data[1]==''||data[2]==''||data[3]=='')
    {
        alert('Fill all the fields');
        flag=1;
    }
    if(data[3].length>10||data[3].length<10)
    {
        document.getElementById('error_no').innerHTML='please enter the valid mobile number';
        flag=1;
    }
    if(!(/^\d+$/.test(data[3])))
    {
        document.getElementById('error_no').innerHTML='please enter the valid mobile number';
        flag=1;
    }
     if(data[1].length<6)
    {
        document.getElementById('error_name').innerHTML='name should contain minimum six character';
        flag=1;
    }
   return (flag==0);
}
let display=()=>
{  
    resettable();
    let temp=head;
    let len=document.getElementById('table').rows[0].cells.length;
    while(temp!=null)
    {
        let row=table.insertRow();
        let data=getdataarray(temp);
       for( let i=0;i<len;i++)
       {
         if (i<len-1)
         {
            row.insertCell(i).innerHTML=data[i];
         }
         else{
         row.insertCell(i).innerHTML=`<button onclick="editdata(this)">edit</button> <button onclick="deletedata(this)">delete</button>`;
         }
       }
       temp=temp.next;
     }  
     
} 
let getdataarray=(temp)=>
{
    return [temp.empid,temp.name,temp.dob,temp.phoneno];
}
 let insertdata=(data)=>
{
    if(head==null)
    {
        head=new Node(data);
        head.next=null;
    }
    else{
         let temp=new Node(data);
         temp.next=head;
         head=temp;
    }
}
let deletedata=(id)=>
{
    let check=confirm("Are sure want to delete this row!!");
    if(check==true){
   let emp=id.parentElement.parentElement.cells[0].innerHTML;
    let temp=head;
    let temp1;
    while(temp!=null)
    {
        if(emp==temp.empid)
        {
            break;
        }
        else{
            temp1=temp;
            temp=temp.next;
        }
    }
    if (temp==head) 
    {head=temp.next;
    }
    else{
        temp1.next=temp1.next.next;
    }
    display();
}
}
let editdata=(id)=>
{
   let emp=id.parentElement.parentElement.cells[0].innerHTML;
      let  temp=head;
    while(temp!=null)
    {
        if(emp==temp.empid)
        {
            break;
        }
        else{
            temp=temp.next;
        }
    }
    update=temp;
    let data=getdataarray(temp);
    document.getElementById('empid').value=data[0];
    document.getElementById('name').value=data[1];
    document.getElementById('dob').value=data[2];
    document.getElementById('phoneno').value=data[3];
}
let updatedata=(data)=>
{
    update.empid=data[0];
    update.name=data[1];
    update.dob=data[2];
    update.phoneno=data[3];
    update=null;
}
let reset=()=>{
    let input=document.querySelectorAll('input');
    input.forEach(input=> input.value='');
    document.getElementById('error_no').innerHTML='';
        document.getElementById('error_name').innerHTML='';
}
let resettable=()=>{
    let input=document.getElementById('table');
    for(let i=input.rows.length-1;i>=1;i--)
    {
        input.deleteRow(i);
    }
}