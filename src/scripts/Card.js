class Card {
  constructor({ name, link }) {
    this._name = name;
    this._link = link;
  }

  getCardElement() {
    const cardElement = cardTemplate.content
      .querySelector(".card")
      .cloneNode(true);

    const cardNameEl = cardElement.querySelector(".card__title");
    const cardImageEl = cardElement.querySelector(".card__image");
    const cardLikeBtn = cardElement.querySelector(".card__like-btn");
    const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

    cardNameEl.textContent = this._name;
    cardImageEl.src = this._link;
    cardImageEl.alt = this._name;

    return cardElement;
  }

  setEventListeners() {
    cardLikeBtn.addEventListener("click", (evt) => {
      handleLike(cardElement, data);
      cardLikeBtn.classList.toggle("card__like-btn_liked");
    });

    cardDeleteBtn.addEventListener("click", (evt) =>
      handleDeleteCard(cardElement, data)
    );

    // deleteBtn.addEventListener("submit", handleDeleteSumbit(evt) =>
    //   handleDeleteCard(cardElement, data)
    // );

    cardImageEl.addEventListener("click", () => {
      openModal(previewModal);
      previewModalCaptionEl.textContent = data.name;
      previewModalImageEl.src = data.link;
      previewModalImageEl.alt = data.name;
    });
  }
}
