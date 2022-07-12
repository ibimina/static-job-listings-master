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
// get the container where the elements will be pasted
//create variable to store the created element for the skills and and tools data
//give the element a class name to enable styleing in the css file
//apppend the create element to its parent element the call the function in the async function
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


//to paste the click skills/tools/level/position in the filter box
// get the filterbox container from the html page
// get the file boxfrom the html page
//create a function that displays the filter box any time a button is clicked
//create a function that create filter skill box any time a button is clicked
//call the function that filters the job list to display only the job that contains clicked button

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
//when listcontainer is clicked run the pasteClickedSkill
listContainer.addEventListener("click", pasteClickedSkill);

//create a function that loops through the skills in the filter box container
//if the job lists skills does not includes the searched skill add a filtered class to it
const filterJobList = () => {
  let search = document.querySelectorAll(".search");

  search.forEach((element) => {
    Array.from(listContainer.children)

      .filter((bb) => !bb.textContent.includes(element.textContent))
      .forEach((bb) => bb.classList.add("filtered"));
  });
};

//create a function that removes the search skill from the filter box when the close image is click
// and when the clear button is click it reamoves all the search skills and close the filter
// and when there is no search skill the filterbox is closed automaticalliy
function removeSearchedSkill(e) {

    try {
      let searchSkill = e.target.parentElement;
      if (e.target.matches("img")) {
        searchSkill.remove();

        let search = document.querySelectorAll(".search");
    

        search.forEach((element) => {
          console.log(element.textContent);
          Array.from(listContainer.children)

            //filter the list of job when a skill is removed from the filterbox if the searched job is set to display none remove
            .filter((joblist) => joblist.textContent.includes(element.textContent))
            .forEach((joblist) => joblist.classList.remove("filtered"));
        });
      } else if (e.target.matches("p")) {
        list.remove();
      }
      if (!filterBox.hasChildNodes()) {
        filterBoxwrapper.style.display = "none";
        Array.from(listContainer.children).forEach((joblist) =>
          .classList.remove("filtered")
        );
      }
    } catch (error) {
      console.log("error");
    }

}

 filterBoxwrapper.addEventListener("click", removeSearchedSkill);