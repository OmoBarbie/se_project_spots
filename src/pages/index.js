import "./index.css";
import {
  enableValidation,
  settings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";

import Api from "../utils/Api.js";

// const initialCards = [
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Golden Gate Bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "8e7852c8-ce7f-49fe-b7e0-28564552bf76",
    "Content-Type": "application/json",
  },
});

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const avatarModalBtn = document.querySelector(".profile__avatar-btn");

//3. Destructure the second item in the callback of the .then()
api
  .getAppInfo()
  .then(([cards, user]) => {
    cards.forEach((item) => {
      const cardElement = getcardElement(item);
      cardsList.prepend(cardElement);
    });

    setUserData(user);
  })

  .catch(console.error);

// profile elements
const profileEditButton = document.querySelector(".profile__edit-btn");
const profileAvatar = document.querySelector(".profile__avatar");

// form elements
const editProfileModal = document.querySelector("#edit-modal");
const editFormElement = document.forms["edit-profile"];
const editButtonEl = editFormElement.querySelector(".modal__submit-btn");
const editProfileModalClosedBtn = document.querySelector(".modal__close-btn");
const editModalNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);

const editModalDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

// modal submit elements
const cardSubmitModal = document.querySelector("#add-card-modal");
const cardSubmitElement = cardSubmitModal.querySelector(".modal__submit-btn");
const cardFormElement = document.forms["new-post"];
const cardCloseBtn = cardSubmitModal.querySelector(".modal__close-btn");
const cardNameInput = cardSubmitModal.querySelector("#add-card-name-input");
const cardLinkInput = cardSubmitModal.querySelector("#add-card-link-input");
// avatar form elements
const avatarModal = document.querySelector("#avatar-modal");
const avatarSubmitModal = document.querySelector("#avatar-modal");
const avatarSubmitElement =
  avatarSubmitModal.querySelector(".modal__submit-btn");
const avatarFormElement = avatarModal.querySelector("#edit-avatar-form");
const avatarCloseBtn = avatarSubmitModal.querySelector(".modal__close-btn");
const avatarLinkInput = avatarSubmitModal.querySelector(
  "#profile-avatar-input"
);

// delete form elements
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");
const deleteModalCloseBtn = deleteModal.querySelector(".modal__close-btn");
const deleteModalCancelBtn = deleteModal.querySelector(
  ".modal__submit-btn_cancel"
);

// select the modal
const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = document.querySelector(".modal__image");
const previewModalCaptionEl = document.querySelector(".modal__caption");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");

// card related elements
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

let selectedCard;
let selectedCardId;

function handleDeleteSumbit(evt) {
  evt.preventDefault();
  const button = evt.target.querySelector(".modal__submit-btn_delete");
  button.textContent = "deleting...";
  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => (button.textContent = "delete"));
}

function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(deleteModal);
}

// what is the event
// and what do I want to happen which mean use or call teh our function we created

function handleLike(likeButton, cardData) {
  const isLiked = likeButton.classList.contains("card__like-btn_liked");
  console.log("Is card liked", isLiked);
  // make a request to like/unlike a card
  api
    .changeLikeStatus(cardData._id, isLiked)
    .then(() => {
      // likes the card visually
      likeButton.classList.toggle("card__like-btn_liked");
    })
    .catch((err) => {
      console.error(err);
      alert("Could not like/unlike card");
    });

  // send a request to the API (call changeCardLike)
  // then -> change the like status (toggle the class)
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const activeModal = document.querySelector(".modal_opened");
    console.log("escape clicked");
    closeModal(activeModal);
  }
}

function openModal(modal) {
  console.log(modal);
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

editProfileModal.addEventListener("mousedown", (evt) => {
  if (evt.target.classList.contains("modal")) {
    closeModal(editProfileModal);
  }
});

avatarModal.addEventListener("mousedown", (evt) => {
  if (evt.target.classList.contains("modal")) {
    closeModal(avatarModal);
  }
});

cardSubmitModal.addEventListener("mousedown", (evt) => {
  if (evt.target.classList.contains("modal")) {
    closeModal(cardSubmitModal);
  }
});

previewModal.addEventListener("mousedown", (evt) => {
  if (evt.target.classList.contains("modal")) {
    closeModal(previewModal);
  }
});

function setUserData(data) {
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  profileAvatar.src = data.avatar;
}

function handleEditFormSubmit(evt) {
  console.log("submit it");
  evt.preventDefault();
  editButtonEl.textContent = "Loading...";

  // make a request to update the userinfo on the server
  api
    .editUserInfo({
      name: editModalNameInput.value,
      about: editModalDescriptionInput.value,
    })
    .then((data) => {
      // update the user info locally (visually)
      setUserData(data);
      closeModal(editProfileModal);
    })
    .catch((err) => {
      alert("Could not edit user info");
      console.error(err);
    })

    .finally(() => {
      editButtonEl.textContent = "Save";
    });
}

const closeBtns = document.querySelectorAll(
  ".modal__close-btn, .modal__submit-btn_cancel"
);
closeBtns.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileTitle.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;

  resetValidation(editFormElement, settings);
  openModal(editProfileModal);
});

const addCardButton = document.querySelector(".profile__add-btn");
addCardButton.addEventListener("click", () => {
  openModal(cardSubmitModal);
});

avatarModalBtn.addEventListener("click", () => {
  openModal(avatarSubmitModal);
});
// TODO - Don't forget form validation
// TODO - Set up close button listener

editFormElement.addEventListener("submit", handleEditFormSubmit);
cardFormElement.addEventListener("submit", handleAddCardFormSubmit);
avatarFormElement.addEventListener("submit", handleAvatarSumbit);

function getcardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  // TODO - If the card is liked, set the active class on the card

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  // Show whether card is liked or not

  if (data.isLiked) {
    cardLikeBtn.classList.add("card__like-btn_liked");
  }

  cardLikeBtn.addEventListener("click", (evt) => {
    handleLike(cardLikeBtn, data); // Use API to update the card on the server
    console.log("Card Liked");
    //cardLikeBtn.classList.toggle("card__like-btn_liked"); // Update teh UI
  });

  cardDeleteBtn.addEventListener("click", (evt) =>
    handleDeleteCard(cardElement, data)
  );

  deleteForm.addEventListener("submit", (evt) => handleDeleteSumbit(evt));

  // deleteBtn.addEventListener("submit", handleDeleteSumbit(evt) =>
  //   handleDeleteCard(cardElement, data)
  // );

  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalCaptionEl.textContent = data.name;
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
  });

  // add other necesssary elements

  return cardElement;
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const inputValues = { name: cardNameInput.value, link: cardLinkInput.value };
  cardSubmitElement.textContent = "Loading...";

  api
    .addCard(inputValues)
    .then((res) => {
      const cardElement = getcardElement(res);
      cardsList.prepend(cardElement);
      closeModal(cardSubmitModal);
      evt.target.reset();
      disableButton(cardSubmitElement, settings);
    })
    .catch((error) => {
      console.log(error);
    })

    .finally(() => {
      cardSubmitElement.textContent = "Save";
    });
}

function handleAvatarSumbit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";

  const inputValues = { avatar: avatarLinkInput.value };

  // TODO - Call api, editavataruserInfo

  // TODO - Prevent behavior
  console.log(avatarLinkInput.value);
  api
    .editAvatarInfo(inputValues)
    .then((data) => {
      console.log(data.avatar);
      setUserData(data);
      closeModal(avatarModal);
      evt.target.reset();
      disableButton(submitBtn, settings);
    })

    .catch(console.error)
    .finally(() => {
      submitBtn.textContent = "Save";
    });
}

enableValidation(settings);
