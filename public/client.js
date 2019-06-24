
window.onload = function() {
  
  const Form = document.getElementsByTagName('form')[0]; // select form tag..


  Form.onsubmit = checkForm; // when form submit
  Form.skills[13].onchange = () => { // when item 13 is checked
    let pass = !Form.skills[13].checked;
    Form.item.required = !pass;
  }


  function checkForm(e){
    let skills = this.skills;
    for(let i in skills) if(skills[i].checked) return alert('Updated');
    e.preventDefault();
    alert("Please select the tech used to build project");
    skills[0].focus();
    return false;
  }

}