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
];

// profile elements
const profileEditButton = document.querySelector(".profile__edit-btn");
const profileAddButton = document.querySelector(".profile__add-btn");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// form elements
const editProfileModal = document.querySelector("#edit-modal");
const editFormElement = editProfileModal.querySelector(".modal__form");
const editProfileModalClosedBtn = document.querySelector(".modal__closed-btn");
const editModalNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);

const editModalDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

// modal submit elements
const cardSubmitModal = document.querySelector("#add-card-modal");
const cardFormElement = cardSubmitModal.querySelector(".modal__form");
const cardSubmitCloseBtn = cardSubmitModal.querySelector(".modal__closed-btn");
const cardNameInput = cardSubmitModal.querySelector("#add-card-name-input");
const cardLinkInput = cardSubmitModal.querySelector("#add-card-link-input");

// card related elements
const cardTemlate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function getcardElement(data) {
  const cardElement = cardTemlate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  cardLikeBtn.addEventListener("click", () => {
   cardLikeBtn.classList.toggle("card__like-btn_liked");
  )};

  return cardElement;
}

function openModal(updateModal) {
  updateModal.classList.add("modal_opened");
}

function closeModal(updateModal) {
  updateModal.classList.remove("modal_opened");
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(editProfileModal);
}

function handleAddCardFormSumbit(evt) {
  evt.preventDefault();
  const inputValues = { name: cardNameInput.value, link: cardLinkInput.value };
  const cardElement = getcardElement(inputValues);
  cardsList.prepend(cardElement);
  closeModal(cardSubmitModal);
}

profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileTitle.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  openModal(editProfileModal);
});

editProfileModalClosedBtn.addEventListener("click", () => {
  closeModal(editProfileModal);
});

cardSubmitCloseBtn.addEventListener("click", () => {
  closeModal(cardSubmitModal);
});

const addCardButton = document.querySelector(".profile__add-btn");
addCardButton.addEventListener("click", () => {
  openModal(cardSubmitModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);
cardFormElement.addEventListener("submit", handleAddCardFormSumbit);

initialCards.forEach((item) => {
  const cardElement = getcardElement(item);
  cardsList.prepend(cardElement);
});
