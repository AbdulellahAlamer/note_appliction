const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const popupTitle = popupBox.querySelector("header p");
const closeIcon = popupBox.querySelector("header i");
const titleTag = popupBox.querySelector("input");
const descTag = popupBox.querySelector("textarea");
const addBtn = popupBox.querySelector("button");

let isUpdate = false;
let updateId;

addBox.addEventListener("click", () => {
  popupTitle.innerText = "Add a new Note";
  addBtn.innerText = "Add Note";
  popupBox.classList.add("show");
  document.querySelector("body").style.overflow = "hidden";
  if (window.innerWidth > 660) titleTag.focus();
});

closeIcon.addEventListener("click", () => {
  isUpdate = false;
  titleTag.value = descTag.value = "";
  popupBox.classList.remove("show");
  document.querySelector("body").style.overflow = "auto";
});

const sendNote = async function (not) {
  const NoteData = { title: not.title, Description: not.description };
  console.log(NoteData);
  const response = await fetch("api/v1/notes", {
    method: "POST",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(NoteData),
  });
  const data = await response.json();
  // console.log(data);
  if (data.status === "sucsess") {
    window.location.reload();
  }
};
function showNotes(noteInfo) {
  let notes = [noteInfo];
  // console.log(noteInfo);
  sendNote(noteInfo);
  // document.querySelectorAll(".note").forEach((li) => li.remove());
  notes.forEach((note, id) => {
    let filterDesc = note.description.replaceAll("\n", "<br/>");
    let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${filterDesc}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${id}, '${note.title}', '${filterDesc}')"><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick="deleteNote(${id})"><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
  });
}
function showMenu(elem) {
  // plug the apo delete with the button delete
  elem.parentElement.classList.add("show");
  // document.querySelector(".dele").addEventListener("click", deletingNote);

  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}
function deleteNote(el) {
  const note_id = el.dataset.id;
  let confirmDel = confirm("Are you sure you want to delete this note?");
  if (!confirmDel) return;
  fetch(`api/v1/notes/${note_id}`, {
    method: "DELETE",
  }).then((data) => {
    window.location.reload();
  });
}
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let title = titleTag.value.trim(),
    description = descTag.value.trim();

  if (title || description) {
    let noteInfo = { title, description };
    showNotes(noteInfo);
    closeIcon.click();
  }
});

// this is for logout buuton
function logoutButton() {
  fetch("api/v1/users/logout");
  window.location.assign("/");
}
