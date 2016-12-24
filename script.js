(function () {
    let getElById = (id) => document.getElementById(id);

    let wire1 = (radioGroupId, pTag1, pTag2, radioBtn1, radioBtn2) => {
        // get radio button group element
        let grp1El = getElById(radioGroupId);

        // attach radio button group click handler
        // to radio button group element
        grp1El.addEventListener("click", (e) => {
            // get p tag elelements
            let redtextEl = getElById(pTag1);
            let greentextEl = getElById(pTag2);

            // respond to radio button click event
            if (e.target.tagName.toLowerCase() === "input" && e.target.type === "radio") {
                switch (e.target.attributes.id.value) {
                case radioBtn1:
                    greentextEl.style.display = "none";
                    redtextEl.style.display = "block";
                    break;
                case radioBtn2:
                    redtextEl.style.display = "none";
                    greentextEl.style.display = "block";
                    break;
                }
            }
        });
    };

    /**
     * Wire up demos that gradually expose their
     * text when clicking on a radio button.
     */
    wire1("grp1", "redtext1", "greentext1", "red1", "green1");
    wire1("grp2", "redtext2", "greentext2", "red2", "green2");
}());