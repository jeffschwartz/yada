import { elRemoveClassName } from "./generic";

/**
 * Modal Image
 */

const register = (image, options) => {
    let elImage = typeof image === "string" && document.getElementById(image) || image;
    let elViewer = document.getElementsByClassName("modal-image")[0];
    let api = elImage.modalImage = {
        elViewer,
        elModalImageContent: elViewer.getElementsByClassName("modal-image__content")[0],
        elModalImageCaption: elViewer.getElementsByClassName("modal-image__caption")[0],
        imageSource: elImage.src,
        imageCaption: elImage.alt,
        imageSourceClickHandler,
        modalImageContentClickHandler: modalImageContentClickHandler.bind(elImage)
    };
    if (!elImage) {
        console.log("Modal-Image Error - expected to find source image!");
        return;
    }
    if (!api.imageSource) {
        console.log("Modal-Image Error - expected source image to have a \"src\" attribute!");
        return;
    }
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