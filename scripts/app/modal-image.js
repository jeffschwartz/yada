import { elRemoveClassName } from "./generic";

/**
 * Modal Image
 */

const register = (image, options) => {
    let elImage;
    let elViewer;
    let elModalImageContent;
    let elModalImageCaption;
    let imageSource;
    let imageCaption;
    elImage = typeof image === "string" && document.getElementById(image) || image;
    if (!elImage) {
        console.log("Modal-Image Error - expected image to be either an element or element id");
        return;
    }
    if (elImage.modalImage) {
        elImage.removeEventListener("click", imageSourceClickHandler, false);
    }
    imageSource = elImage.src;
    if (!imageSource) {
        console.log(`Modal-Image Error - expected source image to have "src" attribute!`);
        return;
    }
    imageCaption = elImage.alt; // optional
    elViewer = document.getElementsByClassName("modal-image")[0];
    if (!elViewer) {
        console.log("Modal-Image Error - expected to find image viewer!");
        return;
    }
    elModalImageContent = elViewer.getElementsByClassName("modal-image__content")[0];
    if (!elModalImageContent) {
        console.log(`Modal-Image-Viewer Error - expected to find element with class "modal-image__content!`);
        return;
    }
    elModalImageCaption = elViewer.getElementsByClassName("modal-image__caption")[0];
    if (!elModalImageCaption) {
        console.log(`Modal-Image-Viewer Error - expected to find element with class "modal-image__caption!`);
        return;
    }
    elImage.modalImage = {
        elViewer,
        elModalImageContent,
        elModalImageCaption,
        imageSource,
        imageCaption,
        imageSourceClickHandler,
        modalImageContentClickHandler: modalImageContentClickHandler.bind(elImage)
    };
    elImage.addEventListener("click", imageSourceClickHandler, false);
    return elImage;
};

let imageSourceClickHandler = function (e) {
    this.modalImage.elModalImageContent.src = this.modalImage.imageSource;
    this.modalImage.elModalImageCaption.innerHTML = this.modalImage.imageCaption;
    this.modalImage.elViewer.className += " modal-image--visible";
    this.modalImage.elViewer.addEventListener("click", this.modalImage.modalImageContentClickHandler, false);
};

let modalImageContentClickHandler = function (e) {
    elRemoveClassName(this.modalImage.elViewer, "modal-image--visible");
    this.modalImage.elViewer.removeEventListener("click", this.modalImage.modalImageContentClickHandler, false);
};

export default register;