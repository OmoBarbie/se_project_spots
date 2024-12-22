//TODO - Pass settings object to the validation functions that are called in this file

const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];

// profile elements
const profileEditButton = document.querySelector(".profile__edit-btn");
const profileAddButton = document.querySelector(".profile__add-btn");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// form elements
const editProfileModal = document.querySelector("#edit-modal");
const editFormElement = document.forms["edit-profile"];
const editButtonEl = editFormElement.querySelector(".modal__submit-btn");
const editProfileModalClosedBtn = document.querySelector(".modal__closed-btn");
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
const cardCloseBtn = cardSubmitModal.querySelector(".modal__closed-btn");
const cardNameInput = cardSubmitModal.querySelector("#add-card-name-input");
const cardLinkInput = cardSubmitModal.querySelector("#add-card-link-input");

// select the modal
const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = document.querySelector(".modal__image");
const previewModalCaptionEl = document.querySelector(".modal__caption");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");

// card related elements
const cardTemlate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function handleDeleteCard(evt) {
  evt.target.closest(".card").remove();
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const activeModal = document.querySelector(".modal_opened");
    console.log("escape clicked");
    closeModal(activeModal);
  }
}

function openModal(modal) {
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

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(editProfileModal);
}

profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileTitle.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;

  resetValidation(editFormElement, settings);
  openModal(editProfileModal);
});

editProfileModalClosedBtn.addEventListener("click", () => {
  closeModal(editProfileModal);
});

cardCloseBtn.addEventListener("click", () => {
  closeModal(cardSubmitModal);
});

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

const addCardButton = document.querySelector(".profile__add-btn");
addCardButton.addEventListener("click", () => {
  openModal(cardSubmitModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);
cardFormElement.addEventListener("submit", handleAddCardFormSumbit);

function getcardElement(data) {
  const cardElement = cardTemlate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_liked");
  });

  cardDeleteBtn.addEventListener("click", handleDeleteCard);

  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalCaptionEl.textContent = data.name;
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
  });

  // add other necesssary elements

  return cardElement;
}

function handleAddCardFormSumbit(evt) {
  evt.preventDefault();
  const inputValues = { name: cardNameInput.value, link: cardLinkInput.value };
  const cardElement = getcardElement(inputValues);
  cardsList.prepend(cardElement);
  // clear the form after submission

  closeModal(cardSubmitModal);
  evt.target.reset();
  disableButton(cardSubmitElement, settings);
}

initialCards.forEach((item) => {
  const cardElement = getcardElement(item);
  cardsList.prepend(cardElement);
});
