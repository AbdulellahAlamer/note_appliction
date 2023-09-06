const api_data = async function () {
  const fdata = await fetch("/api/v1/users/all");
  const data = await fdata.json();
  console.log(data);
  return data;
};
api_data();

const card =
  '<li class="note"><div class="details"><p>today is 15 auguest</p><span>tomorrow is my physics final and in 17 aug my ics final</span></div><div class="bottom-content"><span>Tue Aug 15 2023 15</span><div class="settings"><i class="uil uil-ellipsis-h"><ul class="menu"><li><i class="uil uil-pen"></i>Edit</li><li class="dele" data-id="64db6c98f5d6bd4137452159"><i class="uil uil-trash"></i>Delete</li></ul></i></div></div></li>';
document
  .querySelector(".wrapper")
  .insertAdjacentHTML("afterbegin", "<h2>hello</h2>");
// const addBox = document.querySelector(".add-box"),
//   popupBox = document.querySelector(".popup-box");

document.querySelectorAll(".uil-ellipsis-h").forEach((el) =>
  el.addEventListener("click", function (e) {
    e.preventDefault();
    showMenu(el);
  })
);

function showMenu(elem) {
  // plug the apo delete with the button delete
  elem.parentElement.classList.add("show");

  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
      console.log("the button has been clicked");
    }
  });
}

function logoutButton() {
  fetch("api/v1/users/logout");
  window.location.assign("/");
}
