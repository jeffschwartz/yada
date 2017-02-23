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
        imageCaption: elImage.alt
    };
    if (!elImage) {
        console.log("Modal-Image Error - expected to find source image!");
        return;
    }
    if (!api.imageSource) {
        console.log("Modal-Image Error - expected source image to have a \"src\" attribute!");
        return;
    }
    elImage.addEventListener("click", imageSourceClickEventHandler, false);
    return elImage;
};

let imageSourceClickEventHandler = function (e) {
    this.modalImage.elModalImageContent.src = this.modalImage.imageSource;
    this.modalImage.elModalImageCaption.innerHTML = this.modalImage.imageCaption;
    this.modalImage.elViewer.className += " modal-image--visible";
    this.modalImage.elViewer.addEventListener("click", modalImageContentClickHandler(this), false);
};

let modalImageContentClickHandler = function (self) {
    return function () {
        elRemoveClassName(self.modalImage.elViewer, "modal-image--visible");
    };
};

export default register;