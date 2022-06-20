const add = document.querySelector(".cards .add"),
  mainCard = document.querySelector(".cards"),
  addIcon = document.querySelector(".add .icon"),
  popApp = document.querySelector(".popup-app"),
  closePop = document.querySelector(".header-pop .closebtn"),
  headPop = document.querySelector(".header-pop h4"),
  addBtn = document.querySelector(".popup form button"),
  input = document.querySelector(".popup-app form input"),
  textArea = document.querySelector(".popup-app form textarea"),
  audios = new Audio("audios/suc.mp3"),
  sound = new Audio("audios/327735__distillerystudio__error-04.wav"),
  removeSound = new Audio("audios/remove.wav");

let idEdit,
  isEdit = false;

// create array contain name of months
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "june",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// create new Array
const notes = JSON.parse(localStorage.getItem("noteData") || "[]");
// handle show popup
addIcon.addEventListener("click", () => {
  popApp.classList.add("grid_style");
  headPop.textContent = "اضف ملحوظه جديده";
  addBtn.textContent = "اضف";
  // remove old vlaue
  input.value = "";
  textArea.value = "";
});

// handle close popup
closePop.addEventListener("click", () => {
  popApp.classList.remove("grid_style");
  isEdit = false;
});

// handle show note
addBtn.addEventListener("click", addNote);

function addNote(e) {
  e.preventDefault();
  if (input.value.trim() && textArea.value.trim()) {
    let date = new Date(),
      month = months[date.getMonth()],
      day = date.getDate(),
      year = date.getFullYear();
    let allmonth = month;

    let noteInfo = {
      title: input.value,
      description: textArea.value,
      date: `${allmonth},${day},${year}`,
    };
    if (isEdit) {
      notes[idEdit] = noteInfo;
      isEdit = false;
    } else {
      notes.push(noteInfo);
    }
    // set local storage
    localStorage.setItem("noteData", JSON.stringify(notes));
    // play sound
    audios.play();
    // handl function
    showNote();
    // close popup
    closePop.click();
  } else {
    sound.play();
  }
}

// hndle add show notes

function showNote() {
  document.querySelectorAll(".card").forEach((card) => card.remove());
  if (!notes) return;

  notes.forEach((note, index) => {
    let card = `<div class="card card-style">
    <div class="card-content">
      <h4>${note.title}</h4>
      <p>${note.description}</p>
    </div>
    <div class="card-details">
      <div class="main-date">
        <span>${note.date}</span>
      </div>
      <div class="menu-app">
        <i class="fa-solid fa-ellipsis"></i>
        <ul class="menu">
          <li onclick = "editNote(${index} , '${note.title}' , '${note.description}')">
            <i class="fa-solid fa-pen"></i>
            تعديل
          </li>
          <li onclick = "removeNote(${index})">
            <i class="fa-solid fa-trash"></i>
            حذف
          </li>
        </ul>
      </div>
    </div>
  </div>`;

    add.insertAdjacentHTML("afterend", card);
  });
}

showNote();

// handle remove note

function removeNote(idx) {
  let confirms = confirm("هل تريد حذف الملاحظه");
  if (confirms) {
    notes.splice(idx, 1);
    localStorage.setItem("noteData", JSON.stringify(notes));
    showNote();
    removeSound.play();
  }
}

// handle edit note

function editNote(idnote, title, description) {
  isEdit = true;
  idEdit = idnote;
  addIcon.click();
  headPop.innerText = "تحديث الملاحظه";
  addBtn.innerText = "تحديث";
  input.value = title;
  textArea.value = description;
}
