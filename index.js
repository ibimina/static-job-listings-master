//get the container when the job list will be pasted in
const listContainer = document.querySelector("ul");

// get the html data from the json file and append it to the webpage
async function getData() {
  let response = await fetch("./data.json");
  let data = await response.json();

  data.forEach((element) => {
    if (element.new && element.featured) {
      listContainer.innerHTML += `<li id="one${element.id}" class="job"><div class="developer-details">
    <img src="${element.logo}" alt="company's avatar" class="avatar"/>
 <div class="details">
   
    <div class="company-wrap">
    <h1 class="company">${element.company}</h1>
     <div class="new-wrap">
    <p class="new">new!</p>
    <p class="featured"> featured</p>
    </div>  
    </div>

    <div class ="position-wrap">
    <p class="position"> ${element.position}</p>
    </div>

   <div class ="contract-wrap">
    <p class="posted-at"> ${element.postedAt}</p>
    <p class="contract">${element.contract}</p>
    <p class="location">. ${element.location}</p>
    </div>


  </div>
 </div> 
    <div class="developer-skills">
    <button class="role"> ${element.role}</button>
    <button class="level"> ${element.level}</button>
    </div>
    </li>`;
      listSkills(element);
    } else if (element.new && !element.featured) {
      listContainer.innerHTML += `<li id="${element.id}" class="job"><div class="developer-details">
   
     <img src="${element.logo}" alt="company's avatar" class="avatar"/>
    <div class="details">
<div class="company-wrap">
    <h1 class="company">${element.company}</h1>
   <div class="new-wrap">
    <p class="new">new!</p>
    </div>
</div>
<div class ="position-wrap">
    <p class="position"> ${element.position}</p>
</div>
<div class="contract-wrap">
    <p class="posted-at"> ${element.postedAt}</p>
    <p class="contract">${element.contract}</p>
    <p class="location">${element.location}</p>
   </div>
    </div>

    </div>
    <div class="developer-skills">
    <button class="role"> ${element.role}</button>
    <button class="level"> ${element.level}</button>
    
    </div>
    </li>`;
      listSkills(element);
    } else {
      listContainer.innerHTML += `<li id="${element.id}" class="job"><div class="developer-details">
    <img src="${element.logo}" alt="company's avatar" class="avatar"/>
    <div class="details">
<div class="company-wrap">  
    <h1 class="company">${element.company}</h1>
    
    </div>
    <div class="position-wrap"><p class="position"> ${element.position}</p></div>
    <div class="contract-wrap">
    <p class="posted-at"> ${element.postedAt}</p>
 
    <p class="contract"> 
  ${element.contract} 
     </p>
    <p class="location"> ${element.location}</p>

    </div>
  </div>
    </div>
    <div class="developer-skills">
    <button class="role"> ${element.role}</button>
    <button class="level"> ${element.level}</button>
    </div>
    </li>`;
      listSkills(element);
    }
  });
}
//deconstruct the skills and tools array and paste inthe web page
function listSkills(element) {
  const lis = document.querySelectorAll(".developer-skills");
  let skill, tool;
  for (let i = 0; i < element.languages.length; i++) {
    skill = document.createElement("button");
    skill.className = "skills";
    skill.textContent = element.languages[i];

    lis.forEach((element) => {
      element.appendChild(skill);
    });
  }
  for (let i = 0; i < element.tools.length; i++) {
    tool = document.createElement("button");
    tool.className = "tools";
    tool.textContent = element.tools[i];

    lis.forEach((element) => {
      element.appendChild(tool);
    });
  }
}
//call the function to get the webpage running
getData();

const filterBoxwrapper = document.querySelector(".filter");
const filterBox = document.querySelector(".filter-value");

let list;



function pasteClickedSkill(e) {
  list = document.createElement("li");
  let closeSearchSkill = document.createElement("img");
  let searchSkill = document.createElement("p");

  let skill = e.target;
  let skillValue = e.target.textContent;

  if (skill.matches("button")) {
    searchSkill.textContent = skillValue;
    searchSkill.setAttribute("class", "search");
    closeSearchSkill.src = "./images/icon-remove.svg";
    list.appendChild(searchSkill);
    list.appendChild(closeSearchSkill);

    filterBox.appendChild(list);
    filterBoxwrapper.style.display = "flex";
  }
  filterJobList();
}

listContainer.addEventListener("click", pasteClickedSkill);

const filterJobList = () => {
  let search = document.querySelectorAll(".search");

  search.forEach((element) => {
    Array.from(listContainer.children)

      .filter((bb) => !bb.textContent.includes(element.textContent))
      .forEach((bb) => bb.classList.add("filtered"));
  });
};

function removeSearchedSkill(e) {
//  filterBoxwrapper.addEventListener("click", (e) => {
    try {
      let searchSkill = e.target.parentElement;
      if (e.target.matches("img")) {
        searchSkill.remove();

        let search = document.querySelectorAll(".search");
    

        search.forEach((element) => {
          console.log(element.textContent);
          Array.from(listContainer.children)

            //filter the list of job when a skill is removed from the filterbox if the searched job is set to display none remove
            .filter((bb) => bb.textContent.includes(element.textContent))
            .forEach((bb) => bb.classList.remove("filtered"));
        });
      } else if (e.target.matches("p")) {
        list.remove();
      }
      if (!filterBox.hasChildNodes()) {
        filterBoxwrapper.style.display = "none";
        Array.from(listContainer.children).forEach((bb) =>
          bb.classList.remove("filtered")
        );
      }
    } catch (error) {
      console.log("error");
    }
 // });
}
//removeSearchedSkill();
 filterBoxwrapper.addEventListener("click", removeSearchedSkill);